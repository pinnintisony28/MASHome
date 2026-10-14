
import pandas as pd

file_path = "../datasets/Pathways.xlsx"

sheets = [
    "PI3K–AKT–mTOR",
    "PPAR",
    "Fatty Acid Oxidation",
    "NF-κB",
    "TGF-β–SMAD",
]

fields = [
    "Pathway_ID",
    "Pathway_Name",
    "Cellular Location",
    "Primary Function",
]

for sheet in sheets:
    df = pd.read_excel(file_path, sheet_name=sheet, header=None)

    print(f"\n--- {sheet} ---")

    for _, row in df.iterrows():
        values = [str(value).strip() for value in row.tolist()]

        if values and values[0] in fields:
            print(values[:2])
