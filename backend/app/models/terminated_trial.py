from sqlalchemy import Column, Integer, String, Text

from app.database import Base


class TerminatedTrial(Base):
    __tablename__ = "terminated_trials"

    id = Column(Integer, primary_key=True, index=True)

    nct_number = Column(String(100), index=True)
    study_title = Column(Text)
    study_url = Column(Text)

    study_status = Column(String(100))
    reason = Column(Text)

    conditions = Column(Text)
    interventions = Column(Text)

    sponsor = Column(Text)
    collaborators = Column(Text)

    phase = Column(String(100))
    enrollment = Column(String(100))

    study_type = Column(String(100))

    other_ids = Column(Text)