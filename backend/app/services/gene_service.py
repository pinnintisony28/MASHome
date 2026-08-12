from sqlalchemy.orm import Session
from app.models.gene import Gene
from sqlalchemy.orm import Session, joinedload

def get_all_genes(db: Session):
    return db.query(Gene).all()


def get_gene_by_symbol(db: Session, symbol: str):
    return db.query(Gene).filter(Gene.symbol == symbol).first()


def search_genes(db: Session, keyword: str):
    return db.query(Gene).filter(
        Gene.symbol.ilike(f"%{keyword}%")
    ).all()


def get_gene_details(db: Session, symbol: str):
    return (
        db.query(Gene)
        .options(joinedload(Gene.properties))
        .filter(Gene.symbol == symbol)
        .first()
    )