import requests
import pandas as pd
import time

# Read gene symbols
df = pd.read_excel("../datasets/Gene_6961.xlsx", sheet_name="All")
unique_genes = df["symbol"].drop_duplicates().tolist()

def get_hgnc_gene(symbol):
    url = f"https://rest.genenames.org/fetch/symbol/{symbol}"

    try:
        response = requests.get(
            url,
            headers={"Accept": "application/json"},
            timeout=30
        )

        if response.status_code != 200:
            print(f"API error for {symbol}: {response.status_code}")
            return None

        docs = response.json()["response"]["docs"]

        if not docs:
            print(f"Gene not found: {symbol}")
            return None

        return docs[0]

    except requests.exceptions.RequestException as e:
       print(f"Request failed for {symbol}: {e}")
       time.sleep(2)
       return None


results = []

for symbol in unique_genes:
    data = get_hgnc_gene(symbol)

    if data:
        results.append({
            "gene_symbol": data.get("symbol"),
            "official_gene_name": data.get("name"),
            "previous_symbol": data.get("prev_symbol"),
            "synonyms_aliases": data.get("alias_symbol"),
            "gene_type": data.get("locus_type"),
            "genomic_location": data.get("location"),
            "ncbi_gene_id": data.get("entrez_id"),
            "ensembl_gene_id": data.get("ensembl_gene_id"),
            "hgnc_id": data.get("hgnc_id"),
            "uniprot_id": data.get("uniprot_ids"),
            "refseq": data.get("refseq_accession"),
            "mane_select": data.get("mane_select")
        })

    time.sleep(0.1)

print(results)
pd.DataFrame(results).to_csv("hgnc_test.csv", index=False)