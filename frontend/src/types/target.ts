
export interface Target {
  id: number;
  target_id: string;
  former_id: string;
  uniprot_id: string;
  target_name: string;
  gene_name: string;
  target_type: string;
  synonyms: string;
  function: string;
  pdb_structure: string;
  bio_class: string;
  ec_number: string;
  sequence: string;
}

export interface TargetListResponse {
  items: Target[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}