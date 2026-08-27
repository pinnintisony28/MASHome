from typing import Any, Optional

from pydantic import BaseModel, ConfigDict


class PathwayBase(BaseModel):
    pathway_id: str
    pathway_name: str
    category: Optional[str] = None
    super_category: Optional[str] = None
    disease: Optional[str] = None
    disease_stages: Optional[str] = None
    cellular_location: Optional[str] = None
    major_cell_types: Optional[str] = None
    primary_function: Optional[str] = None
    clinical_importance: Optional[str] = None
    druggable: Optional[bool] = None
    pathway_status: Optional[str] = None
    canonical_databases: Optional[str] = None
    source_sheet: str


class PathwayResponse(PathwayBase):
    id: int
    pathway_data: Optional[dict[str, Any]] = None

    model_config = ConfigDict(
        from_attributes=True
    )


class PathwayListItem(PathwayBase):
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )


class PathwayListResponse(BaseModel):
    items: list[PathwayListItem]
    total: int
    page: int
    limit: int
    total_pages: int