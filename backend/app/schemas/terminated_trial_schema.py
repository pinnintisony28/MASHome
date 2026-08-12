from pydantic import BaseModel, ConfigDict


class TerminatedTrialBase(BaseModel):
    nct_number: str | None = None
    study_title: str | None = None
    study_url: str | None = None

    study_status: str | None = None
    reason: str | None = None

    conditions: str | None = None
    interventions: str | None = None

    sponsor: str | None = None
    collaborators: str | None = None

    phase: str | None = None
    enrollment: str | None = None

    study_type: str | None = None

    other_ids: str | None = None


class TerminatedTrialResponse(TerminatedTrialBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class TerminatedTrialListResponse(BaseModel):
    items: list[TerminatedTrialResponse]
    total: int
    page: int
    limit: int
    total_pages: int