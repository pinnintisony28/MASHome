import pandas as pd
from pathlib import Path

from app.database import SessionLocal
from app.models.bioactive import Bioactive
from app.models.bioactive_toxicity import BioactiveToxicity

BASE_DIR = Path(__file__).resolve().parents[3]
EXCEL_FILE = BASE_DIR / "datasets" / "Bioactives.xlsx"


def to_float(value):
    if pd.isna(value):
        return None

    value = str(value).strip()

    if value == "" or value.lower() in ["nan", "n/a", "n/d"]:
        return None

    try:
        return float(value)
    except Exception:
        return None


def main():
    db = SessionLocal()

    try:

        print("Reading Toxicity Prediction sheet...")

        df = pd.read_excel(
            EXCEL_FILE,
            sheet_name="Toxicity Prediction",
            header=None
        )

        db.query(BioactiveToxicity).delete()
        db.commit()

        bioactive_lookup = {
            b.bioactive_name.strip().lower(): b.bioactive_id
            for b in db.query(Bioactive).all()
        }

        current_bioactive = None
        current_bioactive_id = None

        predicted_ld50 = None
        predicted_class = None
        average_similarity = None
        prediction_accuracy = None

        imported = 0

        for _, row in df.iterrows():

            first_col = row[0]

            if pd.isna(first_col):
                continue

            first_col = str(first_col).strip()

            # ---------------------------------------------------
            # Detect new Bioactive block
            # ---------------------------------------------------
            if first_col.lower() in bioactive_lookup:

                current_bioactive = first_col
                current_bioactive_id = bioactive_lookup[first_col.lower()]

                predicted_ld50 = row[7]
                predicted_class = row[8]
                average_similarity = to_float(row[9])
                prediction_accuracy = to_float(row[10])

                print(f"Processing {current_bioactive}")

                continue

            # Skip header row
            if first_col == "Classification":
                continue

            # Ignore rows before first bioactive
            if current_bioactive_id is None:
                continue

            toxicity = BioactiveToxicity(

                bioactive_id=current_bioactive_id,

                category=first_col,

                endpoint=str(row[1]).strip()
                if not pd.isna(row[1])
                else None,

                prediction=str(row[3]).strip()
                if not pd.isna(row[3])
                else None,

                probability=to_float(row[4]),

                predicted_ld50=str(predicted_ld50)
                if not pd.isna(predicted_ld50)
                else None,

                predicted_toxicity_class=str(predicted_class)
                if not pd.isna(predicted_class)
                else None,

                average_similarity=average_similarity,

                prediction_accuracy=prediction_accuracy,
            )

            db.add(toxicity)
            imported += 1

        db.commit()

        print(f"\nSuccessfully imported {imported} toxicity records.")

    except Exception as e:
        db.rollback()
        print("ERROR:", e)

    finally:
        db.close()


if __name__ == "__main__":
    main()