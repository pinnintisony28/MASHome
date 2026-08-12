from fastapi import APIRouter

from app.database import SessionLocal

from app.schemas.search_schema import GlobalSearchResponse

from app.services.search_service import global_search

router = APIRouter(
    prefix="/search",
    tags=["Global Search"],
)


@router.get("/{keyword}", response_model=GlobalSearchResponse)
def search(keyword: str):

    db = SessionLocal()

    try:
        return global_search(db, keyword)

    finally:
        db.close()