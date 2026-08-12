from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas.drug_schema import DrugResponse
from app.services.drug_service import (
    get_all_drugs,
    get_drug_by_id,
    search_drugs,
)

router = APIRouter(prefix="/drugs", tags=["Drugs"])


@router.get("/", response_model=list[DrugResponse])
def read_drugs():
    db: Session = SessionLocal()

    try:
        return get_all_drugs(db)
    finally:
        db.close()


@router.get("/{drug_id}", response_model=DrugResponse)
def read_drug(drug_id: int):
    db: Session = SessionLocal()

    try:
        return get_drug_by_id(db, drug_id)
    finally:
        db.close()


@router.get("/search/{keyword}", response_model=list[DrugResponse])
def search(keyword: str):
    db: Session = SessionLocal()

    try:
        return search_drugs(db, keyword)
    finally:
        db.close()