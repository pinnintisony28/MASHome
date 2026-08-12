import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]
file_path = BASE_DIR / "datasets" / "Bioactives.xlsx"

df = pd.read_excel(file_path, sheet_name="Toxicity Prediction", header=None)

# Print rows 80 to 130
print(df.iloc[80:130])