export interface Biomarker {
  id: number;

  biomarker_id: string;
  biomarker_name: string;

  category: string;
  subgroup: string | null;

  normal_range: string | null;
  clinical_significance: string | null;
  description: string | null;

  source_sheet: string;
}