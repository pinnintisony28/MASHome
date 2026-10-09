from sqlalchemy import text
from app.database import engine

with engine.connect() as c:
    rows = c.execute(
        text(
            "SELECT original_symbol, symbol, ncbi_gene_id, "
            "gene_name, status "
            "FROM genes "
            "WHERE status = 'multiple_gene_mapping_enriched'"
        )
    ).fetchall()

    for row in rows:
        print(row)