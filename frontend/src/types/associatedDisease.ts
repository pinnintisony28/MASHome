export interface AssociatedDisease {
  id: number;

  associated_disease: string | null;
  relationship_with_nafld_mash: string | null;
  underlying_reason: string | null;
}

export interface AssociatedDiseaseListResponse {
  items: AssociatedDisease[];

  total: number;
  page: number;
  limit: number;
  total_pages: number;
}