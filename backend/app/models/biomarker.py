from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Biomarker(Base):
    __tablename__ = "biomarkers"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # Value coming from the Excel Biomarker_ID column
    biomarker_id = Column(
        String(500),
        index=True
    )

    # Display name used by the frontend
    biomarker_name = Column(
        String(500),
        index=True
    )

    # Main category
    # Example:
    # Blood & Serum Biomarkers
    # Imaging-Based Biomarkers
    category = Column(
        String(255),
        index=True
    )

    # More specific grouping when available
    # Example:
    # Liver Injury Biomarkers
    # Routine Liver Function Tests
    subgroup = Column(
        String(500),
        nullable=True
    )

    # Available mainly from Sheet1
    normal_range = Column(
        Text,
        nullable=True
    )

    clinical_significance = Column(
        Text,
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )

    # Original Excel sheet
    source_sheet = Column(
        String(255),
        index=True
    )