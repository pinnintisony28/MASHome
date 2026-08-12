from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.graph_schema import GraphResponse

from app.services.graph_service import build_graph

router = APIRouter(
    prefix="/graph",
    tags=["Knowledge Graph"]
)


@router.get(
    "/{keyword}",
    response_model=GraphResponse
)
def graph(keyword: str, db: Session = Depends(get_db)):
    return build_graph(db, keyword)