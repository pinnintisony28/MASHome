from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.target import Target


def discover_targets(db: Session, keyword: str, gene_symbols: list):

    query = db.query(Target)

    filters = [
        Target.target_name.ilike(f"%{keyword}%"),
        Target.gene_name.ilike(f"%{keyword}%"),
        Target.synonyms.ilike(f"%{keyword}%")
    ]

    for symbol in gene_symbols:
        filters.append(Target.gene_name.ilike(f"%{symbol}%"))

    targets = query.filter(or_(*filters)).all()

    result = []
    target_ids = []

    for target in targets:

        target_ids.append(target.target_id)

        result.append({
            "id": target.target_id,
            "name": target.target_name or target.target_id
        })

    return result, target_ids