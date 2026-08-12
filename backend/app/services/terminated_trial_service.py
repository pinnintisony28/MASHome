from math import ceil

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.terminated_trial import TerminatedTrial


def get_terminated_trials(
    db: Session,
    page: int = 1,
    limit: int = 25,
):
    query = db.query(TerminatedTrial)

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


def search_terminated_trials(
    db: Session,
    keyword: str,
):
    keyword = f"%{keyword}%"

    return (
        db.query(TerminatedTrial)
        .filter(
            or_(
                TerminatedTrial.nct_number.ilike(keyword),
                TerminatedTrial.study_title.ilike(keyword),
                TerminatedTrial.conditions.ilike(keyword),
                TerminatedTrial.sponsor.ilike(keyword),
                TerminatedTrial.study_status.ilike(keyword),
            )
        )
        .all()
    )