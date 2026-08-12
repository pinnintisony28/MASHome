from sqlalchemy.orm import Session, joinedload
from app.models.bioactive import Bioactive


def get_all_bioactives(db: Session):
    return (
        db.query(Bioactive)
        .options(
            joinedload(Bioactive.adme),
            joinedload(Bioactive.toxicity),
            joinedload(Bioactive.plants)
        )
        .all()
    )


def get_bioactive_by_id(db: Session, bioactive_id: int):
    bioactive = (
        db.query(Bioactive)
        .options(
            joinedload(Bioactive.adme),
            joinedload(Bioactive.toxicity),
            joinedload(Bioactive.plants)
        )
        .filter(Bioactive.bioactive_id == bioactive_id)
        .first()
    )

    if bioactive is None:
        print(f"Bioactive with ID {bioactive_id} not found.")
        return None

    print("=" * 60)
    print("Bioactive:", bioactive.bioactive_name)
    print("Plants:", len(bioactive.plants))
    print("ADME:", bioactive.adme is not None)
    print("Toxicity Count:", len(bioactive.toxicity))
    print("=" * 60)

    return bioactive


def search_bioactives(db: Session, keyword: str):
    return (
        db.query(Bioactive)
        .options(
            joinedload(Bioactive.adme),
            joinedload(Bioactive.toxicity),
            joinedload(Bioactive.plants)
        )
        .filter(
            Bioactive.bioactive_name.ilike(f"%{keyword}%")
        )
        .all()
    )