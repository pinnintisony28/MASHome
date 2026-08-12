from sqlalchemy import Column, Integer, String
from app.database import Base


class Biomarker(Base):
    __tablename__ = "biomarkers"

    id = Column(Integer, primary_key=True, index=True)

    biomarker_id = Column(String(50), unique=True, index=True)
    biomarker_name = Column(String(500))

    disease_name = Column(String(500))

    icd11 = Column(String(100))
    icd10 = Column(String(100))
    icd9 = Column(String(100))