import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

file_path = BASE_DIR / "datasets" / "Gene_OpenTargets.xlsx"

df = pd.read_excel(file_path)

print("Total Rows:", len(df))
print("Unique Symbols:", df["symbol"].nunique())

duplicates = df[df.duplicated(subset=["symbol"], keep=False)]

print("\nDuplicate Symbols:")
print(duplicates[["symbol"]].head(20))