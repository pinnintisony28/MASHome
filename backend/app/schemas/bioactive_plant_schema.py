from pydantic import BaseModel
from typing import Optional


class BioactivePlantResponse(BaseModel):
    id: int
    plant_name: str
    plant_url: Optional[str] = None

    class Config:
        from_attributes = True