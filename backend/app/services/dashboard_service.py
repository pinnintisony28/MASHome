from sqlalchemy.orm import Session

from app.models.drug import Drug
from app.models.gene import Gene
from app.models.gene_properties import GeneProperties
from app.models.biomarker import Biomarker
from app.models.clinical_trial import ClinicalTrial
from app.models.bioactive import Bioactive
from app.models.target import Target
from app.models.target_drug import TargetDrug


def get_dashboard_stats(db: Session):
    return {
        "drugs": db.query(Drug).count(),
        "genes": db.query(Gene).count(),
        "gene_properties": db.query(GeneProperties).count(),
        "biomarkers": db.query(Biomarker).count(),
        "clinical_trials": db.query(ClinicalTrial).count(),
        "bioactives": db.query(Bioactive).count(),
        "targets": db.query(Target).count(),
        "target_drugs": db.query(TargetDrug).count(),
    }