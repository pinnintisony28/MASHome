from sqlalchemy import text
from app.database import engine

with engine.connect() as c:
    rows = c.execute(
        text(
            "SELECT original_symbol, symbol, ncbi_gene_id "
            "FROM genes "
            "WHERE status = 'resolved' "
            "AND gene_name IS NULL "
            "ORDER BY original_symbol"
        )
    ).fetchall()

    for row in rows:
        print(row)