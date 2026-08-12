import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]
file_path = BASE_DIR / "datasets" / "Bioactives.xlsx"

excel = pd.ExcelFile(file_path)

print("=" * 60)
print("Total Sheets:", len(excel.sheet_names))
print("=" * 60)

for sheet in excel.sheet_names:
    df = pd.read_excel(file_path, sheet_name=sheet)

    print(f"\nSheet: {sheet}")
    print(f"Rows: {len(df)}")
    print(f"Columns: {len(df.columns)}")
    print("Column Names:")
    print(df.columns.tolist())