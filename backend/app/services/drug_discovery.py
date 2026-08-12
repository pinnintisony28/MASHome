from sqlalchemy.orm import Session

from app.models.target_drug import TargetDrug


def discover_target_drugs(db: Session, target_ids: list):

    if not target_ids:
        return [], []

    drugs = db.query(TargetDrug).filter(
        TargetDrug.target_id.in_(target_ids)
    ).all()

    result = []
    drug_names = []

    for drug in drugs:

        drug_names.append(drug.drug_name)

        result.append({
            "id": drug.drug_code,
            "name": drug.drug_name or drug.drug_code
        })

    return result, drug_names