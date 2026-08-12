from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.schemas.biomarker_schema import BiomarkerResponse

from app.services.biomarker_service import (
    get_all_biomarkers,
    get_biomarker_by_id,
    search_biomarkers,
)

router = APIRouter(
    prefix="/biomarkers",
    tags=["Biomarkers"],
)


@router.get("/", response_model=list[BiomarkerResponse])
def read_biomarkers():
    db = SessionLocal()
    try:
        return get_all_biomarkers(db)
    finally:
        db.close()


@router.get("/search/{keyword}", response_model=list[BiomarkerResponse])
def search(keyword: str):
    db = SessionLocal()
    try:
        return search_biomarkers(db, keyword)
    finally:
        db.close()


@router.get("/{biomarker_id}", response_model=BiomarkerResponse)
def read_biomarker(biomarker_id: int):
    db = SessionLocal()
    try:
        return get_biomarker_by_id(db, biomarker_id)
    finally:
        db.close()