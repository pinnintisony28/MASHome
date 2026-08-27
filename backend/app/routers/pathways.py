from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.pathway_schema import (
    PathwayListResponse,
    PathwayResponse,
    PathwayListItem,
)
from app.services.pathway_service import PathwayService


router = APIRouter(
    prefix="/pathways",
    tags=["Pathways"]
)


# ============================================================
# GET ALL PATHWAYS
# ============================================================

@router.get(
    "/",
    response_model=PathwayListResponse
)
def get_pathways(
    page: int = Query(
        1,
        ge=1
    ),
    limit: int = Query(
        25,
        ge=1,
        le=100
    ),
    db: Session = Depends(get_db)
):
    return PathwayService.get_all(
        db,
        page,
        limit
    )


# ============================================================
# GET PATHWAY CATEGORIES
# ============================================================

@router.get(
    "/categories",
    response_model=list[str]
)
def get_categories(
    db: Session = Depends(get_db)
):
    return PathwayService.get_categories(
        db
    )


# ============================================================
# GET SUPER CATEGORIES
# ============================================================

@router.get(
    "/super-categories",
    response_model=list[str]
)
def get_super_categories(
    db: Session = Depends(get_db)
):
    return PathwayService.get_super_categories(
        db
    )


# ============================================================
# GET PATHWAYS BY CATEGORY
# ============================================================

@router.get(
    "/category/{category}",
    response_model=list[PathwayListItem]
)
def get_pathways_by_category(
    category: str,
    db: Session = Depends(get_db)
):
    return PathwayService.get_by_category(
        db,
        category
    )


# ============================================================
# SEARCH PATHWAYS
# ============================================================

@router.get(
    "/search/{keyword}",
    response_model=list[PathwayListItem]
)
def search_pathways(
    keyword: str,
    db: Session = Depends(get_db)
):
    return PathwayService.search(
        db,
        keyword
    )


# ============================================================
# GET PATHWAY BY PATHWAY ID
# ============================================================

@router.get(
    "/code/{pathway_id}",
    response_model=PathwayResponse
)
def get_pathway_by_code(
    pathway_id: str,
    db: Session = Depends(get_db)
):
    pathway = (
        PathwayService.get_by_pathway_id(
            db,
            pathway_id
        )
    )

    if not pathway:
        raise HTTPException(
            status_code=404,
            detail="Pathway not found"
        )

    return pathway


# ============================================================
# GET PATHWAY BY DATABASE ID
# ============================================================

@router.get(
    "/{pathway_id}",
    response_model=PathwayResponse
)
def get_pathway(
    pathway_id: int,
    db: Session = Depends(get_db)
):
    pathway = (
        PathwayService.get_by_id(
            db,
            pathway_id
        )
    )

    if not pathway:
        raise HTTPException(
            status_code=404,
            detail="Pathway not found"
        )

    return pathway