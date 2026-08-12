from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base


class BioactiveADME(Base):
    __tablename__ = "bioactive_adme"

    id = Column(Integer, primary_key=True, index=True)

    bioactive_id = Column(
        Integer,
        ForeignKey("bioactives.bioactive_id"),
        nullable=False,
        unique=True
    )

    canonical_smiles = Column(Text)
    molecular_formula = Column(String(100))
    molecular_weight = Column(String(50))

    heavy_atoms = Column(Integer)
    aromatic_heavy_atoms = Column(Integer)
    fraction_csp3 = Column(Float)
    rotatable_bonds = Column(Integer)

    h_bond_acceptors = Column(Integer)
    h_bond_donors = Column(Integer)

    molar_refractivity = Column(Float)
    tpsa = Column(Float)
    ilogp = Column(Float)

    gi_absorption = Column(String(50))
    bbb_permeant = Column(String(50))
    pgp_substrate = Column(String(50))

    cyp1a2_inhibitor = Column(String(50))
    cyp2c19_inhibitor = Column(String(50))
    cyp2c9_inhibitor = Column(String(50))
    cyp2d6_inhibitor = Column(String(50))
    cyp3a4_inhibitor = Column(String(50))

    lipinski = Column(String(20))
    ghose = Column(String(20))
    veber = Column(String(20))
    egan = Column(String(20))
    muegge = Column(String(20))

    bioavailability_score = Column(Float)

    bioactive = relationship(
        "Bioactive",
        back_populates="adme"
    )