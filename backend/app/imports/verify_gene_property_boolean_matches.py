
import math
import random
from pathlib import Path

import pandas as pd

from app.database import SessionLocal
from app.models.gene import Gene
from app.models.gene_properties import GeneProperties


BASE_DIR = Path(__file__).resolve().parents[3]
SOURCE_FILE = BASE_DIR / "datasets" / "Gene_OpenTargets.xlsx"

COLUMNS = {
    "isInMembrane": "is_in_membrane",
    "isSecreted": "is_secreted",
    "hasLigand": "has_ligand",
    "hasSmallMoleculeBinder": "has_small_molecule_binder",
    "hasPocket": "has_pocket",
}

EXCLUDED = {
    "ASMT", "CAST", "CSF2RA", "IL3RA",
    "PINX1", "SFTA3", "SHOX", "SLC25A6",
}


def score(value):
    try:
        result = float(value)
        return result if math.isfinite(result) else None
    except (TypeError, ValueError):
        return None


def boolean(value):
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
    df = pd.read_excel(SOURCE_FILE)
    source = {}

    for _, row in df.iterrows():
        symbol = str(row["symbol"]).strip()
        source_score = score(row["globalScore"])

        if symbol == "nan" or source_score is None:
            continue

        values = tuple(boolean(row[c]) for c in COLUMNS)
        source.setdefault(symbol, []).append((source_score, values))

    db = SessionLocal()

    try:
        genes = {g.id: g for g in db.query(Gene).all()}
        candidates = []

        for prop in db.query(GeneProperties).all():
            gene = genes.get(prop.gene_id)

            if not gene or not gene.symbol:
                continue

            symbol = gene.symbol.strip()
            if symbol in EXCLUDED:
                continue

            db_score = score(prop.global_score)
            if db_score is None:
                continue

            matches = [
                (s, values)
                for s, values in source.get(symbol, [])
                if abs(s - db_score) <= 0.000001
            ]

            distinct_scores = {s for s, _ in matches}
            distinct_values = {v for _, v in matches}

            if len(distinct_scores) != 1 or len(distinct_values) != 1:
                continue

            expected = next(iter(distinct_values))
            current = tuple(
                getattr(prop, col) for col in COLUMNS.values()
            )

            if current != expected:
                candidates.append(
                    (symbol, prop.id, db_score, expected, current)
                )

        random.seed(42)

        for label, predicate in [
            ("Expected TRUE", lambda v: True in v),
            ("Expected FALSE", lambda v: False in v),
            ("Expected NULL", lambda v: None in v),
        ]:
            matching = [
                item for item in candidates if predicate(item[3])
            ]
            sample = random.sample(matching, min(5, len(matching)))

            print(f"\n--- {label}: {len(matching)} candidates ---")
            for symbol, record_id, db_score, expected, current in sample:
                print(
                    f"{symbol} | record={record_id} | score={db_score}"
                )
                print("  Excel expected:", expected)
                print("  Database now:  ", current)

        print("\nVerification is read-only; no changes were made.")

    finally:
        db.close()


if __name__ == "__main__":
    main()
