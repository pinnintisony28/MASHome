import api from "./api";
import API_ENDPOINTS from "../constants/apiEndpoints";
import type { Target, TargetListResponse } from "../types/target";
import type { TargetDrug } from "../types/targetDrug";
class TargetService {
  // Get all targets with pagination
  async getAll(page = 1, limit = 25): Promise<TargetListResponse> {
    const response = await api.get<TargetListResponse>(
      API_ENDPOINTS.TARGETS,
      {
        params: {
          page,
          limit,
        },
      }
    );

    return response.data;
  }

  // Search targets
  async search(keyword: string): Promise<Target[]> {
    const response = await api.get<Target[]>(
      `${API_ENDPOINTS.TARGET_SEARCH}/${keyword}`
    );

    return response.data;
  }

  // Get target by ID
  async getById(targetId: string): Promise<Target> {
    const response = await api.get<Target>(
      `${API_ENDPOINTS.TARGETS}/${targetId}`
    );

    return response.data;
  }

  // Get drugs for a target
 async getDrugs(targetId: string): Promise<TargetDrug[]> {
  const response = await api.get<TargetDrug[]>(
    `${API_ENDPOINTS.TARGETS}/${targetId}/drugs`
  );

  return response.data;
}

  // Filter targets by type
  async getByType(targetType: string): Promise<Target[]> {
    const response = await api.get<Target[]>(
      `${API_ENDPOINTS.TARGET_TYPE}/${targetType}`
    );

    return response.data;
  }
}

export default new TargetService();