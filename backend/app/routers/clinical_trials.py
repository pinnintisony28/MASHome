from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.clinical_trial_schema import (
    ClinicalTrialResponse,
    ClinicalTrialListResponse,
)

from app.services.clinical_trial_service import (
    get_clinical_trials,
    get_clinical_trial_by_id,
    search_clinical_trials,
    get_trials_by_status,
)

router = APIRouter(
    prefix="/clinical-trials",
    tags=["Clinical Trials"],
)


@router.get("/", response_model=ClinicalTrialListResponse)
def get_all_clinical_trials(
    page: int = Query(1, ge=1),
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return get_clinical_trials(db, page, limit)


@router.get("/search/{keyword}", response_model=list[ClinicalTrialResponse])
def search_trials(
    keyword: str,
    db: Session = Depends(get_db),
):
    return search_clinical_trials(db, keyword)
@router.get("/status/{status}", response_model=list[ClinicalTrialResponse])
def clinical_trials_by_status(
    status: str,
    db: Session = Depends(get_db),
):
    return get_trials_by_status(db, status)

@router.get("/{trial_id}", response_model=ClinicalTrialResponse)
def get_trial(
    trial_id: str,
    db: Session = Depends(get_db),
):
    trial = get_clinical_trial_by_id(db, trial_id)

    if not trial:
        raise HTTPException(
            status_code=404,
            detail="Clinical Trial not found",
        )

    return trial