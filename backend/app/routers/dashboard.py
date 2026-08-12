from fastapi import APIRouter

from app.database import SessionLocal

from app.schemas.dashboard_schema import DashboardStats

from app.services.dashboard_service import get_dashboard_stats

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/stats", response_model=DashboardStats)
def dashboard_stats():

    db = SessionLocal()

    try:
        return get_dashboard_stats(db)

    finally:
        db.close()