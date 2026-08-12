import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]
file_path = BASE_DIR / "datasets" / "Bioactives.xlsx"

excel = pd.ExcelFile(file_path)

for sheet in excel.sheet_names:
    print("\n" + "=" * 60)
    print(f"Sheet: {sheet}")

    df = pd.read_excel(file_path, sheet_name=sheet)

    print("Shape:", df.shape)
    print("Columns:", df.columns.tolist())
if sheet == "Toxicity Prediction":
    print("\nFirst 15 Rows:")
    print(df.head(15))