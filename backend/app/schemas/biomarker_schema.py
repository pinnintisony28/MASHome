from pydantic import BaseModel


class BiomarkerResponse(BaseModel):
    id: int

    biomarker_id: str
    biomarker_name: str

    category: str
    subgroup: str | None = None

    normal_range: str | None = None
    clinical_significance: str | None = None
    description: str | None = None

    source_sheet: str

    class Config:
        from_attributes = True