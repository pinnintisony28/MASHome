import pandas as pd
from pathlib import Path

from app.database import SessionLocal
from app.models.bioactive import Bioactive
from app.models.bioactive_adme import BioactiveADME
from app.models.bioactive_toxicity import BioactiveToxicity

# Project Root
BASE_DIR = Path(__file__).resolve().parents[3]

# Dataset Path
file_path = BASE_DIR / "datasets" / "Bioactives.xlsx"

# Read Bioactives Sheet
df = pd.read_excel(file_path, sheet_name="Bioactives")
df.columns = df.columns.str.strip()

db = SessionLocal()

print("Deleting existing Bioactive data...")

# Delete child tables first
db.query(BioactiveADME).delete()
db.query(BioactiveToxicity).delete()
db.query(Bioactive).delete()

db.commit()

print("Old Bioactive data deleted successfully.")

print(f"Total Rows: {len(df)}")
print("Importing Bioactive molecules...")

count = 0

for _, row in df.iterrows():

    bioactive_name = (
        str(row["Bioactive"]).strip()
        if pd.notna(row["Bioactive"])
        else ""
    )

    if not bioactive_name:
        continue

    bioactive = Bioactive(
        bioactive_name=bioactive_name,
        molecular_formula=str(row["Molecular Formula"]).strip()
        if pd.notna(row["Molecular Formula"])
        else "",
        molecular_weight=str(row["Molecular Weight"]).strip()
        if pd.notna(row["Molecular Weight"])
        else "",
        iupac_name=str(row["IUPAC Name"]).strip()
        if pd.notna(row["IUPAC Name"])
        else "",
        smiles=str(row["SMILES"]).strip()
        if pd.notna(row["SMILES"])
        else "",
        plants=str(row["Chemical Constituents Containing Plants"]).strip()
        if pd.notna(row["Chemical Constituents Containing Plants"])
        else "",
        family=str(row["Family"]).strip()
        if pd.notna(row["Family"])
        else "",
        useful_part=str(row["Useful Part"]).strip()
        if pd.notna(row["Useful Part"])
        else "",
    )

    db.add(bioactive)
    count += 1

db.commit()
db.close()

print("=" * 50)
print(f"✅ Successfully imported {count} Bioactive molecules.")
print("=" * 50)
print(df.head(20))
print("\nColumns:")
print(df.columns.tolist())

print("\nNon-empty Bioactive values:")
print(df["Bioactive"].notna().sum())

print("\nUnique Bioactive values:")
print(df["Bioactive"].dropna().unique())