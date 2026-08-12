from pydantic import BaseModel, ConfigDict
from typing import Optional


class BioactiveToxicityBase(BaseModel):
    category: str
    endpoint: str
    prediction: Optional[str] = None
    probability: Optional[float] = None

    predicted_ld50: Optional[str] = None
    predicted_toxicity_class: Optional[str] = None
    average_similarity: Optional[float] = None
    prediction_accuracy: Optional[float] = None


class BioactiveToxicityResponse(BioactiveToxicityBase):
    id: int
    bioactive_id: int

    model_config = ConfigDict(from_attributes=True)