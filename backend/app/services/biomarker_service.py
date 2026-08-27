from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.biomarker import Biomarker


def get_all_biomarkers(db: Session):
    return (
        db.query(Biomarker)
        .order_by(Biomarker.id.asc())
        .all()
    )


def get_biomarker_by_id(
    db: Session,
    biomarker_id: int
):
    return (
        db.query(Biomarker)
        .filter(
            Biomarker.id == biomarker_id
        )
        .first()
    )


def search_biomarkers(
    db: Session,
    keyword: str
):
    search = f"%{keyword}%"

    return (
        db.query(Biomarker)
        .filter(
            or_(
                Biomarker.biomarker_name.ilike(
                    search
                ),
                Biomarker.biomarker_id.ilike(
                    search
                ),
                Biomarker.category.ilike(
                    search
                ),
                Biomarker.subgroup.ilike(
                    search
                ),
                Biomarker.description.ilike(
                    search
                ),
                Biomarker.clinical_significance.ilike(
                    search
                ),
            )
        )
        .order_by(
            Biomarker.id.asc()
        )
        .all()
    )