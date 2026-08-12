from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.bioactive_toxicity import BioactiveToxicity


def get_all_toxicity(
    db: Session,
    page: int = 1,
    limit: int = 25
):
    offset = (page - 1) * limit

    query = db.query(BioactiveToxicity)

    total = query.count()

    records = (
        query
        .order_by(BioactiveToxicity.id)
        .offset(offset)
        .limit(limit)
        .all()
    )

    return {
        "items": records,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit,
    }


def get_toxicity_by_id(
    db: Session,
    toxicity_id: int
):
    return (
        db.query(BioactiveToxicity)
        .filter(BioactiveToxicity.id == toxicity_id)
        .first()
    )


def get_toxicity_by_bioactive(
    db: Session,
    bioactive_id: int
):
    return (
        db.query(BioactiveToxicity)
        .filter(BioactiveToxicity.bioactive_id == bioactive_id)
        .all()
    )


def search_toxicity(
    db: Session,
    keyword: str
):
    return (
        db.query(BioactiveToxicity)
        .filter(
            or_(
                BioactiveToxicity.category.ilike(f"%{keyword}%"),
                BioactiveToxicity.endpoint.ilike(f"%{keyword}%"),
                BioactiveToxicity.prediction.ilike(f"%{keyword}%"),
                BioactiveToxicity.predicted_toxicity_class.ilike(f"%{keyword}%"),
            )
        )
        .all()
    )