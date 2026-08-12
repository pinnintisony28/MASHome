from pydantic import BaseModel


class BiomarkerResponse(BaseModel):
    id: int
    biomarker_id: str
    biomarker_name: str
    disease_name: str
    icd11: str | None = None
    icd10: str | None = None
    icd9: str | None = None

    class Config:
        from_attributes = True