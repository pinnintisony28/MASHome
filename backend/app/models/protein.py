from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Protein(Base):
    __tablename__ = "proteins"

    id = Column(Integer, primary_key=True, index=True)

    protein_name = Column(String(255), nullable=False)

    gene_symbol = Column(String(100))

    description = Column(Text)
    