import ast
import pandas as pd
from pathlib import Path

from app.database import SessionLocal
from app.models.gene import Gene
from app.models.gene_properties import GeneProperties


# --------------------------------------------------
# Paths
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]
CSV_PATH = BASE_DIR / "genes_resolved.csv"


# --------------------------------------------------
# Helpers
# --------------------------------------------------

def clean_value(value):
    """Convert NaN/empty values to None and lists to strings."""
    if pd.isna(value):
        return None

    if isinstance(value, list):
        return ", ".join(str(x) for x in value)

    value = str(value).strip()

    if not value or value.lower() == "nan":
        return None

    return value


# --------------------------------------------------
# Load CSV
# --------------------------------------------------

print(f"Loading: {CSV_PATH}")

df = pd.read_csv(CSV_PATH)

print(f"CSV rows: {len(df)}")


# --------------------------------------------------
# Database
# --------------------------------------------------

db = SessionLocal()

updated = 0
inserted = 0
skipped = 0


try:

    for _, row in df.iterrows():

        symbol = clean_value(row.get("gene_symbol"))

        # Ensembl-only records may not have an official symbol.
        # We will handle those separately later.
        if not symbol:
            skipped += 1
            continue

        # Find existing official gene
        gene = (
            db.query(Gene)
            .filter(Gene.symbol == symbol)
            .first()
        )

        # --------------------------------------------------
        # Existing gene → enrich it
        # --------------------------------------------------

        if gene:

            gene.original_symbol = clean_value(
                row.get("original_symbol")
            )

            gene.symbol = symbol

            gene.gene_name = clean_value(
                row.get("official_gene_name")
            )

            gene.previous_symbol = clean_value(
                row.get("previous_symbol")
            )

            gene.synonyms_aliases = clean_value(
                row.get("synonyms_aliases")
            )

            gene.gene_type = clean_value(
                row.get("gene_type")
            )

            gene.genomic_location = clean_value(
                row.get("genomic_location")
            )

            gene.chromosome = clean_value(
                row.get("chromosome")
            )

            gene.start = (
                int(row["start"])
                if pd.notna(row.get("start"))
                else None
            )

            gene.end = (
                int(row["end"])
                if pd.notna(row.get("end"))
                else None
            )

            gene.strand = (
                int(row["strand"])
                if pd.notna(row.get("strand"))
                else None
            )

            gene.assembly = clean_value(
                row.get("assembly")
            )

            gene.ncbi_gene_id = clean_value(
                row.get("ncbi_gene_id")
            )

            gene.ensembl_gene_id = clean_value(
                row.get("ensembl_gene_id")
            )

            gene.hgnc_id = clean_value(
                row.get("hgnc_id")
            )

            gene.uniprot_id = clean_value(
                row.get("uniprot_id")
            )

            gene.refseq = clean_value(
                row.get("refseq")
            )

            gene.mane_select = clean_value(
                row.get("mane_select")
            )

            gene.canonical_transcript = clean_value(
                row.get("canonical_transcript")
            )

            gene.status = clean_value(
                row.get("status")
            )

            updated += 1

        # --------------------------------------------------
        # New official gene → insert it
        # --------------------------------------------------

        else:

            gene = Gene(
                original_symbol=clean_value(
                    row.get("original_symbol")
                ),

                symbol=symbol,

                gene_name=clean_value(
                    row.get("official_gene_name")
                ),

                previous_symbol=clean_value(
                    row.get("previous_symbol")
                ),

                synonyms_aliases=clean_value(
                    row.get("synonyms_aliases")
                ),

                gene_type=clean_value(
                    row.get("gene_type")
                ),

                genomic_location=clean_value(
                    row.get("genomic_location")
                ),

                chromosome=clean_value(
                    row.get("chromosome")
                ),

                start=(
                    int(row["start"])
                    if pd.notna(row.get("start"))
                    else None
                ),

                end=(
                    int(row["end"])
                    if pd.notna(row.get("end"))
                    else None
                ),

                strand=(
                    int(row["strand"])
                    if pd.notna(row.get("strand"))
                    else None
                ),

                assembly=clean_value(
                    row.get("assembly")
                ),

                ncbi_gene_id=clean_value(
                    row.get("ncbi_gene_id")
                ),

                ensembl_gene_id=clean_value(
                    row.get("ensembl_gene_id")
                ),

                hgnc_id=clean_value(
                    row.get("hgnc_id")
                ),

                uniprot_id=clean_value(
                    row.get("uniprot_id")
                ),

                refseq=clean_value(
                    row.get("refseq")
                ),

                mane_select=clean_value(
                    row.get("mane_select")
                ),

                canonical_transcript=clean_value(
                    row.get("canonical_transcript")
                ),

                status=clean_value(
                    row.get("status")
                ),
            )

            db.add(gene)
            inserted += 1

    db.commit()

    print()
    print("===================================")
    print("Gene annotation import completed")
    print("===================================")
    print(f"Updated existing genes : {updated}")
    print(f"Inserted new genes     : {inserted}")
    print(f"Skipped records        : {skipped}")
    print("===================================")

except Exception as e:

    db.rollback()

    print()
    print("IMPORT FAILED")
    print("Database changes rolled back.")
    print(f"Error: {e}")

    raise

finally:

    db.close()