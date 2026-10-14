
import os
import re
import sys
import unicodedata

import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL

from app.imports.import_other_therapies import (
    FILE_PATH,
    clean_value,
    create_pathway_data,
)


# ============================================================
# RAILWAY PRODUCTION DATABASE CONFIGURATION
# ============================================================

HOST = "hayabusa.proxy.rlwy.net"
PORT = 36545
DATABASE = "railway"
USERNAME = "root"

BACKUP_TABLE = "other_therapies_backup_20261014"
EXPECTED_COUNT = 206


# ============================================================
# EXCEL SHEETS INCLUDED IN THE REPAIR
# Sheet1 is intentionally excluded.
# ============================================================

THERAPY_SHEETS = [
    "Homeopathy",
    "Ayurveda",
    "Cornerstone Therapy",
    "Exercise Therapy",
    "Medical Nutrition Therapy",
    "Weight Management Programs",
    "Behavioural Therapy",
    "Music Therapy",
    "Yoga Therapy",
    "Mindfulness Meditation",
    "Breathing Exercises (Pranayama)",
    "Sleep Therapy",
    "Psychological Counselling",
    "Probiotics_Synbiotics_Prebiotic",
    "Nutraceuticals",
    "Physiotherapy-Based Exercise Pr",
    "Digital Health Interventions",
    "Bariatric Surgery (Selected Pat",
    "Integrated Adjunctive Therapy M",
]


STANDARD_SHEETS = [
    "Exercise Therapy",
    "Medical Nutrition Therapy",
    "Weight Management Programs",
    "Behavioural Therapy",
    "Music Therapy",
    "Yoga Therapy",
    "Mindfulness Meditation",
    "Breathing Exercises (Pranayama)",
    "Sleep Therapy",
    "Psychological Counselling",
    "Probiotics_Synbiotics_Prebiotic",
    "Nutraceuticals",
    "Physiotherapy-Based Exercise Pr",
    "Digital Health Interventions",
    "Bariatric Surgery (Selected Pat",
]


# ============================================================
# NORMALIZE NAMES FOR MATCHING
# This does not modify stored database values.
# ============================================================

def normalize_match(value):
    """Normalize punctuation and corrupted separators for matching."""

    if value is None:
        return ""

    value = unicodedata.normalize("NFKC", str(value)).casefold()

    # Treat corrupted separators as spaces.
    value = value.replace("???", " ")

    # Normalize Unicode dashes, minus signs, and regular hyphens.
    value = re.sub(r"[\u2010-\u2015\u2212\-]+", " ", value)

    # Normalize other punctuation and whitespace.
    value = re.sub(r"[^\w\s]", " ", value)

    return " ".join(value.split())


# ============================================================
# MAP EXCEL ROWS USING THE EXISTING IMPORTER'S MAPPINGS
# ============================================================

def make_record(sheet, row):
    """Convert one Excel row into the existing database structure."""

    if sheet == "Homeopathy":
        item_name = clean_value(row.get("Remedy"))

        if not item_name:
            return None

        return {
            "source_sheet": sheet,
            "category": sheet,
            "item_name": item_name,
            "secondary_name": None,
            "description": clean_value(
                row.get("Traditional Indications")
            ),
            "mechanism": None,
            "effect": None,
            "outcome": None,
            "pathway_data": create_pathway_data(
                row.get("Unnamed: 2")
            ),
        }

    if sheet == "Ayurveda":
        item_name = clean_value(row.get("Ayurvedic Medicine"))

        if not item_name:
            return None

        return {
            "source_sheet": sheet,
            "category": sheet,
            "item_name": item_name,
            "secondary_name": clean_value(
                row.get("Botanical Name")
            ),
            "description": None,
            "mechanism": clean_value(
                row.get("Proposed Mechanisms")
            ),
            "effect": None,
            "outcome": None,
            "pathway_data": create_pathway_data(
                row.get("Pathway")
            ),
        }

    if sheet == "Cornerstone Therapy":
        item_name = clean_value(row.get("Component"))

        if not item_name:
            return None

        return {
            "source_sheet": sheet,
            "category": sheet,
            "item_name": item_name,
            "secondary_name": None,
            "description": None,
            "mechanism": None,
            "effect": clean_value(
                row.get("Molecular Target/Effect")
            ),
            "outcome": clean_value(
                row.get("Clinical Outcome")
            ),
            "pathway_data": None,
        }

    if sheet == "Integrated Adjunctive Therapy M":
        item_name = clean_value(
            row.get("Pathogenic Mechanism")
        )

        if not item_name:
            return None

        return {
            "source_sheet": sheet,
            "category": "Integrated Adjunctive Therapy",
            "item_name": item_name,
            "secondary_name": None,
            "description": None,
            "mechanism": item_name,
            "effect": clean_value(
                row.get("Therapeutic Targets")
            ),
            "outcome": clean_value(
                row.get("Adjunctive Therapies")
            ),
            "pathway_data": None,
        }

    if sheet in STANDARD_SHEETS:
        item_name = clean_value(row.get("Mechanism"))

        if not item_name:
            return None

        columns = list(row.index)

        effect_column = (
            "Molecular Target"
            if "Molecular Target" in columns
            else "Primary Effect"
        )

        outcome_column = (
            "Clinical Effect"
            if "Clinical Effect" in columns
            else "Clinical Outcome"
        )

        return {
            "source_sheet": sheet,
            "category": sheet,
            "item_name": item_name,
            "secondary_name": None,
            "description": None,
            "mechanism": item_name,
            "effect": clean_value(
                row.get(effect_column)
            ),
            "outcome": clean_value(
                row.get(outcome_column)
            ),
            "pathway_data": None,
        }

    raise RuntimeError(
        f"No mapping defined for sheet: {sheet}"
    )


# ============================================================
# READ AND VALIDATE THE ORIGINAL EXCEL WORKBOOK
# ============================================================

def read_excel_records():
    if not os.path.exists(FILE_PATH):
        raise FileNotFoundError(
            f"Original workbook not found: {FILE_PATH}"
        )

    records = []

    for sheet in THERAPY_SHEETS:
        df = pd.read_excel(
            FILE_PATH,
            sheet_name=sheet,
            header=0,
        )

        for _, row in df.iterrows():
            record = make_record(sheet, row)

            if record is not None:
                records.append(record)

    if len(records) != EXPECTED_COUNT:
        raise RuntimeError(
            f"Excel produced {len(records)} records; "
            f"expected {EXPECTED_COUNT}. "
            "No changes should be applied."
        )

    # Check for duplicate original source keys.
    keys = [
        (
            record["source_sheet"],
            record["category"],
            record["item_name"],
        )
        for record in records
    ]

    if len(keys) != len(set(keys)):
        duplicates = sorted({
            key for key in keys if keys.count(key) > 1
        })

        raise RuntimeError(
            f"Duplicate Excel matching keys found: {duplicates}. "
            "No changes should be applied."
        )

    return records


# ============================================================
# FIND THE EXISTING PRODUCTION ROW FOR EACH EXCEL RECORD
# ============================================================

def find_existing_match(conn, record, lock=False):
    """
    Match a source row to exactly one existing production row.

    Matching uses normalized item names because some stored names
    contain corrupted question marks in place of Unicode punctuation.
    """

    lock_clause = " FOR UPDATE" if lock else ""

    candidates = conn.execute(
        text(
            """
            SELECT id, source_sheet, category, item_name
            FROM other_therapies
            WHERE source_sheet = :source_sheet
              AND category = :category
            """ + lock_clause
        ),
        {
            "source_sheet": record["source_sheet"],
            "category": record["category"],
        },
    ).mappings().all()

    expected_name = normalize_match(record["item_name"])

    matches = [
        row
        for row in candidates
        if normalize_match(row["item_name"]) == expected_name
    ]

    if len(matches) != 1:
        raise RuntimeError(
            "Unsafe match for "
            f"{record['source_sheet']} / "
            f"{record['category']} / "
            f"{record['item_name']}: "
            f"found {len(matches)} records. "
            "No changes should be committed."
        )

    return matches[0]


# ============================================================
# MAIN REPAIR
# ============================================================

def main():
    apply_changes = "--apply" in sys.argv

    password = os.getenv("RAILWAY_MYSQL_PASSWORD")

    if not password:
        raise RuntimeError(
            "RAILWAY_MYSQL_PASSWORD is not set in PowerShell."
        )

    records = read_excel_records()

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
        print(f"Workbook: {FILE_PATH}")
        print(f"Target: {HOST}:{PORT}/{DATABASE}")
        print("Mode:", "APPLY" if apply_changes else "DRY RUN")
        print("Excel records:", len(records))

        # ----------------------------------------------------
        # PHASE 1: VALIDATE PRODUCTION AND BACKUP
        # ----------------------------------------------------

        with engine.connect() as conn:
            current_database = conn.execute(
                text("SELECT DATABASE()")
            ).scalar_one()

            if current_database != DATABASE:
                raise RuntimeError(
                    f"Connected to {current_database}, "
                    f"expected {DATABASE}."
                )

            production_count = conn.execute(
                text("SELECT COUNT(*) FROM other_therapies")
            ).scalar_one()

            backup_count = conn.execute(
                text(
                    f"SELECT COUNT(*) FROM `{BACKUP_TABLE}`"
                )
            ).scalar_one()

            if production_count != EXPECTED_COUNT:
                raise RuntimeError(
                    f"Production count is {production_count}; "
                    f"expected {EXPECTED_COUNT}."
                )

            if backup_count != EXPECTED_COUNT:
                raise RuntimeError(
                    f"Backup count is {backup_count}; "
                    f"expected {EXPECTED_COUNT}."
                )

            # Validate every source row and retain its existing ID.
            for record in records:
                match = find_existing_match(conn, record)
                record["id"] = match["id"]

            # Ensure no production ID is assigned twice.
            matched_ids = [record["id"] for record in records]

            if len(matched_ids) != len(set(matched_ids)):
                raise RuntimeError(
                    "Multiple Excel records matched the same "
                    "production ID. No changes should be applied."
                )

            print(
                f"\nAll {EXPECTED_COUNT} Excel records "
                "match unique existing IDs."
            )

            for name in ("Nux vomica", "Amla"):
                for record in records:
                    if record["item_name"] == name:
                        print(
                            f"Source check: {record['category']} "
                            f"{name}; pathway present: "
                            f"{bool(record['pathway_data'])}"
                        )

        # ----------------------------------------------------
        # DRY RUN ENDS HERE
        # ----------------------------------------------------

        if not apply_changes:
            print(
                "\nDRY RUN COMPLETE — no database changes made."
            )
            return

        # ----------------------------------------------------
        # UPDATE EXISTING ROWS ONLY
        # No DELETE or INSERT statements are used.
        # ----------------------------------------------------

        update_sql = text(
            """
            UPDATE other_therapies
            SET item_name = :item_name,
                description = :description,
                secondary_name = :secondary_name,
                mechanism = :mechanism,
                effect = :effect,
                outcome = :outcome,
                pathway_data = :pathway_data
            WHERE id = :id
              AND source_sheet = :source_sheet
              AND category = :category
            """
        )

        # ----------------------------------------------------
        # PHASE 2: TRANSACTIONAL REVALIDATION AND UPDATE
        # Any raised exception rolls back the transaction.
        # ----------------------------------------------------

        with engine.begin() as conn:
            current_database = conn.execute(
                text("SELECT DATABASE()")
            ).scalar_one()

            if current_database != DATABASE:
                raise RuntimeError(
                    "Production database check failed."
                )

            production_count = conn.execute(
                text("SELECT COUNT(*) FROM other_therapies")
            ).scalar_one()

            if production_count != EXPECTED_COUNT:
                raise RuntimeError(
                    "Production record count changed."
                )

            backup_count = conn.execute(
                text(
                    f"SELECT COUNT(*) FROM `{BACKUP_TABLE}`"
                )
            ).scalar_one()

            if backup_count != EXPECTED_COUNT:
                raise RuntimeError(
                    "Backup record count changed."
                )

            # Revalidate and lock all matched rows before updating.
            # No row is changed until every record passes validation.
            for record in records:
                match = find_existing_match(
                    conn,
                    record,
                    lock=True,
                )

                if match["id"] != record["id"]:
                    raise RuntimeError(
                        f"Record match changed for ID "
                        f"{record['id']}."
                    )

            print(
                "\nTransactional validation passed. "
                "Updating existing records..."
            )

            for record in records:
                result = conn.execute(update_sql, record)

                # MySQL may report 0 affected rows when the row
                # already contains exactly the requested values.
                # More than 1 affected row is always unexpected.
                if result.rowcount not in (0, 1):
                    raise RuntimeError(
                        f"Unexpected update count for ID "
                        f"{record['id']}: {result.rowcount}"
                    )

            # Verify that all original record IDs still exist.
            existing_ids = conn.execute(
                text(
                    """
                    SELECT id
                    FROM other_therapies
                    ORDER BY id
                    """
                )
            ).scalars().all()

            if len(existing_ids) != EXPECTED_COUNT:
                raise RuntimeError(
                    "Post-update production count validation failed."
                )

            if set(existing_ids) != set(matched_ids):
                raise RuntimeError(
                    "Production IDs changed unexpectedly."
                )

            # Verify the backup was not modified.
            final_backup_count = conn.execute(
                text(
                    f"SELECT COUNT(*) FROM `{BACKUP_TABLE}`"
                )
            ).scalar_one()

            if final_backup_count != EXPECTED_COUNT:
                raise RuntimeError(
                    "Backup count changed during repair."
                )

        # engine.begin() commits only after the block completes.
        print(
            "\nRepair committed successfully."
            "\nExisting production IDs were preserved."
            "\nThe backup table was not modified."
        )

    finally:
        engine.dispose()


if __name__ == "__main__":
    main()
