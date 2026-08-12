from pydantic import BaseModel


class DashboardStats(BaseModel):
    drugs: int
    genes: int
    gene_properties: int
    biomarkers: int
    clinical_trials: int
    bioactives: int
    targets: int
    target_drugs: int