from typing import Optional

from pydantic import BaseModel, ConfigDict
from typing import List
from app.schemas.bioactive_plant_schema import BioactivePlantResponse
class BioactiveADMESchema(BaseModel):
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

    model_config = ConfigDict(from_attributes=True)


class BioactiveToxicitySchema(BaseModel):
    category: Optional[str] = None
    endpoint: Optional[str] = None
    prediction: Optional[str] = None
    probability: Optional[float] = None
    predicted_ld50: Optional[str] = None
    predicted_toxicity_class: Optional[str] = None
    average_similarity: Optional[float] = None
    prediction_accuracy: Optional[float] = None

    model_config = ConfigDict(from_attributes=True)


class BioactiveSchema(BaseModel):
    bioactive_id: int
    bioactive_name: str

    molecular_formula: Optional[str] = None
    molecular_weight: Optional[str] = None
    iupac_name: Optional[str] = None
    smiles: Optional[str] = None
    plants: List[BioactivePlantResponse] = []
    family: Optional[str] = None
    useful_part: Optional[str] = None
    # chemical_constituents_containing_plants: Optional[str] = None

    adme: Optional[BioactiveADMESchema] = None
    toxicity: list[BioactiveToxicitySchema] = []

    model_config = ConfigDict(from_attributes=True)

