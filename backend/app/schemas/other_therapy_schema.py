from typing import Optional

from pydantic import BaseModel, ConfigDict


class OtherTherapyBase(BaseModel):
    source_sheet: str
    category: str

    item_name: Optional[str] = None
    secondary_name: Optional[str] = None

    description: Optional[str] = None
    mechanism: Optional[str] = None
    effect: Optional[str] = None
    outcome: Optional[str] = None

    pathway_data: Optional[str] = None


class OtherTherapyResponse(OtherTherapyBase):
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )


class OtherTherapyListResponse(BaseModel):
    items: list[OtherTherapyResponse]
    total: int
    page: int
    limit: int
    total_pages: int