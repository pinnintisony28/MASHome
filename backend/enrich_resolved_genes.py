import requests
import time
from sqlalchemy import text

from app.database import engine


HGNC_URL = "https://rest.genenames.org/fetch/entrez_id/{}"


def get_hgnc_gene(ncbi_id):
    try:
        response = requests.get(
            HGNC_URL.format(ncbi_id),
            headers={"Accept": "application/json"},
            timeout=30,
        )

        if response.status_code != 200:
            print(f"HGNC error for {ncbi_id}: {response.status_code}")
            return None

        docs = response.json()["response"]["docs"]

        if not docs:
            print(f"No HGNC record for NCBI ID: {ncbi_id}")
            return None

        return docs[0]

    except requests.RequestException as e:
        print(f"Request failed for {ncbi_id}: {e}")
        return None


with engine.begin() as db:

    rows = db.execute(
        text("""
            SELECT id, original_symbol, symbol, ncbi_gene_id
            FROM genes
            WHERE status = 'resolved'
            AND gene_name IS NULL
        """)
    ).fetchall()

    print(f"Records to enrich: {len(rows)}")

    updated = 0

    for row in rows:

        gene_id = row[0]
        original_symbol = row[1]
        current_symbol = row[2]
        ncbi_id = row[3]

        print(
            f"Enriching {original_symbol} -> "
            f"{current_symbol} ({ncbi_id})"
        )

        data = get_hgnc_gene(ncbi_id)

        if not data:
            continue

        db.execute(
            text("""
                UPDATE genes
                SET
                    gene_name = :gene_name,
                    previous_symbol = :previous_symbol,
                    synonyms_aliases = :synonyms_aliases,
                    gene_type = :gene_type,
                    genomic_location = :genomic_location,
                    ncbi_gene_id = :ncbi_gene_id,
                    ensembl_gene_id = :ensembl_gene_id,
                    hgnc_id = :hgnc_id,
                    uniprot_id = :uniprot_id,
                    refseq = :refseq,
                    mane_select = :mane_select,
                    status = 'resolved_enriched'
                WHERE id = :id
            """),
            {
                "id": gene_id,
                "gene_name": data.get("name"),
                "previous_symbol": str(data.get("prev_symbol"))
                    if data.get("prev_symbol")
                    else None,
                "synonyms_aliases": str(data.get("alias_symbol"))
                    if data.get("alias_symbol")
                    else None,
                "gene_type": data.get("locus_type"),
                "genomic_location": data.get("location"),
                "ncbi_gene_id": str(data.get("entrez_id"))
                    if data.get("entrez_id")
                    else None,
                "ensembl_gene_id": data.get("ensembl_gene_id"),
                "hgnc_id": data.get("hgnc_id"),
                "uniprot_id": str(data.get("uniprot_ids"))
                    if data.get("uniprot_ids")
                    else None,
                "refseq": str(data.get("refseq_accession"))
                    if data.get("refseq_accession")
                    else None,
                "mane_select": str(data.get("mane_select"))
                    if data.get("mane_select")
                    else None,
            },
        )

        updated += 1

        time.sleep(0.1)

    print()
    print("===================================")
    print("Resolved gene enrichment complete")
    print("===================================")
    print(f"Updated: {updated}")
    print("===================================")