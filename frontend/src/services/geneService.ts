import api from "./api";
import type { Gene, GeneDetails } from "../types/gene";

class GeneService {
  async getAll(): Promise<Gene[]> {
    const response = await api.get("/genes/");
    return response.data;
  }

  async search(keyword: string): Promise<Gene[]> {
    const response = await api.get(`/genes/search/${keyword}`);
    return response.data;
  }

  async getBySymbol(symbol: string): Promise<Gene> {
    const response = await api.get(`/genes/${symbol}`);
    return response.data;
  }

  async getDetails(symbol: string): Promise<GeneDetails> {
    const response = await api.get(`/genes/details/${symbol}`);
    return response.data;
  }
}

export default new GeneService();