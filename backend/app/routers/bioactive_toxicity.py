from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.bioactive_toxicity_schema import BioactiveToxicityResponse
from app.services.bioactive_toxicity_service import (
    get_all_toxicity,
    get_toxicity_by_id,
    get_toxicity_by_bioactive,
    search_toxicity,
)

router = APIRouter(
    prefix="/bioactive-toxicity",
    tags=["Bioactive Toxicity"]
)


@router.get("/")
def get_toxicity(
    page: int = 1,
    limit: int = 25,
    db: Session = Depends(get_db)
):
    return get_all_toxicity(db, page, limit)


@router.get("/search/{keyword}", response_model=list[BioactiveToxicityResponse])
def search(keyword: str, db: Session = Depends(get_db)):
    return search_toxicity(db, keyword)


@router.get("/bioactive/{bioactive_id}", response_model=list[BioactiveToxicityResponse])
def get_by_bioactive(
    bioactive_id: int,
    db: Session = Depends(get_db)
):
    records = get_toxicity_by_bioactive(db, bioactive_id)

    if not records:
        raise HTTPException(
            status_code=404,
            detail="No toxicity records found for this bioactive."
        )

    return records


@router.get("/{toxicity_id}", response_model=BioactiveToxicityResponse)
def get_by_id(
    toxicity_id: int,
    db: Session = Depends(get_db)
):
    print(">>> BIOACTIVE TOXICITY ROUTER HIT:", toxicity_id)

    record = get_toxicity_by_id(db, toxicity_id)

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Toxicity record not found."
        )

    return record