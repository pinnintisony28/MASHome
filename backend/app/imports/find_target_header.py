import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]
file_path = BASE_DIR / "datasets" / "Targets_TTD.xlsx"

df = pd.read_excel(file_path, sheet_name="TTD_Targets", header=None)

# Show rows 30 to 80
print(df.iloc[30:80])