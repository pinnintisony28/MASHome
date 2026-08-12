from sqlalchemy.orm import Session

from app.services.gene_discovery import discover_genes
from app.services.target_discovery import discover_targets
from app.services.drug_discovery import discover_target_drugs
from app.services.biomarker_discovery import discover_biomarkers
from app.services.clinical_trial_discovery import discover_clinical_trials
from app.services.bioactive_discovery import discover_bioactives


def discover_knowledge(db: Session, keyword: str):

    # Step 1 - Discover Genes
    genes, gene_symbols = discover_genes(db, keyword)

    # Step 2 - Discover Targets
    targets, target_ids = discover_targets(db, keyword, gene_symbols)

    # Step 3 - Discover Target Drugs
    target_drugs, drug_names = discover_target_drugs(
        db,
        target_ids
    )

    # Step 4 - Discover Biomarkers
    biomarkers = discover_biomarkers(
        db,
        keyword
    )

    # Step 5 - Discover Clinical Trials
    clinical_trials = discover_clinical_trials(
        db,
        keyword,
        drug_names
    )

    # Step 6 - Discover Bioactives
    bioactives = discover_bioactives(
        db,
        keyword
    )

    return {

        "summary": {

            "query": keyword,

            "genes_found": len(genes),

            "targets_found": len(targets),

            "target_drugs_found": len(target_drugs),

            "biomarkers_found": len(biomarkers),

            "clinical_trials_found": len(clinical_trials),

            "bioactives_found": len(bioactives),
        },

        "genes": genes,

        "targets": targets,

        "target_drugs": target_drugs,

        "biomarkers": biomarkers,

        "clinical_trials": clinical_trials,

        "bioactives": bioactives,
    }