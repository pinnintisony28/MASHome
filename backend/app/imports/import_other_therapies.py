import json
import os
import sys

import pandas as pd

sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../..")
    )
)

from sqlalchemy.orm import Session

from app.database import Base, SessionLocal, engine
from app.models.other_therapy import OtherTherapy


Base.metadata.create_all(bind=engine)


FILE_PATH = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../../datasets/Other_Therapies.xlsx",
    )
)


# Sheet 1 is intentionally excluded.
THERAPY_SHEETS = [
    "Homeopathy",
    "Ayurveda",
    "Cornerstone Therapy",
    "Exercise Therapy",
    "Medical Nutrition Therapy",
    "Weight Management Programs",
    "Behavioural Therapy",
    "Music Therapy",
    "Yoga Therapy",
    "Mindfulness Meditation",
    "Breathing Exercises (Pranayama)",
    "Sleep Therapy",
    "Psychological Counselling",
    "Probiotics_Synbiotics_Prebiotic",
    "Nutraceuticals",
    "Physiotherapy-Based Exercise Pr",
    "Digital Health Interventions",
    "Bariatric Surgery (Selected Pat",
    "Integrated Adjunctive Therapy M",
]


def clean_value(value):
    if pd.isna(value):
        return None

    value = str(value).strip()

    if not value or value.lower() == "nan":
        return None

    return value

def create_pathway_data(pathway):
    """
    Convert a text pathway into cleaner structured data.

    Connector / drawing characters are not stored as nodes.
    The original pathway text is preserved.
    """

    pathway = clean_value(pathway)

    if not pathway:
        return None

    raw_lines = pathway.splitlines()

    nodes = []

    # Characters used only for drawing the original diagram.
    drawing_chars = set(
        "│┃┆┊┋┏┓┗┛┌┐└┘"
        "├┤┬┴┼─━═"
        "▼▲►◄↓↑→←"
    )

    for line in raw_lines:
        line = line.strip()

        if not line:
            continue

        # Remove common indentation / drawing characters
        cleaned = line

        for char in drawing_chars:
            cleaned = cleaned.replace(char, " ")

        cleaned = " ".join(cleaned.split())

        if not cleaned:
            continue

        # Ignore lines that were only separators/connectors
        if len(cleaned) < 2:
            continue

        # Ignore separator lines such as:
        # ─────────────────────
        if all(
            char in "-_= " for char in cleaned
        ):
            continue

        nodes.append(
            {
                "id": f"node_{len(nodes) + 1}",
                "label": cleaned,
            }
        )

    edges = []

    for index in range(len(nodes) - 1):
        edges.append(
            {
                "from": nodes[index]["id"],
                "to": nodes[index + 1]["id"],
            }
        )

    return json.dumps(
        {
            "original_text": pathway,
            "nodes": nodes,
            "edges": edges,
        },
        ensure_ascii=False,
    )


def import_other_therapies():
    db: Session = SessionLocal()

    try:
        print(f"Reading file: {FILE_PATH}")

        if not os.path.exists(FILE_PATH):
            raise FileNotFoundError(
                f"File not found: {FILE_PATH}"
            )

        print("\nSheets that will be imported:")

        for sheet in THERAPY_SHEETS:
            print(f" - {sheet}")

        print("\nSheet1 will NOT be imported.")

        print("\nDeleting existing other therapy records...")

        db.query(OtherTherapy).delete()
        db.commit()

        print(
            "Old other therapy records deleted successfully."
        )

        total_imported = 0

        # -------------------------------------------------
        # HOMEOPATHY
        # -------------------------------------------------

        if "Homeopathy" in THERAPY_SHEETS:

            df = pd.read_excel(
                FILE_PATH,
                sheet_name="Homeopathy",
                header=0,
            )

            print(
                f"\nHomeopathy rows: {len(df)}"
            )

            for _, row in df.iterrows():

                item_name = clean_value(
                    row.get("Remedy")
                )

                if not item_name:
                    continue

                description = clean_value(
                    row.get("Traditional Indications")
                )

                pathway = create_pathway_data(
                    row.get("Unnamed: 2")
                )

                therapy = OtherTherapy(
                    source_sheet="Homeopathy",
                    category="Homeopathy",
                    item_name=item_name,
                    secondary_name=None,
                    description=description,
                    mechanism=None,
                    effect=None,
                    outcome=None,
                    pathway_data=pathway,
                )

                db.add(therapy)
                total_imported += 1

        # -------------------------------------------------
        # AYURVEDA
        # -------------------------------------------------

        if "Ayurveda" in THERAPY_SHEETS:

            df = pd.read_excel(
                FILE_PATH,
                sheet_name="Ayurveda",
                header=0,
            )

            print(
                f"Ayurveda rows: {len(df)}"
            )

            for _, row in df.iterrows():

                item_name = clean_value(
                    row.get("Ayurvedic Medicine")
                )

                if not item_name:
                    continue

                secondary_name = clean_value(
                    row.get("Botanical Name")
                )

                mechanism = clean_value(
                    row.get("Proposed Mechanisms")
                )

                pathway = create_pathway_data(
                    row.get("Pathway")
                )

                therapy = OtherTherapy(
                    source_sheet="Ayurveda",
                    category="Ayurveda",
                    item_name=item_name,
                    secondary_name=secondary_name,
                    description=None,
                    mechanism=mechanism,
                    effect=None,
                    outcome=None,
                    pathway_data=pathway,
                )

                db.add(therapy)
                total_imported += 1

        # -------------------------------------------------
        # CORNERSTONE THERAPY
        # -------------------------------------------------

        if "Cornerstone Therapy" in THERAPY_SHEETS:

            df = pd.read_excel(
                FILE_PATH,
                sheet_name="Cornerstone Therapy",
                header=0,
            )

            print(
                f"Cornerstone Therapy rows: {len(df)}"
            )

            for _, row in df.iterrows():

                item_name = clean_value(
                    row.get("Component")
                )

                if not item_name:
                    continue

                effect = clean_value(
                    row.get("Molecular Target/Effect")
                )

                outcome = clean_value(
                    row.get("Clinical Outcome")
                )

                therapy = OtherTherapy(
                    source_sheet="Cornerstone Therapy",
                    category="Cornerstone Therapy",
                    item_name=item_name,
                    secondary_name=None,
                    description=None,
                    mechanism=None,
                    effect=effect,
                    outcome=outcome,
                    pathway_data=None,
                )

                db.add(therapy)
                total_imported += 1

        # -------------------------------------------------
        # STANDARD MECHANISM SHEETS
        # -------------------------------------------------

        standard_sheets = [
            "Exercise Therapy",
            "Medical Nutrition Therapy",
            "Weight Management Programs",
            "Behavioural Therapy",
            "Music Therapy",
            "Yoga Therapy",
            "Mindfulness Meditation",
            "Breathing Exercises (Pranayama)",
            "Sleep Therapy",
            "Psychological Counselling",
            "Probiotics_Synbiotics_Prebiotic",
            "Nutraceuticals",
            "Physiotherapy-Based Exercise Pr",
            "Digital Health Interventions",
            "Bariatric Surgery (Selected Pat",
        ]

        for sheet_name in standard_sheets:

            if sheet_name not in THERAPY_SHEETS:
                continue

            df = pd.read_excel(
                FILE_PATH,
                sheet_name=sheet_name,
                header=0,
            )

            print(
                f"{sheet_name} rows: {len(df)}"
            )

            columns = list(df.columns)

            if "Mechanism" not in columns:
                print(
                    f"⚠️ Skipping {sheet_name}: "
                    f"'Mechanism' column not found."
                )
                continue

            # Some sheets use "Molecular Target"
            # while others use "Primary Effect".
            if "Molecular Target" in columns:
                effect_column = "Molecular Target"
            else:
                effect_column = "Primary Effect"

            if "Clinical Effect" in columns:
                outcome_column = "Clinical Effect"
            else:
                outcome_column = "Clinical Outcome"

            for _, row in df.iterrows():

                mechanism = clean_value(
                    row.get("Mechanism")
                )

                if not mechanism:
                    continue

                effect = clean_value(
                    row.get(effect_column)
                )

                outcome = clean_value(
                    row.get(outcome_column)
                )

                therapy = OtherTherapy(
                    source_sheet=sheet_name,
                    category=sheet_name,
                    item_name=mechanism,
                    secondary_name=None,
                    description=None,
                    mechanism=mechanism,
                    effect=effect,
                    outcome=outcome,
                    pathway_data=None,
                )

                db.add(therapy)
                total_imported += 1

        # -------------------------------------------------
        # INTEGRATED ADJUNCTIVE THERAPY
        # -------------------------------------------------

        sheet_name = "Integrated Adjunctive Therapy M"

        if sheet_name in THERAPY_SHEETS:

            df = pd.read_excel(
                FILE_PATH,
                sheet_name=sheet_name,
                header=0,
            )

            print(
                f"{sheet_name} rows: {len(df)}"
            )

            for _, row in df.iterrows():

                item_name = clean_value(
                    row.get("Pathogenic Mechanism")
                )

                if not item_name:
                    continue

                effect = clean_value(
                    row.get("Therapeutic Targets")
                )

                outcome = clean_value(
                    row.get("Adjunctive Therapies")
                )

                therapy = OtherTherapy(
                    source_sheet=sheet_name,
                    category="Integrated Adjunctive Therapy",
                    item_name=item_name,
                    secondary_name=None,
                    description=None,
                    mechanism=item_name,
                    effect=effect,
                    outcome=outcome,
                    pathway_data=None,
                )

                db.add(therapy)
                total_imported += 1

        db.commit()

        print(
            f"\n✅ Successfully imported "
            f"{total_imported} other therapy records."
        )

    except Exception as e:
        db.rollback()

        print(
            f"\n❌ Import failed: {e}"
        )

    finally:
        db.close()


if __name__ == "__main__":
    import_other_therapies()