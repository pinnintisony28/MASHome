import pandas as pd
from pathlib import Path

from app.database import SessionLocal
from app.models.gene import Gene

BASE_DIR = Path(__file__).resolve().parents[3]

file_path = BASE_DIR / "datasets" / "GeneCards_Genes.xlsx"

# Read Excel
df = pd.read_excel(file_path, header=3)

# Use the first row as the actual column names
df.columns = df.iloc[0]

# Remove the header row from the data
df = df[1:].reset_index(drop=True)

# Remove completely empty rows
df = df.dropna(how="all")

db = SessionLocal()

updated = 0

for _, row in df.iterrows():

    symbol = str(row["Symbol"]).strip()

    gene = db.query(Gene).filter(Gene.symbol == symbol).first()

    if gene:
        gene.gene_name = str(row["Name"]).strip()
        gene.gene_type = str(row["Type"]).strip()
        updated += 1

db.commit()
db.close()

print(f"✅ Updated {updated} genes successfully.")