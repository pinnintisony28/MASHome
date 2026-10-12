
import api from "./api";

export interface Publication {
  id: string;
  source: string | null;
  title: string | null;
  author_string: string | null;
  journal: string | null;
  publication_date: string | null;
  doi: string | null;
  pmid: string | null;
  abstract: string | null;
  is_open_access: boolean;
  article_url: string | null;
}

export interface PublicationSearchResponse {
  query: string;
  page: number;
  page_size: number;
  total_results: number;
  results: Publication[];
}

const publicationService = {
  async search(
    query: string = "MASLD",
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PublicationSearchResponse> {
    const response = await api.get<PublicationSearchResponse>(
      "/publications/search",
      {
        params: {
          query,
          page,
          page_size: pageSize,
        },
      },
    );

    return response.data;
  },
};

export default publicationService;
