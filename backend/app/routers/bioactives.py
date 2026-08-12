from fastapi import APIRouter
from app.database import SessionLocal
from fastapi.encoders import jsonable_encoder
from app.schemas.bioactive_schema import BioactiveSchema
from app.services.bioactive_service import (
    get_all_bioactives,
    get_bioactive_by_id,
    search_bioactives,
)

from app.services.molecule_service import get_molecule_info

router = APIRouter(
    prefix="/bioactives",
    tags=["Bioactives"],
)


@router.get("/", response_model=list[BioactiveSchema])
def read_bioactives():
    db = SessionLocal()
    try:
        return get_all_bioactives(db)
    finally:
        db.close()


@router.get("/search/{keyword}", response_model=list[BioactiveSchema])
def search(keyword: str):
    db = SessionLocal()
    try:
        return search_bioactives(db, keyword)
    finally:
        db.close()

@router.get("/{bioactive_id}", response_model=BioactiveSchema)
def read_bioactive(bioactive_id: int):
    db = SessionLocal()
    try:
        return get_bioactive_by_id(db, bioactive_id)
    finally:
        db.close()


@router.get("/{bioactive_id}/molecule")
def read_molecule(bioactive_id: int):
    db = SessionLocal()

    try:
        bioactive = get_bioactive_by_id(db, bioactive_id)

        if not bioactive:
            return {"message": "Bioactive not found."}

        return get_molecule_info(
            bioactive.bioactive_name
        )

    finally:
        db.close()