// src/hooks/useClinicalTrials.ts

import { useEffect, useState } from "react";
import ClinicalTrialService from "../services/clinicalTrialService";
import type {
  ClinicalTrial,
  ClinicalTrialListResponse,
} from "../types/clinicalTrial";

export const useClinicalTrials = () => {
  const [clinicalTrials, setClinicalTrials] = useState<ClinicalTrial[]>([]);
  const [selectedTrial, setSelectedTrial] =
    useState<ClinicalTrial | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(25);

  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [hasSearched, setHasSearched] = useState(false);

  // -------------------------
  // Load All Clinical Trials
  // -------------------------
  const loadTrials = async (currentPage = 1) => {
    try {
      setLoading(true);
      setError("");

      const data: ClinicalTrialListResponse =
        await ClinicalTrialService.getAll(currentPage, limit);

      setClinicalTrials(data.items);
      setPage(data.page);
      setTotalPages(data.total_pages);
      setTotalRecords(data.total);
    } catch (err) {
      console.error(err);
      setError("Failed to load clinical trials.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Search
  // -------------------------
  const searchTrials = async (keyword: string) => {
    if (!keyword.trim()) {
      clearSearch();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const results = await ClinicalTrialService.search(keyword);

      setClinicalTrials(results);
      setSelectedTrial(null);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setError("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Select Trial
  // -------------------------
  const selectTrial = async (trialId: string) => {
    try {
      setLoading(true);

      const data = await ClinicalTrialService.getById(trialId);

      setSelectedTrial(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load clinical trial.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Clear Search
  // -------------------------
  const clearSearch = async () => {
    setHasSearched(false);
    setSelectedTrial(null);

    await loadTrials(1);
  };

  // -------------------------
  // Clear Selection
  // -------------------------
  const clearSelection = () => {
    setSelectedTrial(null);
  };

  useEffect(() => {
    loadTrials(1);
  }, []);

  return {
    clinicalTrials,
    selectedTrial,

    loading,
    error,

    page,
    limit,
    totalPages,
    totalRecords,

    hasSearched,

    loadTrials,
    searchTrials,
    selectTrial,
    clearSearch,
    clearSelection,

    setPage,
  };
};