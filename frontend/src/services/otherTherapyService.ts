import api from "./api";

import type {
  OtherTherapy,
  OtherTherapyListResponse,
} from "../types/otherTherapy";

const OtherTherapyService = {
  async getAll(
    page = 1,
    limit = 25
  ): Promise<OtherTherapyListResponse> {
    const response = await api.get(
      "/other-therapies/",
      {
        params: {
          page,
          limit,
        },
      }
    );

    return response.data;
  },

  async search(
    keyword: string,
    page = 1,
    limit = 25
  ): Promise<OtherTherapyListResponse> {
    const response = await api.get(
      `/other-therapies/search/${encodeURIComponent(
        keyword
      )}`,
      {
        params: {
          page,
          limit,
        },
      }
    );

    return response.data;
  },

  async getByCategory(
    category: string,
    page = 1,
    limit = 25
  ): Promise<OtherTherapyListResponse> {
    const response = await api.get(
      `/other-therapies/category/${encodeURIComponent(
        category
      )}`,
      {
        params: {
          page,
          limit,
        },
      }
    );

    return response.data;
  },
    async getCategories(): Promise<string[]> {
    const response = await api.get(
      "/other-therapies/categories"
    );

    return response.data;
  },

  async getById(
    id: number
  ): Promise<OtherTherapy> {
    const response = await api.get(
      `/other-therapies/${id}`
    );

    return response.data;
  },
};

export default OtherTherapyService;