import api from "./api";
import type {
  ClinicalTrial,
  ClinicalTrialListResponse,
} from "../types/clinicalTrial";
import type {
  TerminatedTrial,
  TerminatedTrialListResponse,
} from "../types/terminatedTrial";
class ClinicalTrialService {
  async getAll(
    page: number = 1,
    limit: number = 25
  ): Promise<ClinicalTrialListResponse> {
    const response = await api.get("/clinical-trials/", {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  }

  async search(keyword: string): Promise<ClinicalTrial[]> {
    const response = await api.get(
      `/clinical-trials/search/${encodeURIComponent(keyword)}`
    );

    return response.data;
  }

  async getById(trialId: string): Promise<ClinicalTrial> {
    const response = await api.get(
      `/clinical-trials/${encodeURIComponent(trialId)}`
    );

    return response.data;
  }
  async getTerminated(
  page: number = 1,
  limit: number = 25
): Promise<TerminatedTrialListResponse> {
  const response = await api.get("/terminated-trials/", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
}
async getAllTerminated(): Promise<TerminatedTrial[]> {
  const allTrials: TerminatedTrial[] = [];

  const limit = 100;

  let page = 1;
  let totalPages = 1;

  do {
    const response = await api.get("/terminated-trials/", {
      params: {
        page,
        limit,
      },
    });

    allTrials.push(...(response.data.items || []));

    totalPages = response.data.total_pages;
    page++;
  } while (page <= totalPages);

  return allTrials;
}
}

export default new ClinicalTrialService();