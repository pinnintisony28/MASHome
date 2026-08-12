import api from "./api";

import type { Bioactive } from "../types/bioactive";
import type { BioactiveADME } from "../types/bioactiveAdme";
import type { BioactiveToxicity } from "../types/bioactiveToxicity";

export interface BioactiveProfile {
  overview: Bioactive;
  adme: BioactiveADME | null;
  toxicity: BioactiveToxicity[];
}

class BioactiveProfileService {
  async getOverview(id: number): Promise<Bioactive> {
    const response = await api.get(`/bioactives/${id}`);
    return response.data;
  }

  async getADME(id: number): Promise<BioactiveADME | null> {
    try {
      const response = await api.get(`/bioactive-adme/bioactive/${id}`);
      return response.data;
    } catch (error) {
      console.error("ADME Error:", error);
      return null;
    }
  }

  async getToxicity(id: number): Promise<BioactiveToxicity[]> {
    try {
      const response = await api.get(`/bioactive-toxicity/bioactive/${id}`);
      return response.data;
    } catch (error) {
      console.error("Toxicity Error:", error);
      return [];
    }
  }

  async getProfile(id: number): Promise<BioactiveProfile> {
    const [overview, adme, toxicity] = await Promise.all([
      this.getOverview(id),
      this.getADME(id),
      this.getToxicity(id),
    ]);

    return {
      overview,
      adme,
      toxicity,
    };
  }
}

export default new BioactiveProfileService();