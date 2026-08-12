import api from "./api";
import API_ENDPOINTS from "../constants/apiEndpoints";
import type { DashboardStats } from "../types/dashboard";

class DashboardService {
  async getStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>(
      API_ENDPOINTS.DASHBOARD
    );

    return response.data;
  }
}

export default new DashboardService();