from pydantic import BaseModel


class SearchResult(BaseModel):
    id: str
    name: str
    type: str


class GlobalSearchResponse(BaseModel):
    drugs: list[SearchResult]
    genes: list[SearchResult]
    biomarkers: list[SearchResult]
    clinical_trials: list[SearchResult]
    bioactives: list[SearchResult]
    targets: list[SearchResult]