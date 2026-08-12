from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.gene import Gene


def discover_genes(db: Session, keyword: str):

    genes = db.query(Gene).filter(
        or_(
            Gene.symbol.ilike(f"%{keyword}%"),
            Gene.gene_name.ilike(f"%{keyword}%")
        )
    ).all()

    result = []
    symbols = []

    for gene in genes:

        symbols.append(gene.symbol)

        result.append({
            "id": gene.symbol,
            "name": gene.gene_name or gene.symbol
        })

    return result, symbols