from pydantic import BaseModel


class AssociatedDiseaseResponse(BaseModel):
    id: int

    associated_disease: str | None = None
    relationship_with_nafld_mash: str | None = None
    underlying_reason: str | None = None

    class Config:
        from_attributes = True


class AssociatedDiseaseListResponse(BaseModel):
    items: list[AssociatedDiseaseResponse]

    total: int
    page: int
    limit: int
    total_pages: int