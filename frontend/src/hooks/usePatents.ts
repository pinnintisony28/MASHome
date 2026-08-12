import { useEffect, useState } from "react";

import PatentService from "../services/patentService";

import type { Patent } from "../types/patent";


export function usePatents() {
  const [patents, setPatents] = useState<Patent[]>([]);

  const [selectedPatent, setSelectedPatent] =
    useState<Patent | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [hasSearched, setHasSearched] = useState(false);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalRecords, setTotalRecords] = useState(0);

  const limit = 25;


  async function loadPatents(currentPage: number) {
    try {
      setLoading(true);
      setError("");

      const data = await PatentService.getAll(
        currentPage,
        limit
      );

      setPatents(data.items);

      setPage(data.page);

      setTotalPages(data.total_pages);

      setTotalRecords(data.total);

    } catch (err) {
      console.error(err);

      setError("Failed to load patents.");

      setPatents([]);

    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadPatents(page);
  }, [page]);


  async function searchPatents(keyword: string) {
    try {
      setLoading(true);
      setError("");

      setHasSearched(true);

      if (!keyword.trim()) {
        setHasSearched(false);
        setPage(1);

        await loadPatents(1);

        return;
      }

      const data = await PatentService.search(keyword);

      setPatents(data);

      setSelectedPatent(null);

      setTotalPages(1);

      setTotalRecords(data.length);

    } catch (err) {
      console.error(err);

      setError("Failed to search patents.");

      setPatents([]);

    } finally {
      setLoading(false);
    }
  }


  function selectPatent(patent: Patent) {
    setSelectedPatent(patent);
  }


  function clearSelection() {
    setSelectedPatent(null);
  }


  function clearSearch() {
    setHasSearched(false);
    setSelectedPatent(null);
    setPage(1);

    loadPatents(1);
  }


  return {
    patents,

    selectedPatent,

    loading,

    error,

    hasSearched,

    page,

    totalPages,

    totalRecords,

    searchPatents,

    selectPatent,

    clearSelection,

    clearSearch,

    setPage,
  };
}