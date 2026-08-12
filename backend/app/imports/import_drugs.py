import pandas as pd
from pathlib import Path

from app.database import SessionLocal
from app.models.drug import Drug

# Project root
BASE_DIR = Path(__file__).resolve().parents[3]

# Excel file
file_path = BASE_DIR / "datasets" / "Approved_Drugs.xlsx"

# Read Excel
df = pd.read_excel(file_path)

# Remove empty rows
df = df.dropna(how="all")

# Create database session
db = SessionLocal()

count = 0

for _, row in df.iterrows():

    # Skip rows without molecule name
    if pd.isna(row["Molecule Name"]):
        continue

    drug = Drug(
        molecule_name=str(row["Molecule Name"]).strip(),
        brand=str(row["Brand"]).strip() if pd.notna(row["Brand"]) else "",
        route=str(row["Route"]).strip() if pd.notna(row["Route"]) else "",
        dosage_form=str(row["Dosage Form"]).strip() if pd.notna(row["Dosage Form"]) else "",
        therapeutic_category=str(row["Therapeutic Category"]).strip() if pd.notna(row["Therapeutic Category"]) else "",
        description=str(row["Description"]).strip() if pd.notna(row["Description"]) else "",
    )

    db.add(drug)
    count += 1

db.commit()
db.close()

print(f"✅ {count} drugs imported successfully.")