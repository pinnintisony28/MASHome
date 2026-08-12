from sqlalchemy import Column, Integer, String, Text

from app.database import Base


class Patent(Base):
    __tablename__ = "patents"

    id = Column(Integer, primary_key=True, index=True)

    application_id = Column(String(100), index=True)

    application_url = Column(Text)

    application_number = Column(String(255), index=True)

    application_date = Column(String(100))

    country = Column(String(100), index=True)

    title = Column(Text)

    ipc = Column(Text)