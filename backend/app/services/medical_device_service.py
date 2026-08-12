from math import ceil

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.medical_device import MedicalDevice


def get_medical_devices(
    db: Session,
    page: int = 1,
    limit: int = 25,
):
    query = db.query(MedicalDevice)

    total = query.count()

    devices = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "items": devices,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": ceil(total / limit) if total else 1,
    }


def search_medical_devices(
    db: Session,
    keyword: str,
):
    keyword = f"%{keyword}%"

    return (
        db.query(MedicalDevice)
        .filter(
            or_(
                MedicalDevice.device_test.ilike(keyword),
                MedicalDevice.manufacturer.ilike(keyword),
                MedicalDevice.approval_clearance_year.ilike(keyword),
                MedicalDevice.regulatory_body.ilike(keyword),
                MedicalDevice.country_region.ilike(keyword),
                MedicalDevice.device_type.ilike(keyword),
                MedicalDevice.primary_use.ilike(keyword),
                MedicalDevice.nafld_masld.ilike(keyword),
                MedicalDevice.nash_mash.ilike(keyword),
                MedicalDevice.fibrosis.ilike(keyword),
                MedicalDevice.cirrhosis.ilike(keyword),
            )
        )
        .all()
    )


def get_medical_device_by_id(
    db: Session,
    device_id: int,
):
    return (
        db.query(MedicalDevice)
        .filter(MedicalDevice.id == device_id)
        .first()
    )