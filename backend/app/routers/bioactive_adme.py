from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.bioactive_adme_schema import BioactiveADMEResponse
from app.services.bioactive_adme_service import (
    get_all_adme,
    get_adme_by_id,
    get_adme_by_bioactive,
    search_adme
)

router = APIRouter(
    prefix="/bioactive-adme",
    tags=["Bioactive ADME"]
)


@router.get("/", response_model=List[BioactiveADMEResponse])
def read_all_adme(db: Session = Depends(get_db)):
    return get_all_adme(db)


@router.get("/search/{keyword}", response_model=List[BioactiveADMEResponse])
def search_adme_records(keyword: str, db: Session = Depends(get_db)):
    return search_adme(db, keyword)


@router.get("/bioactive/{bioactive_id}", response_model=BioactiveADMEResponse)
def read_adme_by_bioactive(bioactive_id: int, db: Session = Depends(get_db)):
    adme = get_adme_by_bioactive(db, bioactive_id)

    if not adme:
        raise HTTPException(
            status_code=404,
            detail="ADME data not found for this bioactive"
        )

    return adme


@router.get("/{adme_id}", response_model=BioactiveADMEResponse)
def read_adme(adme_id: int, db: Session = Depends(get_db)):
    adme = get_adme_by_id(db, adme_id)

    if not adme:
        raise HTTPException(
            status_code=404,
            detail="ADME record not found"
        )

    return adme