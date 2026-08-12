import api from "./api";
import type { Biomarker } from "../types/biomarker";

class BiomarkerService {
  async getAll(): Promise<Biomarker[]> {
    const response = await api.get("/biomarkers/");
    return response.data;
  }

  async search(keyword: string): Promise<Biomarker[]> {
    const response = await api.get(`/biomarkers/search/${keyword}`);
    return response.data;
  }

  async getById(id: number): Promise<Biomarker> {
    const response = await api.get(`/biomarkers/${id}`);
    return response.data;
  }
}

export default new BiomarkerService();