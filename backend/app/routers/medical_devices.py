from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.medical_device_schema import (
    MedicalDeviceResponse,
    MedicalDeviceListResponse,
)

from app.services.medical_device_service import (
    get_medical_devices,
    search_medical_devices,
    get_medical_device_by_id,
)


router = APIRouter(
    prefix="/medical-devices",
    tags=["Medical Devices"],
)


@router.get(
    "/",
    response_model=MedicalDeviceListResponse,
)
def get_all_medical_devices(
    page: int = Query(1, ge=1),
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return get_medical_devices(
        db,
        page,
        limit,
    )


@router.get(
    "/search/{keyword}",
    response_model=list[MedicalDeviceResponse],
)
def search_devices(
    keyword: str,
    db: Session = Depends(get_db),
):
    return search_medical_devices(
        db,
        keyword,
    )


@router.get(
    "/{device_id}",
    response_model=MedicalDeviceResponse,
)
def get_medical_device(
    device_id: int,
    db: Session = Depends(get_db),
):
    device = get_medical_device_by_id(
        db,
        device_id,
    )

    if not device:
        from fastapi import HTTPException

        raise HTTPException(
            status_code=404,
            detail="Medical device not found",
        )

    return device