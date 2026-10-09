export interface GeneProperty {
  global_score: number;
  max_clinical_stage: string;
  is_in_membrane: boolean;
  is_secreted: boolean;
  has_ligand: boolean;
  has_small_molecule_binder: boolean;
  has_pocket: boolean;
  tissue_specificity: number | null;
  tissue_distribution: number | null;
}

export interface Gene {
  id: number;

  // Source / official symbols
  original_symbol: string | null;
  symbol: string;
  gene_name: string | null;
  previous_symbol: string | null;
  synonyms_aliases: string | null;
  gene_type: string | null;

  // Genomic information
  genomic_location: string | null;
  chromosome: string | null;
  start: number | null;
  end: number | null;
  strand: number | null;
  assembly: string | null;

  // Database identifiers
  ncbi_gene_id: string | null;
  ensembl_gene_id: string | null;
  hgnc_id: string | null;
  uniprot_id: string | null;
  refseq: string | null;
  mane_select: string | null;
  canonical_transcript: string | null;

  // Provenance
  status: string | null;
}

export interface GeneDetails extends Gene {
  properties: GeneProperty[];
}