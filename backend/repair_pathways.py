
import sys
import pandas as pd

from app.database import SessionLocal
from app.models.pathway import Pathway

# Reuse the existing Excel extraction logic.
from app.imports.import_pathways import (
    FILE_PATH,
    SKIP_SHEETS,
    clean_value,
    extract_master_data,
    extract_complete_sheet_data,
    parse_boolean,
    make_fallback_pathway_id,
)


def build_pathway_record(df, sheet_name, sheet_index):
    """Build the correct database fields from one Excel sheet."""

    master = extract_master_data(df, sheet_name)

    pathway_id = clean_value(master.get("Pathway_ID"))
    pathway_name = clean_value(master.get("Pathway_Name"))

    if not pathway_id:
        pathway_id = make_fallback_pathway_id(
            sheet_name, sheet_index
        )

    if not pathway_name:
        pathway_name = sheet_name

    def value(field):
        result = clean_value(master.get(field))
        return str(result) if result is not None else None

    complete_data = extract_complete_sheet_data(df, sheet_name)
    complete_data["_metadata"] = {
        "source_sheet": sheet_name,
        "source_file": "Pathways.xlsx",
    }

    return {
        "pathway_id": str(pathway_id),
        "pathway_name": str(pathway_name),
        "category": value("Category"),
        "super_category": value("Super_Category"),
        "disease": value("Disease"),
        "disease_stages": value("Disease_Stages"),
        "cellular_location": value("Cellular Location"),
        "primary_function": value("Primary Function"),
        "major_cell_types": value("Major Cell Types"),
        "clinical_importance": value("Clinical Importance"),
        "druggable": parse_boolean(master.get("Druggable")),
        "pathway_status": value("Pathway Status"),
        "canonical_databases": value("Canonical Databases"),
        "source_sheet": sheet_name,
        "pathway_data": complete_data,
    }


def main():
    apply_changes = "--apply" in sys.argv

    print("Reading workbook:", FILE_PATH)
    workbook = pd.ExcelFile(FILE_PATH)

    db = SessionLocal()

    try:
        existing = {
            row.pathway_id: row
            for row in db.query(Pathway).all()
        }

        updates = []
        missing_in_db = []
        duplicate_excel_ids = set()
        seen_ids = set()

        for sheet_index, sheet_name in enumerate(
            workbook.sheet_names
        ):
            if sheet_name in SKIP_SHEETS:
                continue

            df = pd.read_excel(
                FILE_PATH,
                sheet_name=sheet_name,
                header=None,
            )

            record = build_pathway_record(
                df, sheet_name, sheet_index
            )

            pathway_id = record["pathway_id"]

            if pathway_id in seen_ids:
                duplicate_excel_ids.add(pathway_id)
                continue

            seen_ids.add(pathway_id)

            row = existing.get(pathway_id)

            if row is None:
                missing_in_db.append(
                    (pathway_id, sheet_name)
                )
                continue

            updates.append((row, record))

        print("\n--- DRY-RUN REPORT ---")
        print("Existing database records:", len(existing))
        print("Excel sheets to repair:", len(updates))
        print("Missing matching database records:", len(missing_in_db))
        print("Duplicate Excel IDs:", len(duplicate_excel_ids))

        if missing_in_db:
            print("\nRecords without a matching database ID:")
            for pathway_id, sheet_name in missing_in_db:
                print(f"  {pathway_id} <- {sheet_name}")

        if duplicate_excel_ids:
            print("\nDuplicate IDs:")
            for pathway_id in sorted(duplicate_excel_ids):
                print(" ", pathway_id)

        print("\nSample repair values:")
        for row, record in updates:
            if any(mark in record["pathway_name"] for mark in ("β", "κ", "–", "→")):
                print(
                    f"  {record['pathway_id']}: "
                    f"{record['pathway_name']}"
                )

        # Never write anything during a normal run.
        if not apply_changes:
            print(
                "\nDRY RUN ONLY. Database was not modified."
            )
            print(
                "Review the report before considering --apply."
            )
            return

        # Fail closed unless every Excel sheet matches uniquely.
        if (
            missing_in_db
            or duplicate_excel_ids
            or len(updates) != len(seen_ids)
            or len(existing) != len(updates)
        ):
            raise RuntimeError(
                "Validation failed. No updates were applied."
            )

        # Update existing objects only; do not insert or delete rows.
        for row, record in updates:
            for field, new_value in record.items():
                if field == "pathway_id":
                    continue
                if field == "image_url":
                    continue
                setattr(row, field, new_value)

        db.commit()
        print(
            f"\nSuccessfully repaired {len(updates)} existing records."
        )

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    main()
