// src/types/clinicalTrial.ts

export interface ClinicalTrial {
  id: number;

  registry: string;
  trial_id: string;

  title: string;
  scientific_title: string;
  acronym: string;

  status: string;
  phase: string;
  study_type: string;
  study_design: string;

  conditions: string;
  interventions: string;

  sponsor: string;
  secondary_sponsor: string;

  enrollment: string;
  gender: string;
  age: string;

  inclusion_criteria: string;
  exclusion_criteria: string;

  primary_outcome: string;
  secondary_outcome: string;

  contact_name: string;
  contact_email: string;
  contact_phone: string;

  ethics_status: string;
  ethics_approval_date: string;

  country: string;

  start_date: string;
  completion_date: string;
  last_update: string;

  results_available: string;
  results_date_posted: string;
  results_summary: string;

  source_name: string;
  url: string;
}

export interface ClinicalTrialListResponse {
  items: ClinicalTrial[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}