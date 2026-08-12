from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Drug(Base):
    __tablename__ = "drugs"

    id = Column(Integer, primary_key=True, index=True)

    molecule_name = Column(String(255), nullable=False)

    brand = Column(String(255))

    route = Column(String(100))

    dosage_form = Column(String(100))

    therapeutic_category = Column(String(255))

    description = Column(Text)