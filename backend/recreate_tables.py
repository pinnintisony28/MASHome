from app.database import engine
from app.models.clinical_trial import ClinicalTrial

ClinicalTrial.__table__.create(bind=engine)
print("Clinical trials table created successfully.")