import api from "./api";
import type { Biomarker } from "../types/biomarker";

class BiomarkerService {
  // =====================================================
  // GET ALL BIOMARKERS
  // =====================================================

  async getAll(): Promise<Biomarker[]> {
    const response =
      await api.get("/biomarkers/");

    return response.data;
  }


  // =====================================================
  // SEARCH BIOMARKERS
  // =====================================================

  async search(
    keyword: string
  ): Promise<Biomarker[]> {
    const response =
      await api.get(
        `/biomarkers/search/${encodeURIComponent(
          keyword.trim()
        )}`
      );

    return response.data;
  }


  // =====================================================
  // GET BIOMARKER BY ID
  // =====================================================

  async getById(
    id: number
  ): Promise<Biomarker> {
    const response =
      await api.get(
        `/biomarkers/${id}`
      );

    return response.data;
  }
}

export default new BiomarkerService();