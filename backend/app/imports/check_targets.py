import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

file_path = BASE_DIR / "datasets" / "Targets_TTD.xlsx"

excel = pd.ExcelFile(file_path)

print("Sheets:")
print(excel.sheet_names)

for sheet in excel.sheet_names:

    print("\n" + "=" * 70)
    print("Sheet:", sheet)

    df = pd.read_excel(file_path, sheet_name=sheet)

    print("Shape:", df.shape)

    print("\nColumns:")
    print(df.columns.tolist())

    print("\nData Types:")
    print(df.dtypes)

    print("\nFirst 5 Rows:")
    print(df.head())