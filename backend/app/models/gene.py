from sqlalchemy import Column, Integer, String
from app.database import Base

from sqlalchemy.orm import relationship
class Gene(Base):
    __tablename__ = "genes"
    properties = relationship(
    "GeneProperties",
    back_populates="gene"
)
    id = Column(Integer, primary_key=True, index=True)

    symbol = Column(String(50), unique=True, nullable=False)

    gene_name = Column(String(255))

    gene_type = Column(String(100))