from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Therapy(Base):
    __tablename__ = "therapies"

    id = Column(Integer, primary_key=True, index=True)

    therapy_name = Column(String(255), nullable=False)

    therapy_type = Column(String(100))

    description = Column(Text)