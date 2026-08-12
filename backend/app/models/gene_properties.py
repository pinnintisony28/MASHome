from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    ForeignKey,
)
from app.database import Base
from sqlalchemy.orm import relationship

class GeneProperties(Base):
    __tablename__ = "gene_properties"
    gene = relationship(
    "Gene",
    back_populates="properties"
)

    id = Column(Integer, primary_key=True, index=True)

    gene_id = Column(Integer, ForeignKey("genes.id"))

    global_score = Column(Float)

    max_clinical_stage = Column(String(100))

    is_in_membrane = Column(Boolean)

    is_secreted = Column(Boolean)

    has_ligand = Column(Boolean)

    has_small_molecule_binder = Column(Boolean)

    has_pocket = Column(Boolean)

    tissue_specificity = Column(Float)

    tissue_distribution = Column(Float)