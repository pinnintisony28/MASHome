from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

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