from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class BioactiveToxicity(Base):
    __tablename__ = "bioactive_toxicity"

    id = Column(Integer, primary_key=True, index=True)

    bioactive_id = Column(
        Integer,
        ForeignKey("bioactives.bioactive_id"),
        nullable=False
    )

    # Toxicity Details
    category = Column(String(100), nullable=False)
    endpoint = Column(String(255), nullable=False)
    prediction = Column(String(100))
    probability = Column(Float)

    # Overall Toxicity Summary
    predicted_ld50 = Column(String(100))
    predicted_toxicity_class = Column(String(50))
    average_similarity = Column(Float)
    prediction_accuracy = Column(Float)

    # Relationship
    bioactive = relationship(
        "Bioactive",
        back_populates="toxicity"
    )   