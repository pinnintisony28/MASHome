from pydantic import BaseModel


class KnowledgeItem(BaseModel):
    id: str
    name: str


class KnowledgeSummary(BaseModel):
    query: str
    genes_found: int
    targets_found: int
    target_drugs_found: int
    biomarkers_found: int
    clinical_trials_found: int
    bioactives_found: int


class KnowledgeResponse(BaseModel):
    summary: KnowledgeSummary

    genes: list[KnowledgeItem]

    targets: list[KnowledgeItem]

    target_drugs: list[KnowledgeItem]

    biomarkers: list[KnowledgeItem]

    clinical_trials: list[KnowledgeItem]

    bioactives: list[KnowledgeItem]