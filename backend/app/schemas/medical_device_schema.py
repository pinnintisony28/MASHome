from pydantic import BaseModel


class MedicalDeviceResponse(BaseModel):
    id: int

    device_test: str | None = None
    manufacturer: str | None = None
    approval_clearance_year: str | None = None
    regulatory_body: str | None = None
    country_region: str | None = None
    device_type: str | None = None
    primary_use: str | None = None
    nafld_masld: str | None = None
    nash_mash: str | None = None
    fibrosis: str | None = None
    cirrhosis: str | None = None

    class Config:
        from_attributes = True


class MedicalDeviceListResponse(BaseModel):
    items: list[MedicalDeviceResponse]

    total: int
    page: int
    limit: int
    total_pages: int