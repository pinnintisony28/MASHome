
import os
import sys
import json
import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL

from app.imports.import_pathways import (
    FILE_PATH,
    SKIP_SHEETS,
    clean_value,
    extract_complete_sheet_data,
    parse_boolean,
)

HOST = "hayabusa.proxy.rlwy.net"
PORT = 36545
DATABASE = "railway"
USERNAME = "root"
BACKUP_TABLE = "pathways_backup_20261014"



def extract_production_master(df):
    """Read both horizontal and vertical master-data layouts."""
    master = {}

    # Layout A: horizontal table
    # Row contains Field, Pathway_ID, Pathway_Name, ...
    for i in range(len(df)):
        row = [
            clean_value(value)
            for value in df.iloc[i].tolist()
        ]

        if "Pathway_ID" in row and "Pathway_Name" in row:
            header_row = i
            value_row = i + 1

            if value_row >= len(df):
                continue

            headers = row
            values = [
                clean_value(value)
                for value in df.iloc[value_row].tolist()
            ]

            for j, field in enumerate(headers):
                if field and field not in ("Field", "Value"):
                    if j < len(values):
                        master[field] = values[j]

            if master.get("Pathway_ID") and master.get("Pathway_Name"):
                return master

    # Layout B: vertical Field | Value table
    for i in range(len(df)):
        heading = clean_value(df.iloc[i, 0])

        if heading not in (
            "Pathway Master Data",
            "Pathway Master Table",
        ):
            continue

        for j in range(i + 1, len(df)):
            field = clean_value(df.iloc[j, 0])
            value = clean_value(df.iloc[j, 1])

            if field in (
                "Disease Initiation",
                "Disease Initiation Table",
                "Signaling Cascades",
                "Complete Signaling Cascade",
                "Pathway Crosstalk",
            ):
                break

            if not field or field in ("Field", "Value"):
                continue

            master[field] = value

        if master.get("Pathway_ID") and master.get("Pathway_Name"):
            return master

    return master


def build_record(df, sheet_name, sheet_index):
    master = extract_production_master(df)

    pathway_id = clean_value(master.get("Pathway_ID"))
    pathway_name = clean_value(master.get("Pathway_Name"))

    # The workbook's one known ID-less sheet.
    
# Preserve the existing production ID for this sheet.
    
    if not pathway_id:
        if sheet_name == "Cell Cycle Regulation":
            pathway_id = "AUTO_033_Cell_Cycle_Regulation"
        else:
            raise RuntimeError(
                f"Could not extract Pathway_ID from sheet: {sheet_name}"
            )

    if sheet_name == "Cell Cycle Regulation":
        pathway_id = "AUTO_033_Cell_Cycle_Regulation"



    if not pathway_name:
        raise RuntimeError(
            f"Could not extract Pathway_Name from sheet: {sheet_name}"
        )

    def val(*field_names):
        for field in field_names:
            value = clean_value(master.get(field))
            if value is not None:
                return str(value)
        return None

    data = extract_complete_sheet_data(df, sheet_name)
    data["_metadata"] = {
        "source_sheet": sheet_name,
        "source_file": "Pathways.xlsx",
    }

    return {
        "pathway_id": str(pathway_id),
        "pathway_name": str(pathway_name),
        "category": val("Category"),
        "super_category": val("Super Category", "Super_Category"),
        "disease": val("Disease"),
        "disease_stages": val("Disease Stages", "Disease_Stages"),
        "cellular_location": val("Cellular Location"),
        "primary_function": val("Primary Function"),
        "major_cell_types": val("Major Cell Types"),
        "clinical_importance": val("Clinical Importance"),
        "druggable": parse_boolean(master.get("Druggable")),
        "pathway_status": val("Pathway Status"),
        "canonical_databases": val("Canonical Databases"),
        "source_sheet": sheet_name,
        "pathway_data": data,
    }


def main():
    apply_changes = "--apply" in sys.argv
    password = os.getenv("RAILWAY_MYSQL_PASSWORD")

    if not password:
        raise RuntimeError(
            "Set RAILWAY_MYSQL_PASSWORD in PowerShell first."
        )

    engine = create_engine(
        URL.create(
            "mysql+pymysql",
            username=USERNAME,
            password=password,
            host=HOST,
            port=PORT,
            database=DATABASE,
            query={"charset": "utf8mb4"},
        ),
        pool_pre_ping=True,
    )

    try:
        print("Target:", f"{HOST}:{PORT}/{DATABASE}")
        print("Mode:", "APPLY" if apply_changes else "DRY RUN")
        print("Workbook:", FILE_PATH)

        workbook = pd.ExcelFile(FILE_PATH)
        records = []
        seen_ids = set()

        for sheet_index, sheet_name in enumerate(workbook.sheet_names):
            if sheet_name in SKIP_SHEETS:
                continue

            df = pd.read_excel(
                FILE_PATH,
                sheet_name=sheet_name,
                header=None,
            )
            record = build_record(df, sheet_name, sheet_index)

            if record["pathway_id"] in seen_ids:
                raise RuntimeError(
                    f"Duplicate Excel ID: {record['pathway_id']}"
                )

            seen_ids.add(record["pathway_id"])
            records.append(record)

        with engine.connect() as conn:
            db_name = conn.execute(
                text("SELECT DATABASE()")
            ).scalar_one()

            if db_name != DATABASE:
                raise RuntimeError(
                    f"Wrong database: {db_name!r}"
                )

            count = conn.execute(
                text("SELECT COUNT(*) FROM pathways")
            ).scalar_one()

            backup_count = conn.execute(
                text(f"SELECT COUNT(*) FROM `{BACKUP_TABLE}`")
            ).scalar_one()

            live_ids = set(
                conn.execute(
                    text("SELECT pathway_id FROM pathways")
                ).scalars().all()
            )

            print("Production count:", count)
            print("Backup count:", backup_count)
            print("Excel records:", len(records))

            if count != 35 or backup_count != 35 or len(records) != 35:
                raise RuntimeError(
                    "Expected 35 production, backup, and Excel records."
                )
        
            # Normalize the known Cell Cycle Regulation ID difference.
            expected_ids = set(seen_ids)
            production_ids = set(live_ids)

            if "MP033" in expected_ids:
                expected_ids.remove("MP033")
                expected_ids.add("AUTO_033_Cell_Cycle_Regulation")

            if production_ids != expected_ids:
                raise RuntimeError(
                    "ID mismatch. "
                    f"Missing in production: "
                    f"{sorted(expected_ids - production_ids)}; "
                    f"unexpected in production: "
                    f"{sorted(production_ids - expected_ids)}"
                )
        
            

            



            print("\nValidated scientific-symbol examples:")
            for record in records:
                if record["pathway_id"] in (
                    "MP002", "MP008", "MP012", "MP016"
                ):
                    print(
                        record["pathway_id"],
                        "=>",
                        record["pathway_name"],
                        "|",
                        record["cellular_location"],
                    )

        if not apply_changes:
            print("\nDRY RUN COMPLETE — no database changes made.")
            return

        columns = [
            "pathway_name",
            "category",
            "super_category",
            "disease",
            "disease_stages",
            "cellular_location",
            "primary_function",
            "major_cell_types",
            "clinical_importance",
            "druggable",
            "pathway_status",
            "canonical_databases",
            "source_sheet",
            "pathway_data",
        ]

        update_sql = text(
            "UPDATE pathways SET "
            + ", ".join(f"`{col}` = :{col}" for col in columns)
            + " WHERE pathway_id = :pathway_id"
        )

        with engine.begin() as conn:
            if conn.execute(
                text("SELECT DATABASE()")
            ).scalar_one() != DATABASE:
                raise RuntimeError("Production database check failed.")

            if conn.execute(
                text("SELECT COUNT(*) FROM pathways")
            ).scalar_one() != 35:
                raise RuntimeError("Production row count changed.")

            if conn.execute(
                text(f"SELECT COUNT(*) FROM `{BACKUP_TABLE}`")
            ).scalar_one() != 35:
                raise RuntimeError("Backup row count changed.")

            for record in records:
                values = dict(record)
                values["pathway_data"] = json.dumps(
                    record["pathway_data"],
                    ensure_ascii=False,
                )

                conn.execute(update_sql, values)

                exists = conn.execute(
                    text(
                        "SELECT COUNT(*) FROM pathways "
                        "WHERE pathway_id = :pathway_id"
                    ),
                    {"pathway_id": record["pathway_id"]},
                ).scalar_one()

                if exists != 1:
                    raise RuntimeError(
                        f"Expected one existing row for {record['pathway_id']}"
                    )

        print("\nProduction repair committed successfully.")

    finally:
        engine.dispose()


if __name__ == "__main__":
    main()
