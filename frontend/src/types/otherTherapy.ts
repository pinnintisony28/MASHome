export type PathwayNode = {
  id: string;
  label: string;
};

export type PathwayEdge = {
  from: string;
  to: string;
};

export type PathwayData = {
  original_text: string;
  nodes: PathwayNode[];
  edges: PathwayEdge[];
};

export type OtherTherapy = {
  id: number;
  source_sheet: string;
  category: string;

  item_name: string | null;
  secondary_name: string | null;

  description: string | null;
  mechanism: string | null;
  effect: string | null;
  outcome: string | null;

  pathway_data: string | null;
};

export type OtherTherapyListResponse = {
  items: OtherTherapy[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};