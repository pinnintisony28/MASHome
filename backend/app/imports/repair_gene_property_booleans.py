
import math
import sys
from collections import defaultdict
from pathlib import Path

import pandas as pd
from sqlalchemy import text

from app.database import SessionLocal
from app.models.gene import Gene
from app.models.gene_properties import GeneProperties


BASE_DIR = Path(__file__).resolve().parents[3]
SOURCE_FILE = BASE_DIR / "datasets" / "Gene_OpenTargets.xlsx"

BOOLEAN_COLUMNS = {
    "isInMembrane": "is_in_membrane",
    "isSecreted": "is_secreted",
    "hasLigand": "has_ligand",
    "hasSmallMoleculeBinder": "has_small_molecule_binder",
    "hasPocket": "has_pocket",
}

CONFLICTING_SYMBOLS = {
    "ASMT", "CAST", "CSF2RA", "IL3RA",
    "PINX1", "SFTA3", "SHOX", "SLC25A6",
}

SCORE_TOLERANCE = 0.000001
APPLY_CHANGES = "--apply" in sys.argv


def normalize_symbol(value):
    if pd.isna(value):
        return None
    return str(value).strip()


def normalize_score(value):
    if pd.isna(value):
        return None
    try:
        score = float(value)
    except (ValueError, TypeError):
        return None
    return score if math.isfinite(score) else None


def parse_bool(value):
    if pd.isna(value):
        return None

    value = str(value).strip().lower()

    if value in {"", "no data", "none", "nan"}:
        return None
    if value in {"1", "true", "yes"}:
        return True
    if value in {"0", "false", "no"}:
        return False

    raise ValueError(f"Unexpected Boolean value: {value!r}")


def main():
    if not SOURCE_FILE.exists():
        raise FileNotFoundError(f"Source file not found: {SOURCE_FILE}")

    df = pd.read_excel(SOURCE_FILE)

    required = {"symbol", "globalScore", *BOOLEAN_COLUMNS.keys()}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Missing Excel columns: {sorted(missing)}")

    source_groups = defaultdict(list)

    for _, row in df.iterrows():
        symbol = normalize_symbol(row["symbol"])
        score = normalize_score(row["globalScore"])

        if symbol is None or score is None:
            continue

        values = tuple(
            parse_bool(row[column])
            for column in BOOLEAN_COLUMNS
        )
        source_groups[symbol].append((score, values))

    db = SessionLocal()

    try:
        # Verify that the safety backup exists and has the expected row count.
        backup_count = db.execute(
            text(
                "SELECT COUNT(*) "
                "FROM gene_properties_backup_before_bool_fix"
            )
        ).scalar_one()

        current_count = db.query(GeneProperties).count()

        if backup_count != current_count:
            raise RuntimeError(
                f"Backup has {backup_count} rows but the live table has "
                f"{current_count}. Aborting."
            )

        genes_by_id = {
            gene.id: gene
            for gene in db.query(Gene).all()
        }

        updates = []
        skipped_conflicting_symbols = 0
        skipped_ambiguous = 0
        skipped_unmatched = 0
        unchanged = 0

        for prop in db.query(GeneProperties).all():
            gene = genes_by_id.get(prop.gene_id)

            if gene is None or not normalize_symbol(gene.symbol):
                skipped_unmatched += 1
                continue

            symbol = normalize_symbol(gene.symbol)

            if symbol in CONFLICTING_SYMBOLS:
                skipped_conflicting_symbols += 1
                continue

            db_score = normalize_score(prop.global_score)

            if db_score is None:
                skipped_unmatched += 1
                continue

            matches = [
                (score, values)
                for score, values in source_groups.get(symbol, [])
                if abs(score - db_score) <= SCORE_TOLERANCE
            ]

            if not matches:
                skipped_unmatched += 1
                continue

            distinct_scores = {score for score, _ in matches}
            distinct_values = {values for _, values in matches}

            if len(distinct_scores) != 1 or len(distinct_values) != 1:
                skipped_ambiguous += 1
                continue

            expected = next(iter(distinct_values))
            changes = {
                db_column: value
                for db_column, value in zip(
                    BOOLEAN_COLUMNS.values(), expected
                )
                if getattr(prop, db_column) != value
            }

            if changes:
                updates.append((prop, changes))
            else:
                unchanged += 1

        print("=" * 55)
        print("MODE:", "APPLY" if APPLY_CHANGES else "DRY RUN")
        print("Source rows:", len(df))
        print("Live table records:", current_count)
        print("Backup table records:", backup_count)
        print("Records needing Boolean corrections:", len(updates))
        
        for column in BOOLEAN_COLUMNS.values():
            counts = {"True": 0, "False": 0, "NULL": 0}

            for _, changes in updates:
                if column not in changes:
                    continue

                value = changes[column]
                label = (
                    "NULL" if value is None
                    else "True" if value is True
                    else "False"
                )
                counts[label] += 1

            print(f"{column} corrections:", counts)

        print("Records already correct:", unchanged)
        print("Skipped conflicting symbols:", skipped_conflicting_symbols)
        print("Skipped ambiguous matches:", skipped_ambiguous)
        print("Skipped unmatched records:", skipped_unmatched)

        if not APPLY_CHANGES:
            db.rollback()
            print("DRY RUN ONLY: No changes committed.")
            print("Review these counts before running with --apply.")
            print("=" * 55)
            return

        # Change only the five Boolean fields; preserve every other field.
        for prop, changes in updates:
            for column, value in changes.items():
                setattr(prop, column, value)

        db.commit()

        print("Committed corrections:", len(updates))
        print("Total records remain:", db.query(GeneProperties).count())
        print("=" * 55)

    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
