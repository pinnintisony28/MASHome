import api from "./api";

import type {
  AssociatedDisease,
  AssociatedDiseaseListResponse,
} from "../types/associatedDisease";

class AssociatedDiseaseService {
  async getAll(
    page: number = 1,
    limit: number = 25
  ): Promise<AssociatedDiseaseListResponse> {
    const response = await api.get(
      "/associated-diseases/",
      {
        params: {
          page,
          limit,
        },
      }
    );

    return response.data;
  }

  async search(
    keyword: string
  ): Promise<AssociatedDisease[]> {
    const response = await api.get(
      `/associated-diseases/search/${encodeURIComponent(
        keyword
      )}`
    );

    return response.data;
  }

  async getById(
    diseaseId: number
  ): Promise<AssociatedDisease> {
    const response = await api.get(
      `/associated-diseases/${diseaseId}`
    );

    return response.data;
  }
}

export default new AssociatedDiseaseService();