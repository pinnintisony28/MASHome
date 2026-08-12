from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.bioactive_adme import BioactiveADME


def get_all_adme(db: Session):
    return db.query(BioactiveADME).all()


def get_adme_by_id(db: Session, adme_id: int):
    return (
        db.query(BioactiveADME)
        .filter(BioactiveADME.id == adme_id)
        .first()
    )


def get_adme_by_bioactive(db: Session, bioactive_id: int):
    return (
        db.query(BioactiveADME)
        .filter(BioactiveADME.bioactive_id == bioactive_id)
        .first()
    )


def search_adme(db: Session, keyword: str):
    keyword = f"%{keyword}%"

    return (
        db.query(BioactiveADME)
        .filter(
            or_(
                BioactiveADME.molecular_formula.ilike(keyword),
                BioactiveADME.gi_absorption.ilike(keyword),
                BioactiveADME.bbb_permeant.ilike(keyword),
                BioactiveADME.pgp_substrate.ilike(keyword),
                BioactiveADME.lipinski.ilike(keyword),
                BioactiveADME.ghose.ilike(keyword),
                BioactiveADME.veber.ilike(keyword),
                BioactiveADME.egan.ilike(keyword),
                BioactiveADME.muegge.ilike(keyword),
            )
        )
        .all()
    )