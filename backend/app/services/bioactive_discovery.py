from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.bioactive import Bioactive


def discover_bioactives(db: Session, keyword: str):

    bioactives = db.query(Bioactive).filter(
        or_(
            Bioactive.plant_name.ilike(f"%{keyword}%"),
            Bioactive.chemical_constituent.ilike(f"%{keyword}%")
        )
    ).all()

    result = []

    for bioactive in bioactives:
        result.append({
            "id": str(bioactive.id),
            "name": bioactive.chemical_constituent or bioactive.plant_name
        })

    return result