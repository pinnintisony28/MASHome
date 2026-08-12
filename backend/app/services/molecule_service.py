import requests
from urllib.parse import quote

PUBCHEM_BASE = "https://pubchem.ncbi.nlm.nih.gov/rest/pug"


def get_molecule_info(compound_name: str):
    """
    Fetch molecular information from PubChem using the compound name.
    """

    try:
        # -----------------------------
        # STEP 1: Get CID from compound name
        # -----------------------------
        
        cid_url = (
            f"{PUBCHEM_BASE}/compound/name/"
            f"{quote(compound_name)}/cids/JSON"
        )

        print("CID URL:", cid_url)

        cid_response = requests.get(cid_url, timeout=10)

        print("CID Status:", cid_response.status_code)
        print("CID Response:", cid_response.text)

        if cid_response.status_code != 200:
            return {
                "message": "Compound not found in PubChem."
            }

        cid_data = cid_response.json()

        cid = cid_data["IdentifierList"]["CID"][0]
        print("CID Found:", cid)
        # -----------------------------
        # STEP 2: Get Properties
        # -----------------------------

        property_url = (
            f"{PUBCHEM_BASE}/compound/cid/{cid}/property/"
            "MolecularFormula,"
            "MolecularWeight,"
            "IUPACName,"
            "CanonicalSMILES,"
            "InChI,"
            "InChIKey/JSON"
        )

        print("Property URL:", property_url)

        property_response = requests.get(property_url, timeout=10)

        print("Property Status:", property_response.status_code)
        print("Property Response:", property_response.text)

        if property_response.status_code != 200:
            return {
                "message": "Unable to fetch molecular properties."
            }

        properties = property_response.json()["PropertyTable"]["Properties"][0]

        return {
            "compound_name": compound_name,
            "cid": cid,
            "molecular_formula": properties.get("MolecularFormula"),
            "molecular_weight": properties.get("MolecularWeight"),
            "iupac_name": properties.get("IUPACName"),
            "canonical_smiles": properties.get("CanonicalSMILES"),
            "inchi": properties.get("InChI"),
            "inchikey": properties.get("InChIKey"),

            "image_2d":
                f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{cid}/PNG",

            "structure_3d":
    f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{cid}/record/SDF?record_type=3d"
        }

    except Exception as e:
        return {
            "error": str(e)
        }