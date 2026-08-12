from pydantic import BaseModel


class DrugResponse(BaseModel):
    id: int
    molecule_name: str
    brand: str | None = None
    route: str | None = None
    dosage_form: str | None = None
    therapeutic_category: str | None = None
    description: str | None = None

    class Config:
        from_attributes = True