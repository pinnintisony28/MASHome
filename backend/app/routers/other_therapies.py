from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.other_therapy_schema import (
    OtherTherapyListResponse,
    OtherTherapyResponse,
)

from app.services.other_therapy_service import (
    get_other_therapies,
    get_other_therapy_by_id,
    get_other_therapies_by_category,
    get_other_therapy_categories,
    search_other_therapies,
)


router = APIRouter(
    prefix="/other-therapies",
    tags=["Other Therapies"],
)


# --------------------------------------------------
# GET ALL
# --------------------------------------------------

@router.get(
    "/",
    response_model=OtherTherapyListResponse,
)
def get_all_other_therapies(
    page: int = Query(1, ge=1),
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return get_other_therapies(
        db=db,
        page=page,
        limit=limit,
    )


# --------------------------------------------------
# SEARCH
# --------------------------------------------------

@router.get(
    "/search/{keyword}",
    response_model=OtherTherapyListResponse,
)
def search_therapies(
    keyword: str,
    page: int = Query(1, ge=1),
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return search_other_therapies(
        db=db,
        keyword=keyword,
        page=page,
        limit=limit,
    )


# --------------------------------------------------
# CATEGORY
# --------------------------------------------------

@router.get(
    "/category/{category}",
    response_model=OtherTherapyListResponse,
)
def get_by_category(
    category: str,
    page: int = Query(1, ge=1),
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return get_other_therapies_by_category(
        db=db,
        category=category,
        page=page,
        limit=limit,
    )


# --------------------------------------------------
# CATEGORIES
# IMPORTANT: MUST COME BEFORE /{therapy_id}
# --------------------------------------------------

@router.get(
    "/categories"
)
def get_categories(
    db: Session = Depends(get_db),
):
    return get_other_therapy_categories(db)


# --------------------------------------------------
# GET BY ID
# MUST BE LAST
# --------------------------------------------------

@router.get(
    "/{therapy_id}",
    response_model=OtherTherapyResponse,
)
def get_other_therapy(
    therapy_id: int,
    db: Session = Depends(get_db),
):
    therapy = get_other_therapy_by_id(
        db=db,
        therapy_id=therapy_id,
    )

    if not therapy:
        raise HTTPException(
            status_code=404,
            detail="Other therapy not found",
        )

    return therapy