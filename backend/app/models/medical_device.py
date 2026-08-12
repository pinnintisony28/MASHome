from sqlalchemy import Column, Integer, String, Text

from app.database import Base


class MedicalDevice(Base):
    __tablename__ = "medical_devices"

    id = Column(Integer, primary_key=True, index=True)

    device_test = Column(String(255), nullable=False)

    manufacturer = Column(String(255))

    approval_clearance_year = Column(String(255))

    regulatory_body = Column(String(255))

    country_region = Column(String(255))

    device_type = Column(String(255))

    primary_use = Column(Text)

    nafld_masld = Column(String(100))

    nash_mash = Column(String(100))

    fibrosis = Column(String(100))

    cirrhosis = Column(String(100))