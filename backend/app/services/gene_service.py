
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_
from app.models.gene import Gene


def get_all_genes(db: Session, skip: int = 0, limit: int = 25):
    return (
        db.query(Gene)
        .order_by(Gene.id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_gene_count(db: Session):
    return db.query(Gene.id).count()


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
