import api from "./api";

export interface MoleculeInfo {
  compound_name: string;
  cid: number;
  molecular_formula: string;
  molecular_weight: number;
  iupac_name: string;
  canonical_smiles: string;
  inchi: string;
  inchikey: string;
  image_2d: string;
  structure_3d: string;
  pubchem_url: string;
}

export async function getMoleculeInfo(
  bioactiveId: number
): Promise<MoleculeInfo> {
  const response = await api.get(`/bioactives/${bioactiveId}/molecule`);
  return response.data;
}