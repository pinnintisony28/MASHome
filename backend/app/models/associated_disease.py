from sqlalchemy import Column, Integer, Text, String

from app.database import Base


class AssociatedDisease(Base):
    __tablename__ = "associated_diseases"

    id = Column(Integer, primary_key=True, index=True)

    associated_disease = Column(
        String(255),
        nullable=False,
    )

    relationship_with_nafld_mash = Column(
        String(100),
    )

    underlying_reason = Column(
        Text,
    )