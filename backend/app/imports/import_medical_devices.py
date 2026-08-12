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
from app.models.medical_device import MedicalDevice


# Create table if it doesn't exist
Base.metadata.create_all(bind=engine)


def import_medical_devices():
    db: Session = SessionLocal()

    try:
        # Dataset is outside backend
        file_path = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__),
                "../../../datasets/Medical Devices.xlsx",
            )
        )

        print(f"Reading file: {file_path}")

        # Read the MD sheet only
        df = pd.read_excel(
            file_path,
            sheet_name="MD",
        )

        print("\nColumns in Excel:")
        print(df.columns.tolist())

        print(f"\nTotal rows: {len(df)}")

        # --------------------------------
        # Delete existing records
        # --------------------------------

        print("\nDeleting existing medical devices...")

        db.query(MedicalDevice).delete()
        db.commit()

        print(
            "Old medical device records deleted successfully."
        )

        # --------------------------------
        # Import records
        # --------------------------------

        print("\nImporting medical devices...")

        count = 0

        for _, row in df.iterrows():

            device_test = (
                str(row["Device/Test"]).strip()
                if pd.notna(row["Device/Test"])
                else None
            )

            manufacturer = (
                str(row["Manufacturer"]).strip()
                if pd.notna(row["Manufacturer"])
                else None
            )

            approval_clearance_year = (
                str(row["Approval/Clearance Year*"]).strip()
                if pd.notna(row["Approval/Clearance Year*"])
                else None
            )

            regulatory_body = (
                str(row["Regulatory Body"]).strip()
                if pd.notna(row["Regulatory Body"])
                else None
            )

            country_region = (
                str(row["Country/Region"]).strip()
                if pd.notna(row["Country/Region"])
                else None
            )

            device_type = (
                str(row["Device Type"]).strip()
                if pd.notna(row["Device Type"])
                else None
            )

            primary_use = (
                str(row["Primary Use"]).strip()
                if pd.notna(row["Primary Use"])
                else None
            )

            nafld_masld = (
                str(row["NAFLD/MASLD"]).strip()
                if pd.notna(row["NAFLD/MASLD"])
                else None
            )

            nash_mash = (
                str(row["NASH/MASH"]).strip()
                if pd.notna(row["NASH/MASH"])
                else None
            )

            fibrosis = (
                str(row["Fibrosis"]).strip()
                if pd.notna(row["Fibrosis"])
                else None
            )

            cirrhosis = (
                str(row["Cirrhosis"]).strip()
                if pd.notna(row["Cirrhosis"])
                else None
            )

            medical_device = MedicalDevice(
                device_test=device_test,
                manufacturer=manufacturer,
                approval_clearance_year=approval_clearance_year,
                regulatory_body=regulatory_body,
                country_region=country_region,
                device_type=device_type,
                primary_use=primary_use,
                nafld_masld=nafld_masld,
                nash_mash=nash_mash,
                fibrosis=fibrosis,
                cirrhosis=cirrhosis,
            )

            db.add(medical_device)
            count += 1

        db.commit()

        print(
            f"\n✅ Successfully imported "
            f"{count} medical devices."
        )

    except Exception as e:
        db.rollback()
        print(f"\n❌ Import failed: {e}")

    finally:
        db.close()


if __name__ == "__main__":
    import_medical_devices()