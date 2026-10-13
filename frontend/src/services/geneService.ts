
import api from "./api";
import type { Gene, GeneDetails } from "../types/gene";

export interface GeneListResponse {
  items: Gene[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

class GeneService {
  async getAll(page = 1, limit = 25): Promise<GeneListResponse> {
    const response = await api.get<GeneListResponse>("/genes/", {
      params: { page, limit },
    });

    return response.data;
  }

  async search(keyword: string): Promise<Gene[]> {
    const response = await api.get<Gene[]>(
      `/genes/search/${encodeURIComponent(keyword)}`
    );

    return response.data;
  }

  async getBySymbol(symbol: string): Promise<Gene> {
    const response = await api.get<Gene>(
      `/genes/${encodeURIComponent(symbol)}`
    );

    return response.data;
  }

  async getDetails(symbol: string): Promise<GeneDetails> {
    const response = await api.get<GeneDetails>(
      `/genes/details/${encodeURIComponent(symbol)}`
    );

    return response.data;
  }
}

export default new GeneService();
