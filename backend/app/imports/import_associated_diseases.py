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
from app.models.associated_disease import AssociatedDisease


Base.metadata.create_all(bind=engine)


def import_associated_diseases():
    db: Session = SessionLocal()

    try:
        file_path = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__),
                "../../../datasets/Associated Diseases.xlsx",
            )
        )

        print(f"Reading file: {file_path}")

        # Row 1 contains the actual column headers.
        # We only need the first 3 columns.
        df = pd.read_excel(
            file_path,
            sheet_name="Diseases",
            header=1,
            usecols=[0, 1, 2],
        )

        # Rename columns explicitly
        df.columns = [
            "Associated Disease",
            "Relationship with NAFLD/MASH",
            "Underlying Reason",
        ]

        print("\nColumns being imported:")
        print(df.columns.tolist())

        print(f"\nTotal rows before cleaning: {len(df)}")

        # Remove completely empty rows
        df = df.dropna(
            subset=["Associated Disease"],
            how="all",
        )

        print(f"Total disease rows: {len(df)}")

        print("\nDeleting existing associated diseases...")

        db.query(AssociatedDisease).delete()
        db.commit()

        print(
            "Old associated disease records deleted successfully."
        )

        print("\nImporting associated diseases...")

        count = 0

        for _, row in df.iterrows():

            associated_disease = (
                str(row["Associated Disease"]).strip()
                if pd.notna(row["Associated Disease"])
                else None
            )

            relationship = (
                str(
                    row["Relationship with NAFLD/MASH"]
                ).strip()
                if pd.notna(
                    row["Relationship with NAFLD/MASH"]
                )
                else None
            )

            underlying_reason = (
                str(
                    row["Underlying Reason"]
                ).strip()
                if pd.notna(
                    row["Underlying Reason"]
                )
                else None
            )

            # Skip rows without a disease name
            if not associated_disease:
                continue

            disease = AssociatedDisease(
                associated_disease=associated_disease,
                relationship_with_nafld_mash=relationship,
                underlying_reason=underlying_reason,
            )

            db.add(disease)
            count += 1

        db.commit()

        print(
            f"\n✅ Successfully imported "
            f"{count} associated diseases."
        )

    except Exception as e:
        db.rollback()
        print(f"\n❌ Import failed: {e}")

    finally:
        db.close()


if __name__ == "__main__":
    import_associated_diseases()