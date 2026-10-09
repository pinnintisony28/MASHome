from sqlalchemy.orm import Session
from app.models.gene import Gene
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_

def get_all_genes(db: Session):
    return db.query(Gene).all()


def get_gene_by_symbol(db: Session, symbol: str):
    return db.query(Gene).filter(Gene.symbol == symbol).first()


def search_genes(db: Session, keyword: str):
    search = f"%{keyword}%"

    return db.query(Gene).filter(
        or_(
            Gene.symbol.ilike(search),
            Gene.original_symbol.ilike(search),
            Gene.gene_name.ilike(search),
            Gene.previous_symbol.ilike(search),
            Gene.synonyms_aliases.ilike(search),
            Gene.ncbi_gene_id.ilike(search),
            Gene.ensembl_gene_id.ilike(search),
            Gene.hgnc_id.ilike(search),
        )
    ).all()


def get_gene_details(db: Session, symbol: str):
    return (
        db.query(Gene)
        .options(joinedload(Gene.properties))
        .filter(Gene.symbol == symbol)
        .first()
    )