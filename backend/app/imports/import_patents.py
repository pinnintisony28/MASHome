import os
import sys

import pandas as pd

# Add backend folder to Python path
sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../..")
    )
)

from sqlalchemy.orm import Session

from app.database import Base, SessionLocal, engine
from app.models.patent import Patent


# Create table if it doesn't exist
Base.metadata.create_all(bind=engine)


def import_patents():
    db: Session = SessionLocal()

    try:
        # Dataset is outside backend
        file_path = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__),
                "../../../datasets/Patent.xlsx",
            )
        )

        print(f"Reading file: {file_path}")

        # Main sheet only
        df = pd.read_excel(
            file_path,
            sheet_name="Main",
        )

        print("\nColumns in Excel:")
        print(df.columns.tolist())

        print(f"\nTotal rows: {len(df)}")

        # --------------------------------
        # Delete existing records
        # --------------------------------

        print("\nDeleting existing patents...")

        db.query(Patent).delete()
        db.commit()

        print("Old patent records deleted successfully.")

        # --------------------------------
        # Import
        # --------------------------------

        print("\nImporting patents...")

        count = 0

        for _, row in df.iterrows():

            application_id = (
                str(row["Application Id"]).strip()
                if pd.notna(row["Application Id"])
                else None
            )

            application_number = (
                str(row["Application Number"]).strip()
                if pd.notna(row["Application Number"])
                else None
            )

            application_date = (
                str(row["Application Date"]).strip()
                if pd.notna(row["Application Date"])
                else None
            )

            country = (
                str(row["Country"]).strip()
                if pd.notna(row["Country"])
                else None
            )

            title = (
                str(row["Title"]).strip()
                if pd.notna(row["Title"])
                else None
            )

            ipc = (
                str(row["I P C"]).strip()
                if pd.notna(row["I P C"])
                else None
            )

            # --------------------------------
            # Application ID hyperlink
            # --------------------------------
            application_url = None

            if application_id:
                application_url = (
                    "https://patentscope.wipo.int/search/"
                    "en/detail.jsf?docId="
                    + application_id
                )

            patent = Patent(
                application_id=application_id,
                application_url=application_url,
                application_number=application_number,
                application_date=application_date,
                country=country,
                title=title,
                ipc=ipc,
            )

            db.add(patent)
            count += 1

        db.commit()

        print(
            f"\n✅ Successfully imported {count} patents."
        )

    except Exception as e:
        db.rollback()
        print(f"\n❌ Import failed: {e}")

    finally:
        db.close()


if __name__ == "__main__":
    import_patents()