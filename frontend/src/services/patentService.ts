import api from "./api";

import type {
  Patent,
  PatentListResponse,
} from "../types/patent";

class PatentService {
  async getAll(
    page: number = 1,
    limit: number = 25
  ): Promise<PatentListResponse> {
    const response = await api.get("/patents/", {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  }
async getById(patentId: number): Promise<Patent> {
  const response = await api.get(
    `/patents/${patentId}`
  );

  return response.data;
}
  async search(keyword: string): Promise<Patent[]> {
    const response = await api.get(
      `/patents/search/${encodeURIComponent(keyword)}`
    );

    return response.data;
  }
}

export default new PatentService();