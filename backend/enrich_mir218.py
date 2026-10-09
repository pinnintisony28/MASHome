from sqlalchemy import text

from app.database import engine


records = [
    {
        "ncbi_id": "407000",
        "gene_name": "microRNA 218-1",
        "genomic_location": "4p15.31",
        "chromosome": "4",
        "start": 20528274,
        "end": 20528383,
        "assembly": "GCF_000001405.40",
        "aliases": "MIRN218-1, mir-218-1",
    },
    {
        "ncbi_id": "407001",
        "gene_name": "microRNA 218-2",
        "genomic_location": "5q34",
        "chromosome": "5",
        "start": 168768145,
        "end": 168768254,
        "assembly": "GCF_000001405.40",
        "aliases": "MIRN218-2, mir-218-2",
    },
]


with engine.begin() as db:

    for record in records:

        db.execute(
            text("""
                UPDATE genes
                SET
                    gene_name = :gene_name,
                    synonyms_aliases = :aliases,
                    genomic_location = :genomic_location,
                    chromosome = :chromosome,
                    start = :start,
                    end = :end,
                    assembly = :assembly,
                    status = 'multiple_gene_mapping_enriched'
                WHERE ncbi_gene_id = :ncbi_id
                AND status = 'multiple_gene_mapping'
            """),
            record,
        )

        print(
            f"Enriched {record['gene_name']} "
            f"(NCBI {record['ncbi_id']})"
        )

print("MIR218 records enriched successfully")