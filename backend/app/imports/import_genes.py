import pandas as pd
from pathlib import Path

from app.database import SessionLocal
from app.models.gene import Gene

# Project Root
BASE_DIR = Path(__file__).resolve().parents[3]

# Excel File
file_path = BASE_DIR / "datasets" / "Gene_Data.xlsx"

# Read Excel
df = pd.read_excel(file_path)

# Remove empty rows
df = df.dropna(how="all")

db = SessionLocal()

count = 0

for _, row in df.iterrows():

    symbol = str(row["Symbol"]).strip()

    if not symbol:
        continue

    # Skip duplicates
    existing = db.query(Gene).filter(Gene.symbol == symbol).first()

    if existing:
        continue

    gene = Gene(
        symbol=symbol
    )

    db.add(gene)
    count += 1

db.commit()
db.close()

print(f"✅ {count} genes imported successfully.")