import axios from "axios";

const API_BASE_URL = "https://backend-production-31fe.up.railway.app";

export interface Pathway {
  id: number;
  pathway_id: string;
  pathway_name: string;
  category?: string | null;
  super_category?: string | null;
  disease?: string | null;
  disease_stages?: string | null;
  cellular_location?: string | null;
  major_cell_types?: string | null;
  primary_function?: string | null;
  clinical_importance?: string | null;
  druggable?: boolean | null;
  pathway_status?: string | null;
  canonical_databases?: string | null;
  source_sheet: string;
}

export interface PathwayDetails
  extends Pathway {
  pathway_data?: Record<string, unknown> | null;
}

export interface PathwayListResponse {
  items: Pathway[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

const PathwayService = {
  getAll: async (
    page = 1,
    limit = 25
  ): Promise<PathwayListResponse> => {
    const response =
      await axios.get<PathwayListResponse>(
        `${API_BASE_URL}/pathways/`,
        {
          params: {
            page,
            limit,
          },
        }
      );

    return response.data;
  },

  getById: async (
    id: number
  ): Promise<PathwayDetails> => {
    const response =
      await axios.get<PathwayDetails>(
        `${API_BASE_URL}/pathways/${id}`
      );

    return response.data;
  },

  getByCode: async (
    pathwayId: string
  ): Promise<PathwayDetails> => {
    const response =
      await axios.get<PathwayDetails>(
        `${API_BASE_URL}/pathways/code/${encodeURIComponent(
          pathwayId
        )}`
      );

    return response.data;
  },

  search: async (
    keyword: string
  ): Promise<Pathway[]> => {
    const response =
      await axios.get<Pathway[]>(
        `${API_BASE_URL}/pathways/search/${encodeURIComponent(
          keyword
        )}`
      );

    return response.data;
  },

  getCategories: async (): Promise<
    string[]
  > => {
    const response =
      await axios.get<string[]>(
        `${API_BASE_URL}/pathways/categories`
      );

    return response.data;
  },

  getSuperCategories: async (): Promise<
    string[]
  > => {
    const response =
      await axios.get<string[]>(
        `${API_BASE_URL}/pathways/super-categories`
      );

    return response.data;
  },

  getByCategory: async (
    category: string
  ): Promise<Pathway[]> => {
    const response =
      await axios.get<Pathway[]>(
        `${API_BASE_URL}/pathways/category/${encodeURIComponent(
          category
        )}`
      );

    return response.data;
  },
};

export default PathwayService;
