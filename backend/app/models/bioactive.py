from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.database import Base


class Bioactive(Base):
    __tablename__ = "bioactives"

    bioactive_id = Column(Integer, primary_key=True, index=True)

    bioactive_name = Column(String(255), nullable=False, unique=True)

    molecular_formula = Column(String(100))

    molecular_weight = Column(String(50))

    iupac_name = Column(Text)

    smiles = Column(Text)

    plants = relationship(
    "BioactivePlant",
    back_populates="bioactive",
    cascade="all, delete-orphan"
)

    family = Column(String(255))

    useful_part = Column(String(255))
    

    # Relationships
    adme = relationship(
        "BioactiveADME",
        back_populates="bioactive",
        uselist=False,
        cascade="all, delete-orphan"
    )

    toxicity = relationship(
        "BioactiveToxicity",
        back_populates="bioactive",
        cascade="all, delete-orphan"
    )
    # Register related models
from app.models.bioactive_adme import BioactiveADME
from app.models.bioactive_toxicity import BioactiveToxicity
from app.models.bioactive_plant import BioactivePlant