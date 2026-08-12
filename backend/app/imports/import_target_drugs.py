import pandas as pd
from pathlib import Path

from app.database import SessionLocal
from app.models.target_drug import TargetDrug
from app.models.target import Target

BASE_DIR = Path(__file__).resolve().parents[3]

file_path = BASE_DIR / "datasets" / "Targets_TTD.xlsx"

df = pd.read_excel(
    file_path,
    sheet_name="TTD_Targets",
    header=None,
    skiprows=32
)

db = SessionLocal()

count = 0

for _, row in df.iterrows():

    field = str(row[1]).strip() if pd.notna(row[1]) else ""

    if field == "DRUGINFO":

       target_drug = TargetDrug(
        target_id=str(row[0]).strip(),
        drug_code=str(row[2]).strip() if pd.notna(row[2]) else None,
        drug_name=str(row[3]).strip() if pd.notna(row[3]) else None,
        clinical_status=str(row[4]).strip() if pd.notna(row[4]) else None,
    )

       db.add(target_drug)

       count += 1

       if count % 1000 == 0:
        print(f"Imported {count} Target Drugs...")

db.commit()

db.close()

print("=" * 50)
print(f"✅ Total Target Drugs Imported : {count}")
print("=" * 50)