export interface BioactiveADME {
  canonical_smiles?: string;
  molecular_formula?: string;
  molecular_weight?: string;
  heavy_atoms?: number;
  aromatic_heavy_atoms?: number;
  fraction_csp3?: number;
  rotatable_bonds?: number;
  h_bond_acceptors?: number;
  h_bond_donors?: number;
  molar_refractivity?: number;
  tpsa?: number;
  ilogp?: number;
  gi_absorption?: string;
  bbb_permeant?: string;
  pgp_substrate?: string;
  cyp1a2_inhibitor?: string;
  cyp2c19_inhibitor?: string;
  cyp2c9_inhibitor?: string;
  cyp2d6_inhibitor?: string;
  cyp3a4_inhibitor?: string;
  lipinski?: string;
  ghose?: string;
  veber?: string;
  egan?: string;
  muegge?: string;
  bioavailability_score?: number;
}

export interface BioactiveToxicity {
  category?: string;
  endpoint?: string;
  prediction?: string;
  probability?: number;
  predicted_ld50?: string;
  predicted_toxicity_class?: string;
  average_similarity?: number;
  prediction_accuracy?: number;
}

export interface Bioactive {
  bioactive_id: number;
  bioactive_name: string;

  molecular_formula?: string;
  molecular_weight?: string;
  iupac_name?: string;
  smiles?: string;

  plants: BioactivePlant[];
  family?: string;
  useful_part?: string;
  chemical_constituents_containing_plants?: string;
  adme?: BioactiveADME;
  toxicity?: BioactiveToxicity[];
}
export interface BioactivePlant {
  id: number;
  plant_name: string;
  plant_url?: string;
}