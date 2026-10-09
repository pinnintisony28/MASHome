import requests
import pandas as pd
import time

ensembl_ids = [
    "ENSG00000223804",
    "ENSG00000227863",
    "ENSG00000230551",
    "ENSG00000236543",
    "ENSG00000251605",
    "ENSG00000254051",
    "ENSG00000255856",
    "ENSG00000261564",
    "ENSG00000271204",
    "ENSG00000279284",
    "ENSG00000280371",
    "ENSG00000290929",
    "ENSG00000292259",
    "ENSG00000293339",
    "ENSG00000293569",
    "ENSG00000293615"
]

results = []

for gene_id in ensembl_ids:

    url = f"https://rest.ensembl.org/lookup/id/{gene_id}?content-type=application/json"

    try:
        response = requests.get(url, timeout=30)

        if response.status_code != 200:
            print(f"API error for {gene_id}: {response.status_code}")
            continue

        data = response.json()

        results.append({
            "gene_symbol": data.get("display_name"),
            "official_gene_name": data.get("description"),
            "gene_type": data.get("biotype"),
            "ensembl_gene_id": data.get("id"),
            "chromosome": data.get("seq_region_name"),
            "start": data.get("start"),
            "end": data.get("end"),
            "strand": data.get("strand"),
            "assembly": data.get("assembly_name"),
            "species": data.get("species"),
            "canonical_transcript": data.get("canonical_transcript")
        })

        print(f"Collected: {gene_id}")

    except requests.exceptions.RequestException as e:
        print(f"Request failed for {gene_id}: {e}")

    time.sleep(0.2)


df = pd.DataFrame(results)

df.to_csv("ensembl_test.csv", index=False)

print("\nCompleted!")
print("Records collected:", len(df))
print("Saved to: ensembl_test.csv")