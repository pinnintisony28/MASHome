from pydantic import BaseModel


class TargetResponse(BaseModel):
    id: int

    target_id: str

    former_id: str | None = None

    uniprot_id: str | None = None

    target_name: str | None = None

    gene_name: str | None = None

    target_type: str | None = None

    synonyms: str | None = None

    function: str | None = None

    pdb_structure: str | None = None

    bio_class: str | None = None

    ec_number: str | None = None

    sequence: str | None = None

    class Config:
        from_attributes = True