from sqlalchemy.orm import Session
from app.models.biomarker import Biomarker


def get_all_biomarkers(db: Session):
    return db.query(Biomarker).all()


def get_biomarker_by_id(db: Session, biomarker_id: int):
    return db.query(Biomarker).filter(
        Biomarker.id == biomarker_id
    ).first()


def search_biomarkers(db: Session, keyword: str):
    return db.query(Biomarker).filter(
        Biomarker.biomarker_name.ilike(f"%{keyword}%")
    ).all()