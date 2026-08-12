from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas.gene_schema import GeneResponse
from app.services.gene_service import (
    get_all_genes,
    get_gene_by_symbol,
    search_genes,
    get_gene_details,
)
from app.schemas.gene_schema import GeneResponse, GeneDetailsResponse
router = APIRouter(prefix="/genes", tags=["Genes"])


@router.get("/", response_model=list[GeneResponse])
def read_genes():
    db: Session = SessionLocal()
    try:
        return get_all_genes(db)
    finally:
        db.close()


@router.get("/search/{keyword}", response_model=list[GeneResponse])
def search(keyword: str):
    db: Session = SessionLocal()
    try:
        return search_genes(db, keyword)
    finally:
        db.close()


@router.get("/{symbol}", response_model=GeneResponse)
def read_gene(symbol: str):
    db: Session = SessionLocal()
    try:
        return get_gene_by_symbol(db, symbol)
    finally:
        db.close()


@router.get("/details/{symbol}", response_model=GeneDetailsResponse)
def read_gene_details(symbol: str):
    db: Session = SessionLocal()

    try:
        return get_gene_details(db, symbol)
    finally:
        db.close()