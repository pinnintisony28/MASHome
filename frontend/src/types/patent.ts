export interface Patent {
  id: number;

  application_id: string | null;
  application_url: string | null;

  application_number: string | null;
  application_date: string | null;

  country: string | null;

  title: string | null;

  ipc: string | null;
}

export interface PatentListResponse {
  items: Patent[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}