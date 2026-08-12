from math import ceil

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.clinical_trial import ClinicalTrial

def get_trials_by_status(db: Session, status: str):
    return (
        db.query(ClinicalTrial)
        .filter(ClinicalTrial.status.ilike(status))
        .all()
    )
def get_clinical_trials(db: Session, page: int = 1, limit: int = 25):
    query = db.query(ClinicalTrial)

    total = query.count()

    trials = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "items": trials,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": ceil(total / limit) if total else 1,
    }


def get_clinical_trial_by_id(db: Session, trial_id: str):
    return (
        db.query(ClinicalTrial)
        .filter(ClinicalTrial.trial_id == trial_id)
        .first()
    )


def search_clinical_trials(db: Session, keyword: str):
    keyword = f"%{keyword}%"

    return (
        db.query(ClinicalTrial)
        .filter(
            or_(
                ClinicalTrial.trial_id.ilike(keyword),
                ClinicalTrial.title.ilike(keyword),
                ClinicalTrial.conditions.ilike(keyword),
                ClinicalTrial.interventions.ilike(keyword),
                ClinicalTrial.sponsor.ilike(keyword),
                ClinicalTrial.country.ilike(keyword),
                ClinicalTrial.phase.ilike(keyword),
                ClinicalTrial.status.ilike(keyword),
                ClinicalTrial.registry.ilike(keyword),
            )
        )
        .all()
    )