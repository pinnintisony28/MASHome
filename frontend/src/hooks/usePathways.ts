import { useCallback, useEffect, useState } from "react";
import PathwayService from "../services/PathwayService";
import type {
  Pathway,
  PathwayDetails,
} from "../services/PathwayService";

export default function usePathways() {
  const [pathways, setPathways] = useState<Pathway[]>([]);
  const [selectedPathway, setSelectedPathway] =
    useState<PathwayDetails | null>(null);

  const [categories, setCategories] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [error, setError] = useState<string | null>(
    null
  );

  const [page, setPage] = useState(1);
  const [limit] = useState(25);

  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const [hasSearched, setHasSearched] =
    useState(false);

  // =========================================================
  // LOAD PATHWAYS
  // =========================================================

  const loadPathways = useCallback(
    async (currentPage = page) => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await PathwayService.getAll(
            currentPage,
            limit
          );

        setPathways(data.items);
        setTotalPages(data.total_pages);
        setTotalRecords(data.total);
        setPage(data.page);
        setHasSearched(false);
      } catch (err) {
        console.error(
          "Failed to load pathways:",
          err
        );

        setError(
          "Failed to load pathways."
        );
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  // =========================================================
  // LOAD CATEGORIES
  // =========================================================

  const loadCategories =
    useCallback(async () => {
      try {
        const data =
          await PathwayService.getCategories();

        setCategories(data);
      } catch (err) {
        console.error(
          "Failed to load pathway categories:",
          err
        );
      }
    }, []);

  // =========================================================
  // SELECT PATHWAY
  // =========================================================

  const selectPathway =
    useCallback(
      async (pathway: Pathway) => {
        try {
          setDetailsLoading(true);
          setError(null);

          const details =
            await PathwayService.getById(
              pathway.id
            );

          setSelectedPathway(
            details
          );
        } catch (err) {
          console.error(
            "Failed to load pathway details:",
            err
          );

          setError(
            "Failed to load pathway details."
          );
        } finally {
          setDetailsLoading(false);
        }
      },
      []
    );

  // =========================================================
  // SEARCH
  // =========================================================

  const searchPathways =
    useCallback(
      async (keyword: string) => {
        const value =
          keyword.trim();

        if (!value) {
          await loadPathways(1);
          return;
        }

        try {
          setLoading(true);
          setError(null);

          const data =
            await PathwayService.search(
              value
            );

          setPathways(data);
          setPage(1);
          setTotalPages(1);
          setTotalRecords(
            data.length
          );
          setHasSearched(true);
        } catch (err) {
          console.error(
            "Failed to search pathways:",
            err
          );

          setError(
            "Failed to search pathways."
          );
        } finally {
          setLoading(false);
        }
      },
      [loadPathways]
    );

  // =========================================================
  // CATEGORY FILTER
  // =========================================================

  const filterByCategory =
    useCallback(
      async (category: string) => {
        if (!category) {
          await loadPathways(1);
          return;
        }

        try {
          setLoading(true);
          setError(null);

          const data =
            await PathwayService.getByCategory(
              category
            );

          setPathways(data);
          setPage(1);
          setTotalPages(1);
          setTotalRecords(
            data.length
          );
          setHasSearched(true);
        } catch (err) {
          console.error(
            "Failed to filter pathways:",
            err
          );

          setError(
            "Failed to filter pathways."
          );
        } finally {
          setLoading(false);
        }
      },
      [loadPathways]
    );

  // =========================================================
  // CLEAR SELECTION
  // =========================================================

  const clearSelection =
    useCallback(() => {
      setSelectedPathway(null);
      setError(null);
    }, []);

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadPathways(1);
    loadCategories();
  }, []);

  return {
    pathways,
    selectedPathway,

    categories,

    loading,
    detailsLoading,
    error,

    page,
    limit,
    totalPages,
    totalRecords,

    hasSearched,

    loadPathways,
    selectPathway,
    searchPathways,
    filterByCategory,
    clearSelection,

    setPage,
  };
}