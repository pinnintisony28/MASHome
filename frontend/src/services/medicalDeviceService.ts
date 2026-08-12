import api from "./api";

import type {
  MedicalDevice,
  MedicalDeviceListResponse,
} from "../types/medicalDevice";

class MedicalDeviceService {
  async getAll(
    page: number = 1,
    limit: number = 25
  ): Promise<MedicalDeviceListResponse> {
    const response = await api.get("/medical-devices/", {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  }

  async search(keyword: string): Promise<MedicalDevice[]> {
    const response = await api.get(
      `/medical-devices/search/${encodeURIComponent(keyword)}`
    );

    return response.data;
  }

  async getById(deviceId: number): Promise<MedicalDevice> {
    const response = await api.get(
      `/medical-devices/${deviceId}`
    );

    return response.data;
  }
}

export default new MedicalDeviceService();