export interface GeneProperty {
  global_score: number;
  max_clinical_stage: string;
  is_in_membrane: boolean;
  is_secreted: boolean;
  has_ligand: boolean;
  has_small_molecule_binder: boolean;
  has_pocket: boolean;
  tissue_specificity: string | null;
  tissue_distribution: string | null;
}

export interface Gene {
  id: number;
  symbol: string;
  gene_name: string;
  gene_type: string;
}

export interface GeneDetails extends Gene {
  properties: GeneProperty[];
}