import pandas as pd
from pathlib import Path

from app.database import SessionLocal
from app.models.biomarker import Biomarker


# =========================================================
# PROJECT PATH
# =========================================================

BASE_DIR = Path(__file__).resolve().parents[3]

DATASET_DIR = BASE_DIR / "datasets"

# Main dataset filename
file_path = DATASET_DIR / "Biomarkers_TTD.xlsx"


# =========================================================
# SHEETS TO IMPORT
# =========================================================

MAIN_SHEET = "Sheet1"

BLOOD_SERUM_SHEET = "Blood and Serum"

IMAGING_SHEET = " Imaging-Based Biomarkers"


# =========================================================
# CHECK FILE
# =========================================================

print("=" * 60)
print("        MASHome Biomarkers Import")
print("=" * 60)

print(f"\nReading file: {file_path}")

if not file_path.exists():
    print("❌ Biomarkers_TTD.xlsx not found!")
    print(f"Expected location: {file_path}")
    raise SystemExit(1)


# =========================================================
# READ EXCEL FILE
# =========================================================

excel = pd.ExcelFile(file_path)

print("\nAvailable sheets:")

for sheet in excel.sheet_names:
    print(f"- {sheet}")


required_sheets = [
    MAIN_SHEET,
    BLOOD_SERUM_SHEET,
    IMAGING_SHEET,
]


print("\nChecking required sheets...")

for sheet in required_sheets:

    if sheet not in excel.sheet_names:

        print(
            f"❌ Required sheet not found: {sheet}"
        )

        raise SystemExit(1)

    print(
        f"✅ Found: {sheet}"
    )


# =========================================================
# READ THE THREE GREEN SHEETS
# =========================================================

print("\nReading main sheet...")

main_df = pd.read_excel(
    file_path,
    sheet_name=MAIN_SHEET,
    header=0
)

print(
    f"✅ {MAIN_SHEET}: "
    f"{len(main_df)} rows"
)


print("\nReading Blood and Serum sheet...")

blood_df = pd.read_excel(
    file_path,
    sheet_name=BLOOD_SERUM_SHEET,
    header=0
)

print(
    f"✅ {BLOOD_SERUM_SHEET}: "
    f"{len(blood_df)} rows"
)


print("\nReading Imaging-Based Biomarkers sheet...")

imaging_df = pd.read_excel(
    file_path,
    sheet_name=IMAGING_SHEET,
    header=0
)

print(
    f"✅ {IMAGING_SHEET}: "
    f"{len(imaging_df)} rows"
)


# =========================================================
# CLEAN COLUMN NAMES
# =========================================================

main_df.columns = [
    str(column).strip()
    for column in main_df.columns
]

blood_df.columns = [
    str(column).strip()
    for column in blood_df.columns
]

imaging_df.columns = [
    str(column).strip()
    for column in imaging_df.columns
]


# =========================================================
# NORMALIZE MAIN SHEET
# =========================================================

# Sheet1 contains:
#
# Type
# Biomarker_ID
# [classification/formula column]
# Normal Range
# Clinical Significance
# Description
#
# The third column contains formula-based values
# and is therefore intentionally ignored.


main_df = main_df.rename(
    columns={
        "Biomarker_ID": "biomarker_name"
    }
)


# Forward-fill the Type column.
#
# Example:
#
# Blood & Serum Biomarkers
#    ALT
#    AST
#    GGT
#
# The rows below the category have empty Type values,
# so we carry the category downward.

main_df["category"] = (
    main_df["Type"]
    .ffill()
)


# =========================================================
# CLEAN MAIN DATA
# =========================================================

main_records = []

for _, row in main_df.iterrows():

    name = row.get(
        "biomarker_name"
    )

    if pd.isna(name):
        continue

    name = str(name).strip()

    if not name:
        continue

    category = row.get(
        "category"
    )

    if pd.isna(category):
        category = "Other"

    category = str(
        category
    ).strip()

    # Ignore header-like values
    if name.lower() in {
        "biomarker_id",
        "biomarkers",
        "biomarker"
    }:
        continue

    normal_range = row.get(
        "Normal Range"
    )

    clinical_significance = row.get(
        "Clinical Significance"
    )

    description = row.get(
        "Description"
    )

    main_records.append(
        {
            "biomarker_name": name,
            "category": category,
            "normal_range": (
                None
                if pd.isna(normal_range)
                else str(normal_range).strip()
            ),
            "clinical_significance": (
                None
                if pd.isna(
                    clinical_significance
                )
                else str(
                    clinical_significance
                ).strip()
            ),
            "description": (
                None
                if pd.isna(description)
                else str(
                    description
                ).strip()
            ),
            "source_sheet": MAIN_SHEET,
        }
    )


# =========================================================
# NORMALIZE BLOOD & SERUM SHEET
# =========================================================

blood_records = []

for _, row in blood_df.iterrows():

    name = row.get(
        "Biomarker_ID"
    )

    if pd.isna(name):
        continue

    name = str(name).strip()

    if not name:
        continue

    description = row.get(
        "Description"
    )

    blood_records.append(
        {
            "biomarker_name": name,
            "category":
                "Blood & Serum Biomarkers",
            "normal_range": None,
            "clinical_significance": None,
            "description": (
                None
                if pd.isna(description)
                else str(
                    description
                ).strip()
            ),
            "source_sheet":
                BLOOD_SERUM_SHEET,
        }
    )


# =========================================================
# NORMALIZE IMAGING SHEET
# =========================================================

imaging_records = []

for _, row in imaging_df.iterrows():

    name = row.get(
        "Biomarker_ID"
    )

    if pd.isna(name):
        continue

    name = str(name).strip()

    if not name:
        continue

    description = row.get(
        "Description"
    )

    imaging_records.append(
        {
            "biomarker_name": name,
            "category":
                "Imaging-Based Biomarkers",
            "normal_range": None,
            "clinical_significance": None,
            "description": (
                None
                if pd.isna(description)
                else str(
                    description
                ).strip()
            ),
            "source_sheet":
                IMAGING_SHEET,
        }
    )


# =========================================================
# COMBINE DATA
# =========================================================

all_records = (
    main_records
    + blood_records
    + imaging_records
)


print("\n==========================================")
print("Prepared records")
print("==========================================")

print(
    f"Main records    : {len(main_records)}"
)

print(
    f"Blood & Serum   : {len(blood_records)}"
)

print(
    f"Imaging-Based   : {len(imaging_records)}"
)

print(
    f"Total source records: "
    f"{len(all_records)}"
)


# =========================================================
# DATABASE
# =========================================================

db = SessionLocal()

try:

    print(
        "\nDeleting existing biomarker records..."
    )

    db.query(Biomarker).delete()

    db.commit()

    print(
        "✅ Old biomarker records deleted."
    )


    # =====================================================
    # IMPORT / MERGE
    # =====================================================

    imported = 0
    merged = 0
    skipped = 0


    for record in all_records:

        name = record[
            "biomarker_name"
        ]

        category = record[
            "category"
        ]


        # -------------------------------------------------
        # Find an existing record by name + category
        # -------------------------------------------------

        existing = (
            db.query(Biomarker)
            .filter(
                Biomarker.biomarker_name
                == name,
                Biomarker.category
                == category
            )
            .first()
        )


        # -------------------------------------------------
        # If already exists, enrich missing fields
        # -------------------------------------------------

        if existing:

            updated = False

            if (
                not existing.description
                and record["description"]
            ):

                existing.description = (
                    record["description"]
                )

                updated = True


            if (
                not existing.normal_range
                and record["normal_range"]
            ):

                existing.normal_range = (
                    record["normal_range"]
                )

                updated = True


            if (
                not existing.clinical_significance
                and record[
                    "clinical_significance"
                ]
            ):

                existing.clinical_significance = (
                    record[
                        "clinical_significance"
                    ]
                )

                updated = True


            if updated:

                merged += 1

            else:

                skipped += 1

            continue


        # -------------------------------------------------
        # Generate internal Biomarker ID
        # -------------------------------------------------

        biomarker_id = (
            f"BM-{imported + 1:04d}"
        )


        # -------------------------------------------------
        # Create new record
        # -------------------------------------------------

        biomarker = Biomarker(

            biomarker_id=
                biomarker_id,

            biomarker_name=
                name,

            category=
                category,

            subgroup=None,

            normal_range=
                record[
                    "normal_range"
                ],

            clinical_significance=
                record[
                    "clinical_significance"
                ],

            description=
                record[
                    "description"
                ],

            source_sheet=
                record[
                    "source_sheet"
                ],
        )


        db.add(biomarker)

        imported += 1


    db.commit()


    # =====================================================
    # SUMMARY
    # =====================================================

    print("\n==========================================")
    print("        Biomarkers Import Complete")
    print("==========================================")

    print(
        f"✅ Imported : {imported}"
    )

    print(
        f"🔄 Merged   : {merged}"
    )

    print(
        f"⏭️ Skipped  : {skipped}"
    )

    print(
        "=========================================="
    )


finally:

    db.close()