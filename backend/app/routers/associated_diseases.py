from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.associated_disease_schema import (
    AssociatedDiseaseResponse,
    AssociatedDiseaseListResponse,
)

from app.services.associated_disease_service import (
    get_associated_diseases,
    search_associated_diseases,
    get_associated_disease_by_id,
)


router = APIRouter(
    prefix="/associated-diseases",
    tags=["Associated Diseases"],
)


@router.get(
    "/",
    response_model=AssociatedDiseaseListResponse,
)
def get_all_associated_diseases(
    page: int = Query(1, ge=1),
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return get_associated_diseases(
        db,
        page,
        limit,
    )


@router.get(
    "/search/{keyword}",
    response_model=list[AssociatedDiseaseResponse],
)
def search_diseases(
    keyword: str,
    db: Session = Depends(get_db),
):
    return search_associated_diseases(
        db,
        keyword,
    )


@router.get(
    "/{disease_id}",
    response_model=AssociatedDiseaseResponse,
)
def get_associated_disease(
    disease_id: int,
    db: Session = Depends(get_db),
):
    disease = get_associated_disease_by_id(
        db,
        disease_id,
    )

    if not disease:
        raise HTTPException(
            status_code=404,
            detail="Associated disease not found",
        )

    return disease