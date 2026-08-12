import os
import sys

import pandas as pd

# Add backend folder to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from sqlalchemy.orm import Session

from app.database import Base, SessionLocal, engine
from app.models.terminated_trial import TerminatedTrial


# Create table if it doesn't exist
Base.metadata.create_all(bind=engine)


def import_terminated_trials():
    db: Session = SessionLocal()

    try:
        file_path = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../../datasets/Terminated.xlsx"
    )
)

        df = pd.read_excel(file_path)
        
        print("Deleting existing terminated trials...")
        db.query(TerminatedTrial).delete()
        db.commit()
        print("Old terminated trials deleted successfully.")

        print(df.head())
        print(f"Total Rows: {len(df)}")

        print("Importing terminated trials...")

        count = 0

        for _, row in df.iterrows():

            trial = TerminatedTrial(
                nct_number=str(row["NCT Number"]).strip() if pd.notna(row["NCT Number"]) else None,
                study_title=str(row["Study Title"]).strip() if pd.notna(row["Study Title"]) else None,
                study_url=str(row["Study URL"]).strip() if pd.notna(row["Study URL"]) else None,
                study_status=str(row["Study Status"]).strip() if pd.notna(row["Study Status"]) else None,
reason=None,                conditions=str(row["Conditions"]).strip() if pd.notna(row["Conditions"]) else None,
                interventions=str(row["Interventions"]).strip() if pd.notna(row["Interventions"]) else None,
                sponsor=str(row["Sponsor"]).strip() if pd.notna(row["Sponsor"]) else None,
                collaborators=str(row["Collaborators"]).strip() if pd.notna(row["Collaborators"]) else None,
                phase=str(row["Phases"]).strip() if pd.notna(row["Phases"]) else None,
                enrollment=str(row["Enrollment"]).strip() if pd.notna(row["Enrollment"]) else None,
                study_type=str(row["Study Type"]).strip() if pd.notna(row["Study Type"]) else None,
                other_ids=str(row["Other IDs"]).strip() if pd.notna(row["Other IDs"]) else None,
            )

            db.add(trial)
            count += 1

        db.commit()

        print(f"✅ Successfully imported {count} terminated trials.")

    except Exception as e:
        db.rollback()
        print(f"❌ Import failed: {e}")

    finally:
        db.close()


if __name__ == "__main__":
    import_terminated_trials()