
from fastapi import APIRouter, HTTPException, Query

from app.services.publication_service import search_publications

router = APIRouter(
    prefix="/publications",
    tags=["Publications"],
)


@router.get("/search")
async def get_publications(
    query: str = Query(default="MASLD", min_length=1, max_length=200),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=25),
):
    try:
        return await search_publications(
            query=query,
            page=page,
            page_size=page_size,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from exc
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail="Unable to retrieve publications from Europe PMC.",
        ) from exc
