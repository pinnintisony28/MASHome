from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, index=True)
    disease_name = Column(String(200), nullable=False, unique=True)
    abbreviation = Column(String(50))
    description = Column(Text)