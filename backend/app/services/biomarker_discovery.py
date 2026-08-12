from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.biomarker import Biomarker


def discover_biomarkers(db: Session, keyword: str):

    biomarkers = db.query(Biomarker).filter(
        or_(
            Biomarker.biomarker_name.ilike(f"%{keyword}%"),
            Biomarker.disease_name.ilike(f"%{keyword}%")
        )
    ).all()

    result = []

    for biomarker in biomarkers:
        result.append({
            "id": biomarker.biomarker_id,
            "name": biomarker.biomarker_name or biomarker.biomarker_id
        })

    return result