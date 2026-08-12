from math import ceil

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.patent import Patent


def get_patents(
    db: Session,
    page: int = 1,
    limit: int = 25,
):
    query = db.query(Patent)

    total = query.count()

    patents = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "items": patents,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": ceil(total / limit) if total else 1,
    }

def get_patent_by_id(
    db: Session,
    patent_id: int,
):
    return (
        db.query(Patent)
        .filter(Patent.id == patent_id)
        .first()
    )
def search_patents(
    db: Session,
    keyword: str,
):
    keyword = f"%{keyword}%"

    return (
        db.query(Patent)
        .filter(
            or_(
                Patent.application_id.ilike(keyword),
                Patent.application_number.ilike(keyword),
                Patent.country.ilike(keyword),
                Patent.title.ilike(keyword),
                Patent.ipc.ilike(keyword),
            )
        )
        .all()
    )