import { useEffect, useState } from "react";

import AssociatedDiseaseService from "../services/associatedDiseaseService";

import type { AssociatedDisease } from "../types/associatedDisease";

export function useAssociatedDiseases() {
  const [associatedDiseases, setAssociatedDiseases] =
    useState<AssociatedDisease[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalRecords, setTotalRecords] = useState(0);

  const limit = 25;

  async function loadAssociatedDiseases(
    currentPage: number
  ) {
    try {
      setLoading(true);
      setError("");

      const data =
        await AssociatedDiseaseService.getAll(
          currentPage,
          limit
        );

      setAssociatedDiseases(data.items);

      setPage(data.page);

      setTotalPages(data.total_pages);

      setTotalRecords(data.total);
    } catch (err) {
      console.error(err);

      setError(
        "Failed to load associated diseases."
      );

      setAssociatedDiseases([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAssociatedDiseases(page);
  }, [page]);

  async function searchAssociatedDiseases(
    keyword: string
  ) {
    try {
      setLoading(true);
      setError("");

      if (!keyword.trim()) {
        setPage(1);

        await loadAssociatedDiseases(1);

        return;
      }

      const data =
        await AssociatedDiseaseService.search(
          keyword
        );

      setAssociatedDiseases(data);

      setTotalPages(1);

      setTotalRecords(data.length);
    } catch (err) {
      console.error(err);

      setError(
        "Failed to search associated diseases."
      );

      setAssociatedDiseases([]);
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setPage(1);
    loadAssociatedDiseases(1);
  }

  return {
    associatedDiseases,

    loading,

    error,

    page,

    totalPages,

    totalRecords,

    searchAssociatedDiseases,

    clearSearch,

    setPage,
  };
}