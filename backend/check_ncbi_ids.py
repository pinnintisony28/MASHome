from sqlalchemy import text
from app.database import engine

with engine.connect() as c:
    row = c.execute(
        text("SELECT symbol, ncbi_gene_id FROM genes WHERE symbol = 'PNPLA3'")
    ).fetchone()

    print(row)