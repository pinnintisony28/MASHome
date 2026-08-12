from pydantic import BaseModel


class GenePropertyResponse(BaseModel):
    global_score: float | None = None
    max_clinical_stage: str | None = None

    is_in_membrane: bool | None = None
    is_secreted: bool | None = None
    has_ligand: bool | None = None
    has_small_molecule_binder: bool | None = None
    has_pocket: bool | None = None

    tissue_specificity: float | None = None
    tissue_distribution: float | None = None

    class Config:
        from_attributes = True