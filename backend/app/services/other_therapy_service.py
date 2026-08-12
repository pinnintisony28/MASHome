from math import ceil

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.other_therapy import OtherTherapy


def get_other_therapies(
    db: Session,
    page: int = 1,
    limit: int = 25,
):
    offset = (page - 1) * limit

    total = (
        db.query(OtherTherapy)
        .count()
    )

    items = (
        db.query(OtherTherapy)
        .order_by(OtherTherapy.id)
        .offset(offset)
        .limit(limit)
        .all()
    )

    total_pages = ceil(total / limit) if total else 0

    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
    }


def search_other_therapies(
    db: Session,
    keyword: str,
    page: int = 1,
    limit: int = 25,
):
    offset = (page - 1) * limit

    search = f"%{keyword}%"

    query = db.query(OtherTherapy).filter(
        or_(
            OtherTherapy.source_sheet.ilike(search),
            OtherTherapy.category.ilike(search),
            OtherTherapy.item_name.ilike(search),
            OtherTherapy.secondary_name.ilike(search),
            OtherTherapy.description.ilike(search),
            OtherTherapy.mechanism.ilike(search),
            OtherTherapy.effect.ilike(search),
            OtherTherapy.outcome.ilike(search),
        )
    )

    total = query.count()

    items = (
        query
        .order_by(OtherTherapy.id)
        .offset(offset)
        .limit(limit)
        .all()
    )

    total_pages = ceil(total / limit) if total else 0

    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
    }


def get_other_therapy_by_id(
    db: Session,
    therapy_id: int,
):
    return (
        db.query(OtherTherapy)
        .filter(
            OtherTherapy.id == therapy_id
        )
        .first()
    )


def get_other_therapies_by_category(
    db: Session,
    category: str,
    page: int = 1,
    limit: int = 25,
):
    offset = (page - 1) * limit

    query = (
        db.query(OtherTherapy)
        .filter(
            OtherTherapy.category == category
        )
    )

    total = query.count()

    items = (
        query
        .order_by(OtherTherapy.id)
        .offset(offset)
        .limit(limit)
        .all()
    )

    total_pages = ceil(total / limit) if total else 0

    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
    }

def get_other_therapy_categories(db: Session):
    categories = (
        db.query(OtherTherapy.category)
        .distinct()
        .order_by(OtherTherapy.category)
        .all()
    )

    return [category[0] for category in categories]