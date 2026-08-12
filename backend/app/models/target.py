from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Target(Base):
    __tablename__ = "targets"

    id = Column(Integer, primary_key=True, index=True)

    target_id = Column(String(50), unique=True, index=True)

    former_id = Column(Text)

    uniprot_id = Column(Text)

    target_name = Column(Text)

    gene_name = Column(Text)

    target_type = Column(Text)

    synonyms = Column(Text)

    function = Column(Text)

    pdb_structure = Column(Text)

    bio_class = Column(Text)

    ec_number = Column(Text)

    sequence = Column(Text)