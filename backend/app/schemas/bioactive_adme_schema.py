from pydantic import BaseModel
from typing import Optional


class BioactiveADMEResponse(BaseModel):
    id: int
    bioactive_id: int

    canonical_smiles: Optional[str] = None
    molecular_formula: Optional[str] = None
    molecular_weight: Optional[str] = None

    heavy_atoms: Optional[int] = None
    aromatic_heavy_atoms: Optional[int] = None
    fraction_csp3: Optional[float] = None
    rotatable_bonds: Optional[int] = None

    h_bond_acceptors: Optional[int] = None
    h_bond_donors: Optional[int] = None

    molar_refractivity: Optional[float] = None
    tpsa: Optional[float] = None
    ilogp: Optional[float] = None

    gi_absorption: Optional[str] = None
    bbb_permeant: Optional[str] = None
    pgp_substrate: Optional[str] = None

    cyp1a2_inhibitor: Optional[str] = None
    cyp2c19_inhibitor: Optional[str] = None
    cyp2c9_inhibitor: Optional[str] = None
    cyp2d6_inhibitor: Optional[str] = None
    cyp3a4_inhibitor: Optional[str] = None

    lipinski: Optional[str] = None
    ghose: Optional[str] = None
    veber: Optional[str] = None
    egan: Optional[str] = None
    muegge: Optional[str] = None

    bioavailability_score: Optional[float] = None

    model_config = {
        "from_attributes": True
    }