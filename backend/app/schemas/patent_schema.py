from pydantic import BaseModel, ConfigDict


class PatentResponse(BaseModel):
    id: int

    application_id: str | None = None
    application_url: str | None = None

    application_number: str | None = None
    application_date: str | None = None

    country: str | None = None

    title: str | None = None

    ipc: str | None = None

    model_config = ConfigDict(from_attributes=True)


class PatentListResponse(BaseModel):
    items: list[PatentResponse]

    total: int
    page: int
    limit: int
    total_pages: int