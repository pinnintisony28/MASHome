from sqlalchemy.orm import Session

from app.models.drug import Drug
from app.models.gene import Gene
from app.models.biomarker import Biomarker
from app.models.clinical_trial import ClinicalTrial
from app.models.bioactive import Bioactive
from app.models.target import Target


def global_search(db: Session, keyword: str):

    result = {
        "drugs": [],
        "genes": [],
        "biomarkers": [],
        "clinical_trials": [],
        "bioactives": [],
        "targets": [],
    }

    # ---------------- Drugs ----------------

    drugs = db.query(Drug).filter(
        Drug.molecule_name.ilike(f"%{keyword}%")
    ).all()

    for drug in drugs:
        result["drugs"].append({
            "id": str(drug.id),
            "name": drug.molecule_name,
            "type": "Drug"
        })

    # ---------------- Genes ----------------

    genes = db.query(Gene).filter(
        Gene.gene_name.ilike(f"%{keyword}%")
    ).all()

    for gene in genes:
        result["genes"].append({
            "id": gene.symbol,
            "name": gene.gene_name,
            "type": "Gene"
        })

    # ---------------- Biomarkers ----------------

    biomarkers = db.query(Biomarker).filter(
        Biomarker.biomarker_name.ilike(f"%{keyword}%")
    ).all()

    for biomarker in biomarkers:
        result["biomarkers"].append({
            "id": biomarker.biomarker_id,
            "name": biomarker.biomarker_name,
            "type": "Biomarker"
        })

    # ---------------- Clinical Trials ----------------

    trials = db.query(ClinicalTrial).filter(
        ClinicalTrial.public_title.ilike(f"%{keyword}%")
    ).all()

    for trial in trials:
        result["clinical_trials"].append({
            "id": trial.trial_id,
            "name": trial.public_title,
            "type": "Clinical Trial"
        })

    # ---------------- Bioactives ----------------

    bioactives = db.query(Bioactive).filter(
        Bioactive.chemical_constituent.ilike(f"%{keyword}%")
    ).all()

    for bioactive in bioactives:
        result["bioactives"].append({
            "id": str(bioactive.id),
            "name": bioactive.chemical_constituent,
            "type": "Bioactive"
        })

    # ---------------- Targets ----------------

    targets = db.query(Target).filter(
        Target.target_name.ilike(f"%{keyword}%")
    ).all()

    for target in targets:
        result["targets"].append({
            "id": target.target_id,
            "name": target.target_name,
            "type": "Target"
        })

    return result