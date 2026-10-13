from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.services.terminated_trial_service import (
    get_terminated_trials,
    search_terminated_trials,
    get_terminated_trial_by_id,
    get_withdrawn_trial_by_id,
)
from app.database import get_db
from app.schemas.terminated_trial_schema import (
    TerminatedTrialResponse,
    TerminatedTrialListResponse,
)
from app.services.terminated_trial_service import (
    get_terminated_trials,
    search_terminated_trials,
)

router = APIRouter(
    prefix="/terminated-trials",
    tags=["Terminated Trials"],
)


@router.get("/", response_model=TerminatedTrialListResponse)
def get_all_terminated_trials(
    page: int = Query(1, ge=1),
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return get_terminated_trials(db, page, limit)


@router.get("/search/{keyword}", response_model=list[TerminatedTrialResponse])
def search_trials(
    keyword: str,
    db: Session = Depends(get_db),
):
    return search_terminated_trials(db, keyword)


@router.get("/{trial_id}", response_model=TerminatedTrialResponse)
def get_terminated_trial_details(
    trial_id: str,
    db: Session = Depends(get_db),
):
    trial = get_terminated_trial_by_id(db, trial_id)

    if not trial:
        raise HTTPException(
            status_code=404,
            detail="Terminated clinical trial not found",
        )

    return trial


@router.get("/withdrawn/{trial_id}", response_model=TerminatedTrialResponse)
def get_withdrawn_trial_details(
    trial_id: str,
    db: Session = Depends(get_db),
):
    trial = get_withdrawn_trial_by_id(db, trial_id)

    if not trial:
        raise HTTPException(
            status_code=404,
            detail="Withdrawn clinical trial not found",
        )

    return trial