import api from "./api";
import type { Bioactive } from "../types/bioactive";

class BioactiveService {
  async getAll(): Promise<Bioactive[]> {
    const response = await api.get("/bioactives/");
    return response.data;
  }

  async search(keyword: string): Promise<Bioactive[]> {
    const response = await api.get(`/bioactives/search/${keyword}`);
    return response.data;
  }

  async getById(id: number): Promise<Bioactive> {
    const response = await api.get(`/bioactives/${id}`);
    return response.data;
  }

  async getByGroup(group: string): Promise<Bioactive[]> {
    const response = await api.get(`/bioactives/group/${group}`);
    return response.data;
  }
}

export default new BioactiveService();