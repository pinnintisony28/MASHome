from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class ClinicalTrialBase(BaseModel):
    registry: Optional[str] = None
    trial_id: Optional[str] = None
    title: Optional[str] = None
    scientific_title: Optional[str] = None
    acronym: Optional[str] = None

    status: Optional[str] = None
    phase: Optional[str] = None
    study_type: Optional[str] = None
    study_design: Optional[str] = None

    conditions: Optional[str] = None
    interventions: Optional[str] = None

    sponsor: Optional[str] = None
    secondary_sponsor: Optional[str] = None

    enrollment: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[str] = None

    inclusion_criteria: Optional[str] = None
    exclusion_criteria: Optional[str] = None

    primary_outcome: Optional[str] = None
    secondary_outcome: Optional[str] = None

    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None

    ethics_status: Optional[str] = None
    ethics_approval_date: Optional[str] = None

    country: Optional[str] = None

    start_date: Optional[str] = None
    completion_date: Optional[str] = None
    last_update: Optional[str] = None

    results_available: Optional[str] = None
    results_date_posted: Optional[str] = None
    results_summary: Optional[str] = None

    source_name: Optional[str] = None
    url: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class ClinicalTrialResponse(ClinicalTrialBase):
    id: int


class ClinicalTrialListResponse(BaseModel):
    items: List[ClinicalTrialResponse]
    total: int
    page: int
    limit: int
    total_pages: int