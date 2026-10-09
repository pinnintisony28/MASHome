from pydantic import BaseModel
from app.schemas.gene_property_schema import GenePropertyResponse


class GeneResponse(BaseModel):
    id: int
    original_symbol: str | None = None
    symbol: str
    gene_name: str | None = None
    previous_symbol: str | None = None
    synonyms_aliases: str | None = None
    gene_type: str | None = None

    genomic_location: str | None = None
    chromosome: str | None = None
    start: int | None = None
    end: int | None = None
    strand: int | None = None
    assembly: str | None = None

    ncbi_gene_id: str | None = None
    ensembl_gene_id: str | None = None
    hgnc_id: str | None = None
    uniprot_id: str | None = None
    refseq: str | None = None
    mane_select: str | None = None
    canonical_transcript: str | None = None

    status: str | None = None

    class Config:
        from_attributes = True

class GeneDetailsResponse(BaseModel):
    id: int
    original_symbol: str | None = None
    symbol: str
    gene_name: str | None = None
    previous_symbol: str | None = None
    synonyms_aliases: str | None = None
    gene_type: str | None = None

    genomic_location: str | None = None
    chromosome: str | None = None
    start: int | None = None
    end: int | None = None
    strand: int | None = None
    assembly: str | None = None

    ncbi_gene_id: str | None = None
    ensembl_gene_id: str | None = None
    hgnc_id: str | None = None
    uniprot_id: str | None = None
    refseq: str | None = None
    mane_select: str | None = None
    canonical_transcript: str | None = None

    status: str | None = None

    properties: list[GenePropertyResponse] = []

    class Config:
        from_attributes = True