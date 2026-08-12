from math import ceil

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.associated_disease import AssociatedDisease


def get_associated_diseases(
    db: Session,
    page: int = 1,
    limit: int = 25,
):
    query = db.query(AssociatedDisease)

    total = query.count()

    diseases = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "items": diseases,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": ceil(total / limit) if total else 1,
    }


def search_associated_diseases(
    db: Session,
    keyword: str,
):
    keyword = f"%{keyword}%"

    return (
        db.query(AssociatedDisease)
        .filter(
            or_(
                AssociatedDisease.associated_disease.ilike(
                    keyword
                ),
                AssociatedDisease.relationship_with_nafld_mash.ilike(
                    keyword
                ),
                AssociatedDisease.underlying_reason.ilike(
                    keyword
                ),
            )
        )
        .all()
    )


def get_associated_disease_by_id(
    db: Session,
    disease_id: int,
):
    return (
        db.query(AssociatedDisease)
        .filter(
            AssociatedDisease.id == disease_id
        )
        .first()
    )