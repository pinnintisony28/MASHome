
from fastapi import APIRouter, Query
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas.gene_schema import GeneResponse, GeneDetailsResponse
from app.services.gene_service import (
    get_all_genes,
    get_gene_count,
    get_gene_by_symbol,
    search_genes,
    get_gene_details,
)

router = APIRouter(prefix="/genes", tags=["Genes"])


@router.get("/")
def read_genes(
    page: int = Query(1, ge=1),
    limit: int = Query(25, ge=1, le=100),
):
    db: Session = SessionLocal()

    try:
        total = get_gene_count(db)
        skip = (page - 1) * limit
        genes = get_all_genes(db, skip=skip, limit=limit)

        return {
            "items": genes,
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit,
        }
    finally:
        db.close()


@router.get("/search/{keyword}", response_model=list[GeneResponse])
def search(keyword: str):
    db: Session = SessionLocal()

    try:
        return search_genes(db, keyword)
    finally:
        db.close()


@router.get("/details/{symbol}", response_model=GeneDetailsResponse)
def read_gene_details(symbol: str):
    db: Session = SessionLocal()

    try:
        return get_gene_details(db, symbol)
    finally:
        db.close()


@router.get("/{symbol}", response_model=GeneResponse)
def read_gene(symbol: str):
    db: Session = SessionLocal()

    try:
        return get_gene_by_symbol(db, symbol)
    finally:
        db.close()
