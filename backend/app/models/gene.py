from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Gene(Base):
    __tablename__ = "genes"

    id = Column(Integer, primary_key=True, index=True)

    # Source / official identifiers
    original_symbol = Column(String(100), nullable=True, index=True)
    symbol = Column(String(100), nullable=False, index=True)

    # Gene annotation
    gene_name = Column(String(500), nullable=True)
    previous_symbol = Column(Text, nullable=True)
    synonyms_aliases = Column(Text, nullable=True)
    gene_type = Column(String(150), nullable=True)

    # Genomic information
    genomic_location = Column(String(255), nullable=True)
    chromosome = Column(String(50), nullable=True)
    start = Column(Integer, nullable=True)
    end = Column(Integer, nullable=True)
    strand = Column(Integer, nullable=True)
    assembly = Column(String(50), nullable=True)

    # Database identifiers
    ncbi_gene_id = Column(String(50), nullable=True, index=True)
    ensembl_gene_id = Column(String(100), nullable=True, index=True)
    hgnc_id = Column(String(50), nullable=True, index=True)
    uniprot_id = Column(Text, nullable=True)
    refseq = Column(Text, nullable=True)
    mane_select = Column(Text, nullable=True)
    canonical_transcript = Column(String(100), nullable=True)

    # Data provenance
    status = Column(String(100), nullable=True)

    # Existing relationship
    properties = relationship(
        "GeneProperties",
        back_populates="gene"
    )