from pydantic import BaseModel


class TargetDrugResponse(BaseModel):
    id: int

    target_id: str

    drug_code: str | None = None

    drug_name: str | None = None

    clinical_status: str | None = None

    class Config:
        from_attributes = True