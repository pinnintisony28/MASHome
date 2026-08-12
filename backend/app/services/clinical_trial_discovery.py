from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.clinical_trial import ClinicalTrial


def discover_clinical_trials(db: Session, keyword: str, drug_names=None):

    if drug_names is None:
        drug_names = []

    filters = [
        ClinicalTrial.public_title.ilike(f"%{keyword}%"),
        ClinicalTrial.scientific_title.ilike(f"%{keyword}%"),
        ClinicalTrial.condition.ilike(f"%{keyword}%"),
        ClinicalTrial.intervention.ilike(f"%{keyword}%")
    ]

    for drug in drug_names:
        filters.append(
            ClinicalTrial.public_title.ilike(f"%{drug}%")
        )
        filters.append(
            ClinicalTrial.scientific_title.ilike(f"%{drug}%")
        )
        filters.append(
            ClinicalTrial.intervention.ilike(f"%{drug}%")
        )

    trials = db.query(ClinicalTrial).filter(
        or_(*filters)
    ).all()

    result = []

    for trial in trials:

        matched_drugs = []

        for drug in drug_names:

            drug_lower = drug.lower()

            public = (trial.public_title or "").lower()
            scientific = (trial.scientific_title or "").lower()
            intervention = (trial.intervention or "").lower()

            if (
                drug_lower in public
                or drug_lower in scientific
                or drug_lower in intervention
            ):
                matched_drugs.append(drug)

        result.append({
            "id": trial.trial_id,
            "name": trial.public_title or trial.trial_id,
            "matched_drugs": matched_drugs
        })

    return result