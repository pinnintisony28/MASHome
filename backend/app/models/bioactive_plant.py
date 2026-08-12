from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class BioactivePlant(Base):
    __tablename__ = "bioactive_plants"

    id = Column(Integer, primary_key=True, index=True)

    bioactive_id = Column(
        Integer,
        ForeignKey("bioactives.bioactive_id", ondelete="CASCADE"),
        nullable=False,
    )

    plant_name = Column(Text, nullable=False)

    plant_url = Column(Text)

    bioactive = relationship(
        "Bioactive",
        back_populates="plants"
    )