export interface TerminatedTrial {
  id: number;
  nct_number?: string;
  study_title?: string;
  study_url?: string;
  study_status?: string;
  reason?: string;
  conditions?: string;
  interventions?: string;
  sponsor?: string;
  collaborators?: string;
  phase?: string;
  enrollment?: string;
  study_type?: string;
  other_ids?: string;
}

export interface TerminatedTrialListResponse {
  items: TerminatedTrial[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}