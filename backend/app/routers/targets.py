from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.schemas.target_schema import TargetResponse
from app.schemas.target_drug_schema import TargetDrugResponse

from app.services.target_service import (
    get_all_targets,
    get_target_by_id,
    search_targets,
    get_target_drugs,
    get_targets_by_type,
)

router = APIRouter(
    prefix="/targets",
    tags=["Targets"],
)

@router.get("/")
def read_targets(
    page: int = 1,
    limit: int = 25,
):
    db = SessionLocal()

    try:
        return get_all_targets(
            db=db,
            page=page,
            limit=limit,
        )
    finally:
        db.close()
    db = SessionLocal()
    try:
        return get_all_targets(db)
    finally:
        db.close()


@router.get("/search/{keyword}", response_model=list[TargetResponse])
def search(keyword: str):
    db = SessionLocal()
    try:
        return search_targets(db, keyword)
    finally:
        db.close()


@router.get("/type/{target_type}", response_model=list[TargetResponse])
def read_targets_by_type(target_type: str):
    db = SessionLocal()
    try:
        return get_targets_by_type(db, target_type)
    finally:
        db.close()


@router.get("/{target_id}/drugs", response_model=list[TargetDrugResponse])
def read_target_drugs(target_id: str):
    db = SessionLocal()
    try:
        return get_target_drugs(db, target_id)
    finally:
        db.close()


@router.get("/{target_id}", response_model=TargetResponse)
def read_target(target_id: str):
    db = SessionLocal()
    try:
        return get_target_by_id(db, target_id)
    finally:
        db.close()