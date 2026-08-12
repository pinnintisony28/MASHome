from sqlalchemy.orm import Session
from app.models.drug import Drug


def get_all_drugs(db: Session):
    return db.query(Drug).all()


def get_drug_by_id(db: Session, drug_id: int):
    return db.query(Drug).filter(Drug.id == drug_id).first()


def search_drugs(db: Session, keyword: str):
    return db.query(Drug).filter(
        Drug.molecule_name.ilike(f"%{keyword}%")
    ).all()