import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

file_path = BASE_DIR / "datasets" / "Gene_OpenTargets.xlsx"

df = pd.read_excel(file_path)

# Remove completely empty rows
df = df.dropna(how="all")

print("\nShape:")
print(df.shape)

print("\nColumns:")
print(df.columns.tolist())

print("\nFirst 5 Rows:")
print(df.head())