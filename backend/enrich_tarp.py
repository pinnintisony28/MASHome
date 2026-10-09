from sqlalchemy import text

from app.database import engine


with engine.begin() as db:

    db.execute(
        text("""
            UPDATE genes
            SET
                gene_name = :gene_name,
                genomic_location = :genomic_location,
                chromosome = :chromosome,
                start = :start,
                end = :end,
                assembly = :assembly,
                status = 'resolved_enriched'
            WHERE symbol = 'TARP'
            AND ncbi_gene_id = '445347'
        """),
        {
            "gene_name": "TCR gamma alternate reading frame protein",
            "genomic_location": "7p14.1",
            "chromosome": "7",
            "start": 38259642,
            "end": 38273635,
            "assembly": "GCF_000001405.40",
        },
    )

    print("TARP enriched successfully")
    