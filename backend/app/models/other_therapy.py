from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class OtherTherapy(Base):
    __tablename__ = "other_therapies"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # Original Excel sheet name
    source_sheet = Column(
        String(255),
        nullable=False,
        index=True,
    )

    # General therapy category
    category = Column(
        String(255),
        nullable=False,
        index=True,
    )

    # Main item name
    # Example:
    # Chelidonium majus
    # Bhumyamalaki
    # AMPK activation
    item_name = Column(
        String(500),
        nullable=True,
    )

    # Secondary name
    # Example:
    # Phyllanthus niruri
    secondary_name = Column(
        String(500),
        nullable=True,
    )

    # General description / traditional indication
    description = Column(
        Text,
        nullable=True,
    )

    # Mechanism / molecular mechanism
    mechanism = Column(
        Text,
        nullable=True,
    )

    # Primary effect / molecular target
    effect = Column(
        Text,
        nullable=True,
    )

    # Clinical outcome
    outcome = Column(
        Text,
        nullable=True,
    )

    # Structured pathway information
    # Used mainly by Homeopathy and Ayurveda
    pathway_data = Column(
        Text,
        nullable=True,
    )