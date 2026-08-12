import pandas as pd
from pathlib import Path

from app.database import SessionLocal
from app.models.bioactive import Bioactive
from app.models.bioactive_adme import BioactiveADME


# ----------------------------
# Helper Functions
# ----------------------------

def to_float(value):
    if pd.isna(value):
        return None

    value = str(value).strip()

    if value.lower() == "n/d":
        return None

    return float(value)


def to_int(value):
    if pd.isna(value):
        return None

    value = str(value).strip()

    if value.lower() == "n/d":
        return None

    return int(float(value))


# ----------------------------
# Project Root
# ----------------------------

BASE_DIR = Path(__file__).resolve().parents[3]
file_path = BASE_DIR / "datasets" / "Bioactives.xlsx"

# ----------------------------
# Read ADME Sheet
# ----------------------------

df = pd.read_excel(file_path, sheet_name="ADME")
df.columns = df.columns.str.strip()

db = SessionLocal()

print("Deleting existing ADME data...")

db.query(BioactiveADME).delete()
db.commit()

print("Old ADME data deleted successfully.")

print(f"Total Rows: {len(df)}")
print("Importing ADME data...")

count = 0

# ----------------------------
# Import Loop
# ----------------------------

for _, row in df.iterrows():

    molecule = str(row["Molecule"]).strip()

    bioactive = (
        db.query(Bioactive)
        .filter(Bioactive.bioactive_name == molecule)
        .first()
    )

    if not bioactive:
        print(f"❌ Bioactive not found: {molecule}")
        continue

    adme = BioactiveADME(

        bioactive_id=bioactive.bioactive_id,

        canonical_smiles=str(row["Canonical SMILES"]).strip() if pd.notna(row["Canonical SMILES"]) else "",

        molecular_formula=str(row["Formula"]).strip() if pd.notna(row["Formula"]) else "",

        molecular_weight=str(row["MW"]).strip() if pd.notna(row["MW"]) else "",

        heavy_atoms=to_int(row["#Heavy atoms"]),

        aromatic_heavy_atoms=to_int(row["#Aromatic heavy atoms"]),

        fraction_csp3=to_float(row["Fraction Csp3"]),

        rotatable_bonds=to_int(row["#Rotatable bonds"]),

        h_bond_acceptors=to_int(row["#H-bond acceptors"]),

        h_bond_donors=to_int(row["#H-bond donors"]),

        molar_refractivity=to_float(row["MR"]),

        tpsa=to_float(row["TPSA"]),

        ilogp=to_float(row["iLOGP"]),

        gi_absorption=str(row["GI absorption"]).strip() if pd.notna(row["GI absorption"]) else "",

        bbb_permeant=str(row["BBB permeant"]).strip() if pd.notna(row["BBB permeant"]) else "",

        pgp_substrate=str(row["Pgp substrate"]).strip() if pd.notna(row["Pgp substrate"]) else "",

        cyp1a2_inhibitor=str(row["CYP1A2 inhibitor"]).strip() if pd.notna(row["CYP1A2 inhibitor"]) else "",

        cyp2c19_inhibitor=str(row["CYP2C19 inhibitor"]).strip() if pd.notna(row["CYP2C19 inhibitor"]) else "",

        cyp2c9_inhibitor=str(row["CYP2C9 inhibitor"]).strip() if pd.notna(row["CYP2C9 inhibitor"]) else "",

        cyp2d6_inhibitor=str(row["CYP2D6 inhibitor"]).strip() if pd.notna(row["CYP2D6 inhibitor"]) else "",

        cyp3a4_inhibitor=str(row["CYP3A4 inhibitor"]).strip() if pd.notna(row["CYP3A4 inhibitor"]) else "",

        lipinski=str(row["Lipinski #violations"]).strip() if pd.notna(row["Lipinski #violations"]) else "",

        ghose=str(row["Ghose #violations"]).strip() if pd.notna(row["Ghose #violations"]) else "",

        veber=str(row["Veber #violations"]).strip() if pd.notna(row["Veber #violations"]) else "",

        egan=str(row["Egan #violations"]).strip() if pd.notna(row["Egan #violations"]) else "",

        muegge=str(row["Muegge #violations"]).strip() if pd.notna(row["Muegge #violations"]) else "",

        bioavailability_score=to_float(row["Bioavailability Score"]),
    )

    db.add(adme)
    count += 1

# ----------------------------
# Commit
# ----------------------------

db.commit()
db.close()

print("=" * 50)
print(f"✅ Successfully imported {count} ADME records.")
print("=" * 50)