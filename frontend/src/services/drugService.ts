import api from "./api";
import type { Drug } from "../types/drug";

class DrugService {
  async getAll(): Promise<Drug[]> {
    const response = await api.get("/drugs/");
    return response.data;
  }

  async getById(id: number): Promise<Drug> {
    const response = await api.get(`/drugs/${id}`);
    return response.data;
  }

  async search(keyword: string): Promise<Drug[]> {
    const response = await api.get(`/drugs/search/${keyword}`);
    return response.data;
  }
}

export default new DrugService();