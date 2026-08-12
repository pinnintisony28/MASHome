from pydantic import BaseModel
from app.schemas.gene_property_schema import GenePropertyResponse


class GeneResponse(BaseModel):
    id: int
    symbol: str
    gene_name: str | None = None
    gene_type: str | None = None

    class Config:
        from_attributes = True


class GeneDetailsResponse(BaseModel):
    id: int
    symbol: str
    gene_name: str | None = None
    gene_type: str | None = None

    properties: list[GenePropertyResponse] = []

    class Config:
        from_attributes = True