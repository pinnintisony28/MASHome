from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base


class TargetDrug(Base):
    __tablename__ = "target_drugs"

    id = Column(Integer, primary_key=True, index=True)

    target_id = Column(
        String(50),
        ForeignKey("targets.target_id")
    )

    drug_code = Column(String(50))

    drug_name = Column(String(300))

    clinical_status = Column(String(100))