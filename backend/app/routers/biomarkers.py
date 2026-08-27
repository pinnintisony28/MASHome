from fastapi import APIRouter, HTTPException
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


# =========================================================
# GET ALL BIOMARKERS
# =========================================================

@router.get(
    "/",
    response_model=list[BiomarkerResponse]
)
def read_biomarkers():
    db = SessionLocal()

    try:
        return get_all_biomarkers(db)

    finally:
        db.close()


# =========================================================
# SEARCH BIOMARKERS
# =========================================================

@router.get(
    "/search/{keyword}",
    response_model=list[BiomarkerResponse]
)
def search(keyword: str):
    db = SessionLocal()

    try:
        return search_biomarkers(
            db,
            keyword
        )

    finally:
        db.close()


# =========================================================
# GET BIOMARKER BY DATABASE ID
# =========================================================

@router.get(
    "/{biomarker_id}",
    response_model=BiomarkerResponse
)
def read_biomarker(
    biomarker_id: int
):
    db = SessionLocal()

    try:

        biomarker = get_biomarker_by_id(
            db,
            biomarker_id
        )

        if biomarker is None:
            raise HTTPException(
                status_code=404,
                detail="Biomarker not found"
            )

        return biomarker

    finally:
        db.close()