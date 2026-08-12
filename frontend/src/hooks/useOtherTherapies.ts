import { useCallback, useEffect, useState } from "react";

import OtherTherapyService from "../services/otherTherapyService";

import type { OtherTherapy } from "../types/otherTherapy";

export function useOtherTherapies() {
  const [therapies, setTherapies] = useState<OtherTherapy[]>(
    []
  );

  const [categories, setCategories] = useState<string[]>(
    []
  );

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const [totalRecords, setTotalRecords] = useState(0);

  // -----------------------------------------
  // Load therapy categories
  // -----------------------------------------

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data =
          await OtherTherapyService.getCategories();

        setCategories(data);
      } catch (err) {
        console.error(err);

        setError(
          "Failed to load therapy categories."
        );
      }
    };

    fetchCategories();
  }, []);

  // -----------------------------------------
  // Load therapies
  // -----------------------------------------

  const fetchTherapies = useCallback(
    async (
      currentPage: number,
      category: string
    ) => {
      try {
        setLoading(true);
        setError(null);

        const data = category
          ? await OtherTherapyService.getByCategory(
              category,
              currentPage,
              25
            )
          : await OtherTherapyService.getAll(
              currentPage,
              25
            );

        setTherapies(data.items);
        setTotalPages(data.total_pages);
        setTotalRecords(data.total);
      } catch (err) {
        console.error(err);

        setError(
          "Failed to load other therapies."
        );

        setTherapies([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // -----------------------------------------
  // Reload when page/category changes
  // -----------------------------------------

  useEffect(() => {
    fetchTherapies(
      page,
      selectedCategory
    );
  }, [
    page,
    selectedCategory,
    fetchTherapies,
  ]);

  // -----------------------------------------
  // Select category
  // -----------------------------------------

  const selectCategory = (
    category: string
  ) => {
    setPage(1);
    setSelectedCategory(category);
  };

  return {
    therapies,

    categories,
    selectedCategory,

    loading,
    error,

    totalRecords,
    page,
    totalPages,

    selectCategory,
    setPage,
  };
}