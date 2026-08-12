import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

file_path = BASE_DIR / "datasets" / "Biomarkers_TTD.xlsx"

excel = pd.ExcelFile(file_path)

print("Sheets:")
print(excel.sheet_names)

df = pd.read_excel(file_path)

print("\nShape:")
print(df.shape)

print("\nColumns:")
print(df.columns.tolist())

print("\nFirst 10 Rows:")
print(df.head(10))