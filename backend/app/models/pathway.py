from sqlalchemy import Column, Integer, String, Text, Boolean, JSON
from app.database import Base


class Pathway(Base):
    __tablename__ = "pathways"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    pathway_id = Column(String(50), unique=True, nullable=False, index=True)
    pathway_name = Column(String(255), nullable=False, index=True)

    category = Column(String(255), nullable=True, index=True)
    super_category = Column(String(255), nullable=True, index=True)
    disease = Column(String(255), nullable=True, index=True)

    disease_stages = Column(Text, nullable=True)
    cellular_location = Column(Text, nullable=True)
    major_cell_types = Column(Text, nullable=True)
    primary_function = Column(Text, nullable=True)

    clinical_importance = Column(String(100), nullable=True)
    druggable = Column(Boolean, nullable=True)
    pathway_status = Column(String(100), nullable=True)

    canonical_databases = Column(Text, nullable=True)

    source_sheet = Column(String(255), nullable=False, index=True)

    pathway_data = Column(JSON, nullable=True)