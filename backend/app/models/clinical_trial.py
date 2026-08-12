from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class ClinicalTrial(Base):
    __tablename__ = "clinical_trials"

    id = Column(Integer, primary_key=True, index=True)

    # Basic Information
    registry = Column(Text)
    trial_id = Column(String(100), unique=True, index=True)
    title = Column(Text)
    scientific_title = Column(Text)
    acronym = Column(Text)

    # Trial Details
    status = Column(Text)
    phase = Column(Text)
    study_type = Column(Text)
    study_design = Column(Text)

    # Disease & Intervention
    conditions = Column(Text)
    interventions = Column(Text)

    # Sponsors
    sponsor = Column(Text)
    secondary_sponsor = Column(Text)

    # Participant Information
    enrollment = Column(Text)
    gender = Column(Text)
    age = Column(Text)

    # Eligibility
    inclusion_criteria = Column(Text)
    exclusion_criteria = Column(Text)

    # Outcomes
    primary_outcome = Column(Text)
    secondary_outcome = Column(Text)

    # Contact
    contact_name = Column(Text)
    contact_email = Column(Text)
    contact_phone = Column(Text)

    # Ethics
    ethics_status = Column(Text)
    ethics_approval_date = Column(Text)

    # Location & Dates
    country = Column(Text)
    start_date = Column(Text)
    completion_date = Column(Text)
    last_update = Column(Text)

    # Results
    results_available = Column(Text)
    results_date_posted = Column(Text)
    results_summary = Column(Text)

    # Source
    source_name = Column(Text)
    url = Column(Text)