from sqlalchemy.orm import Session

from app.services.gene_discovery import discover_genes
from app.services.target_discovery import discover_targets
from app.services.drug_discovery import discover_target_drugs
from app.services.biomarker_discovery import discover_biomarkers
from app.services.clinical_trial_discovery import discover_clinical_trials
from app.services.bioactive_discovery import discover_bioactives


def build_graph(db: Session, keyword: str):

    nodes = []
    edges = []

    # ----------------------------
    # Discover Genes
    # ----------------------------
    genes, gene_symbols = discover_genes(db, keyword)

    for gene in genes:
        nodes.append({
            "id": gene["id"],
            "label": gene["name"],
            "type": "Gene"
        })

    # ----------------------------
    # Discover Targets
    # ----------------------------
    targets, target_ids = discover_targets(
        db,
        keyword,
        gene_symbols
    )

    for target in targets:

        nodes.append({
            "id": target["id"],
            "label": target["name"],
            "type": "Target"
        })

        # Gene -> Target
        for gene in genes:
            edges.append({
                "source": gene["id"],
                "target": target["id"],
                "relation": "gene_target"
            })

    # ----------------------------
    # Discover Target Drugs
    # ----------------------------
    target_drugs, drug_names = discover_target_drugs(
        db,
        target_ids
    )

    for drug in target_drugs:

        nodes.append({
            "id": drug["id"],
            "label": drug["name"],
            "type": "Drug"
        })

        # Target -> Drug
        for target in targets:
            edges.append({
                "source": target["id"],
                "target": drug["id"],
                "relation": "target_drug"
            })

    # ----------------------------
    # Discover Clinical Trials
    # ----------------------------
    clinical_trials = discover_clinical_trials(
        db,
        keyword,
        drug_names
    )

    for trial in clinical_trials:

        nodes.append({
            "id": trial["id"],
            "label": trial["name"],
            "type": "Clinical Trial"
        })

        # Drug -> Clinical Trial
        for drug in target_drugs:

            if drug["name"] in trial["matched_drugs"]:

                edges.append({
                    "source": drug["id"],
                    "target": trial["id"],
                    "relation": "drug_trial"
                })

    # ----------------------------
    # Discover Biomarkers
    # ----------------------------
    biomarkers = discover_biomarkers(
        db,
        keyword
    )

    for biomarker in biomarkers:

        nodes.append({
            "id": biomarker["id"],
            "label": biomarker["name"],
            "type": "Biomarker"
        })

        # Gene -> Biomarker
        for gene in genes:
            edges.append({
                "source": gene["id"],
                "target": biomarker["id"],
                "relation": "gene_biomarker"
            })

    # ----------------------------
    # Discover Bioactives
    # ----------------------------
    bioactives = discover_bioactives(
        db,
        keyword
    )

    for bioactive in bioactives:

        nodes.append({
            "id": bioactive["id"],
            "label": bioactive["name"],
            "type": "Bioactive"
        })

        # Biomarker -> Bioactive
        for biomarker in biomarkers:
            edges.append({
                "source": biomarker["id"],
                "target": bioactive["id"],
                "relation": "biomarker_bioactive"
            })

    return {
        "nodes": nodes,
        "edges": edges
    }