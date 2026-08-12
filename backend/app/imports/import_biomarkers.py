import pandas as pd
from pathlib import Path

from app.database import SessionLocal
from app.models.biomarker import Biomarker

# Project Root
BASE_DIR = Path(__file__).resolve().parents[3]

# Dataset Path
file_path = BASE_DIR / "datasets" / "Biomarkers_TTD.xlsx"

# Read the correct sheet
df = pd.read_excel(file_path, sheet_name="Biomarker_Disease")

# Remove empty rows
df = df.dropna(how="all")

db = SessionLocal()

count = 0
skipped = 0

for _, row in df.iterrows():

    biomarker_id = str(row["BiomarkerID"]).strip()

    existing = (
        db.query(Biomarker)
        .filter(Biomarker.biomarker_id == biomarker_id)
        .first()
    )

    if existing:
        skipped += 1
        continue

    biomarker = Biomarker(
        biomarker_id=biomarker_id,
        biomarker_name=str(row["Biomarker_Name"]).strip(),
        disease_name=str(row["Diseasename"]).strip(),
        icd11=str(row["ICD11"]).strip(),
        icd10=str(row["ICD10"]).strip(),
        icd9=str(row["ICD9"]).strip(),
    )

    db.add(biomarker)
    count += 1

db.commit()
db.close()

print("=" * 40)
print(f"✅ Imported : {count}")
print(f"⏭️ Skipped  : {skipped}")
print("=" * 40)