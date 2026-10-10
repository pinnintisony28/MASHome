import pandas as pd
from pathlib import Path

from app.database import SessionLocal
from app.models.gene import Gene
from app.models.gene_properties import GeneProperties
def to_float(value):
    if pd.isna(value):
        return None

    try:
        return float(value)
    except (ValueError, TypeError):
        return None

def to_bool(value):
    if pd.isna(value) or str(value).strip().lower() in {
        "", "no data", "none", "nan"
    }:
        return None

    if isinstance(value, bool):
        return value

    text = str(value).strip().lower()

    if text in {"true", "yes", "1"}:
        return True

    if text in {"false", "no", "0"}:
        return False

    return None
# Project Root
BASE_DIR = Path(__file__).resolve().parents[3]

# Dataset Path
file_path = BASE_DIR / "datasets" / "Gene_OpenTargets.xlsx"

# Read Excel
df = pd.read_excel(file_path)

# Remove completely empty rows
df = df.dropna(how="all")

db = SessionLocal()

count = 0
skipped = 0

for _, row in df.iterrows():

    symbol = str(row["symbol"]).strip()

    # Find gene by symbol
    gene = db.query(Gene).filter(Gene.symbol == symbol).first()

    if gene is None:
        skipped += 1
        continue

    # Skip if already imported
    existing = (
        db.query(GeneProperties)
        .filter(GeneProperties.gene_id == gene.id)
        .first()
    )

    if existing:
        skipped += 1
        continue

    properties = GeneProperties(
        gene_id=gene.id,
        global_score=to_float(row["globalScore"]),
        max_clinical_stage=str(row["maxClinicalStage"]) if pd.notna(row["maxClinicalStage"]) else None,
        is_in_membrane=to_bool(row["isInMembrane"]),
        is_secreted=to_bool(row["isSecreted"]),
        has_ligand=to_bool(row["hasLigand"]),
        has_small_molecule_binder=to_bool(row["hasSmallMoleculeBinder"]),
        
has_pocket=to_bool(row["hasPocket"]),
       tissue_specificity=to_float(row["tissueSpecificity"]),

       tissue_distribution=to_float(row["tissueDistribution"]),
    )

    db.add(properties)
    count += 1

db.commit()
db.close()

print("=" * 40)
print(f"✅ Imported : {count}")
print(f"⏭️ Skipped  : {skipped}")
print("=" * 40)