import time
import requests

from app.database import SessionLocal
from app.models.gene import Gene
from app.models.gene_properties import GeneProperties

ENSEMBL_URL = "https://rest.ensembl.org/lookup/id/{}"

HEADERS = {
    "Content-Type": "application/json"
}


def get_ensembl_data(ensembl_id):
    url = ENSEMBL_URL.format(ensembl_id)

    try:
      response = requests.get(
        url,
        headers=HEADERS,
        timeout=20
    )
    except requests.exceptions.RequestException as e:
      print(f"Request failed: {ensembl_id} -> {e}")
      return None
    if response.status_code != 200:
        print(f"Failed: {ensembl_id} -> {response.status_code}")
        return None

    return response.json()


def main():
    db = SessionLocal()

    try:
        genes = (
            db.query(Gene)
            .filter(
                Gene.ensembl_gene_id.isnot(None),
                Gene.chromosome.is_(None)
            )
            .all()
        )

        print("Genes to enrich:", len(genes))

        updated = 0
        failed = 0

        for index, gene in enumerate(genes, start=1):

            data = get_ensembl_data(gene.ensembl_gene_id)

            if not data:
                failed += 1
                continue

            gene.chromosome = data.get("seq_region_name")
            gene.start = data.get("start")
            gene.end = data.get("end")
            gene.strand = data.get("strand")
            gene.assembly = data.get("assembly_name")
            gene.canonical_transcript = data.get(
                "canonical_transcript"
            )

            updated += 1

            if index % 50 == 0:
                db.commit()
                print(
                    f"Processed: {index}/{len(genes)} | "
                    f"Updated: {updated} | "
                    f"Failed: {failed}"
                )

            time.sleep(0.1)

        db.commit()

        print("\nCompleted")
        print("Updated:", updated)
        print("Failed:", failed)

    finally:
        db.close()


if __name__ == "__main__":
    main()