from fastapi import APIRouter

from app.database import SessionLocal

from app.schemas.knowledge_schema import KnowledgeResponse
from app.services.knowledge_service import discover_knowledge

router = APIRouter(
    prefix="/knowledge",
    tags=["Knowledge Discovery"],
)


@router.get("/{keyword}", response_model=KnowledgeResponse)
def knowledge(keyword: str):

    db = SessionLocal()

    try:
        return discover_knowledge(db, keyword)

    finally:
        db.close()