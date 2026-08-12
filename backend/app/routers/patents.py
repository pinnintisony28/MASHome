from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.patent_schema import (
    PatentResponse,
    PatentListResponse,
)
from app.services.patent_service import (
    get_patents,
    search_patents,
)
from app.services.patent_service import (
    get_patents,
    get_patent_by_id,
    search_patents,
)


router = APIRouter(
    prefix="/patents",
    tags=["Patents"],
)


@router.get("/", response_model=PatentListResponse)
def get_all_patents(
    page: int = Query(1, ge=1),
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return get_patents(db, page, limit)


@router.get(
    "/search/{keyword}",
    response_model=list[PatentResponse],
)
def search_patent_records(
    keyword: str,
    db: Session = Depends(get_db),
):
    return search_patents(db, keyword)

@router.get(
    "/{patent_id}",
    response_model=PatentResponse,
)
def get_patent(
    patent_id: int,
    db: Session = Depends(get_db),
):
    patent = get_patent_by_id(db, patent_id)

    if not patent:
        from fastapi import HTTPException

        raise HTTPException(
            status_code=404,
            detail="Patent not found",
        )

    return patent