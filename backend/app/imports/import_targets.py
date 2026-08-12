import pandas as pd
from pathlib import Path

from app.database import SessionLocal
from app.models.target import Target
from app.models.target_drug import TargetDrug

BASE_DIR = Path(__file__).resolve().parents[3]

file_path = BASE_DIR / "datasets" / "Targets_TTD.xlsx"

# Read Excel
df = pd.read_excel(
    file_path,
    sheet_name="TTD_Targets",
    header=None,
    skiprows=32
)

db = SessionLocal()

current_target = {}

for _, row in df.iterrows():

    field = str(row[1]).strip() if pd.notna(row[1]) else ""
    value = str(row[2]).strip() if pd.notna(row[2]) else ""

    # -------------------------------
    # New Target Found
    # -------------------------------
    if field == "TARGETID":

        # Insert the previous target
        if current_target:

            print(current_target)

            target = Target(**current_target)

            db.add(target)

            

            print(f"Inserted Target: {current_target['target_id']}")
            current_target = {
    "target_id": value
}
            

        # Start collecting a new target
        current_target = {
            "target_id": value
        }

    elif field == "FORMERID":
        current_target["former_id"] = value

    elif field == "UNIPROID":
        current_target["uniprot_id"] = value

    elif field == "TARGNAME":
        current_target["target_name"] = value

    elif field == "GENENAME":
        current_target["gene_name"] = value

    elif field == "TARGTYPE":
        current_target["target_type"] = value

    elif field == "SYNONYMS":
        current_target["synonyms"] = value

    elif field == "FUNCTION":
        current_target["function"] = value

    elif field == "PDBSTRUC":
        current_target["pdb_structure"] = value

    elif field == "BIOCLASS":
        current_target["bio_class"] = value

    elif field == "ECNUMBER":
        current_target["ec_number"] = value

    elif field == "SEQUENCE":
        current_target["sequence"] = value

# Insert the last target
if current_target:

    target = Target(**current_target)

    db.add(target)

    print(f"Inserted Target: {current_target['target_id']}")

db.commit()

print("✅ All Targets Imported Successfully")

db.close()