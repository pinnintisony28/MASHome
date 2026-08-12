from sqlalchemy.orm import Session

from app.models.target import Target
from app.models.target_drug import TargetDrug
from sqlalchemy import or_


def get_all_targets(db: Session, page: int = 1, limit: int = 25):
    offset = (page - 1) * limit

    total = db.query(Target).count()

    items = (
        db.query(Target)
        .offset(offset)
        .limit(limit)
        .all()
    )

    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit,
    }

def get_target_by_id(db: Session, target_id: str):
    return (
        db.query(Target)
        .filter(Target.target_id == target_id)
        .first()
    )
def get_target_drugs(db: Session, target_id: str):
    return (
        db.query(TargetDrug)
        .filter(TargetDrug.target_id == target_id)
        .all()
    )
def get_targets_by_type(db: Session, target_type: str):
    return (
        db.query(Target)
        .filter(Target.target_type.ilike(f"%{target_type}%"))
        .all()
    )
def search_targets(db: Session, keyword: str):
    return (
        db.query(Target)
        .filter(
            or_(
                Target.target_id.ilike(f"%{keyword}%"),
                Target.target_name.ilike(f"%{keyword}%"),
                Target.gene_name.ilike(f"%{keyword}%"),
                Target.bio_class.ilike(f"%{keyword}%"),
                Target.target_type.ilike(f"%{keyword}%"),
            )
        )
        .all()
    )