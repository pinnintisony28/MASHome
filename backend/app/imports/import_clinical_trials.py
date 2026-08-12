import pandas as pd
from pathlib import Path

from app.database import SessionLocal
from app.models.clinical_trial import ClinicalTrial

# -----------------------------
# Project Root
# -----------------------------
BASE_DIR = Path(__file__).resolve().parents[3]

# -----------------------------
# Dataset Path
# -----------------------------
file_path = BASE_DIR / "datasets" / "Clinical_trials.xlsx"

# -----------------------------
# Read Excel
# -----------------------------
df = pd.read_excel(file_path, sheet_name="Overall")
print("Columns in Excel:")
print(df.columns.tolist())

print("\nRecruitment Status values:")
print(df["Recruitment Status"].value_counts(dropna=False))

# -----------------------------
# Database Session
# -----------------------------
db = SessionLocal()

# -----------------------------
# Delete Existing Records
# -----------------------------
print("Deleting existing clinical trials...")

db.query(ClinicalTrial).delete()
db.commit()

print("Old clinical trials deleted successfully.")

print(df.head())
print(f"Total Rows: {len(df)}")
print("Importing clinical trials...")

count = 0

# -----------------------------
# Import Data
# -----------------------------
# -----------------------------
# Import Data
# -----------------------------
for _, row in df.iterrows():

    # Generate a unique trial_id if missing
    trial_id = (
        str(row["TrialID"]).strip()
        if pd.notna(row["TrialID"]) and str(row["TrialID"]).strip()
        else f"AUTO_{count + 1}"
    )

    trial = ClinicalTrial(

        # Basic Information
        registry=str(row["Source Register"]) if pd.notna(row["Source Register"]) else "",
        trial_id=trial_id,
        title=str(row["Public title"]) if pd.notna(row["Public title"]) else "",
        scientific_title=str(row["Scientific title"]) if pd.notna(row["Scientific title"]) else "",
        acronym=str(row["Acronym"]) if pd.notna(row["Acronym"]) else "",

        # Trial Status
        status=str(row["Recruitment Status"]) if pd.notna(row["Recruitment Status"]) else "",
        phase=str(row["Phase"]) if pd.notna(row["Phase"]) else "",
        study_type=str(row["Study type"]) if pd.notna(row["Study type"]) else "",
        study_design=str(row["Study design"]) if pd.notna(row["Study design"]) else "",

        # Disease & Intervention
        conditions=str(row["Condition"]) if pd.notna(row["Condition"]) else "",
        interventions=str(row["Intervention"]) if pd.notna(row["Intervention"]) else "",

        # Sponsors
        sponsor=str(row["Primary sponsor"]) if pd.notna(row["Primary sponsor"]) else "",
        secondary_sponsor=str(row["Secondary Sponsor"]) if pd.notna(row["Secondary Sponsor"]) else "",

        # Participants
        enrollment=str(row["Target size"]) if pd.notna(row["Target size"]) else "",
        gender=str(row["Inclusion gender"]) if pd.notna(row["Inclusion gender"]) else "",
        age=f'{row["Inclusion agemin"]} - {row["Inclusion agemax"]}',

        # Eligibility
        inclusion_criteria=str(row["Inclusion Criteria"]) if pd.notna(row["Inclusion Criteria"]) else "",
        exclusion_criteria=str(row["Exclusion Criteria"]) if pd.notna(row["Exclusion Criteria"]) else "",

        # Outcomes
        primary_outcome=str(row["Primary outcome"]) if pd.notna(row["Primary outcome"]) else "",
        secondary_outcome=str(row["Secondary outcome"]) if pd.notna(row["Secondary outcome"]) else "",

        # Contact Information
        contact_name=str(row["Contact Firstname"]) if pd.notna(row["Contact Firstname"]) else "",
        contact_email=str(row["Contact Email"]) if pd.notna(row["Contact Email"]) else "",
        contact_phone=str(row["Contact Tel"]) if pd.notna(row["Contact Tel"]) else "",

        # Ethics
        ethics_status=str(row["Ethics Status"]) if pd.notna(row["Ethics Status"]) else "",
        ethics_approval_date=str(row["Ethics Approval Date"]) if pd.notna(row["Ethics Approval Date"]) else "",

        # Location
        country=str(row["Countries"]) if pd.notna(row["Countries"]) else "",

        # Dates
        start_date=str(row["Date enrollement"]) if pd.notna(row["Date enrollement"]) else "",
        completion_date=str(row["results date completed"]) if pd.notna(row["results date completed"]) else "",
        last_update=str(row["Last Refreshed on"]) if pd.notna(row["Last Refreshed on"]) else "",

        # Results
        results_available=str(row["results yes no"]) if pd.notna(row["results yes no"]) else "",
        results_date_posted=str(row["results date posted"]) if pd.notna(row["results date posted"]) else "",
        results_summary=str(row["results summary"]) if pd.notna(row["results summary"]) else "",

        # Source
        source_name=str(row["Source Name"]) if pd.notna(row["Source Name"]) else "",
        url=str(row["web address"]) if pd.notna(row["web address"]) else "",
    )

    db.add(trial)
    count += 1

   

# -----------------------------
# Save All Records
# -----------------------------
db.commit()
db.close()

print(f"✅ Successfully imported {count} clinical trials.")