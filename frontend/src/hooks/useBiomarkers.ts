import { useState } from "react";
import BiomarkerService from "../services/biomarkerService";
import type { Biomarker } from "../types/biomarker";

export default function useBiomarkers() {
  const [biomarkers, setBiomarkers] =
    useState<Biomarker[]>([]);

  const [selectedBiomarker, setSelectedBiomarker] =
    useState<Biomarker | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [hasSearched, setHasSearched] =
    useState(false);


  // =====================================================
  // SEARCH BIOMARKERS
  // =====================================================

  async function searchBiomarkers(
    keyword: string
  ) {
    try {
      setLoading(true);
      setError("");
      setHasSearched(true);

      if (!keyword.trim()) {
        setBiomarkers([]);
        setSelectedBiomarker(null);
        return;
      }

      const data =
        await BiomarkerService.search(
          keyword
        );

      setBiomarkers(data);
      setSelectedBiomarker(null);

    } catch (err) {
      console.error(err);

      setError(
        "Failed to search biomarkers."
      );

      setBiomarkers([]);

    } finally {
      setLoading(false);
    }
  }


  // =====================================================
  // SELECT BIOMARKER
  // =====================================================

  async function selectBiomarker(
    id: number
  ) {
    try {
      setDetailsLoading(true);
      setError("");

      const data =
        await BiomarkerService.getById(
          id
 
        );
        console.log("Selected Biomarker ID:", id);
console.log("Selected Biomarker Data:", data);

      setSelectedBiomarker(data);

    } catch (err) {
      console.error(err);

      setError(
        "Unable to load biomarker details."
      );

    } finally {
      setDetailsLoading(false);
    }
  }


  // =====================================================
  // CLEAR SELECTION
  // =====================================================

  function clearSelection() {
    setSelectedBiomarker(null);
  }


  // =====================================================
  // CLEAR SEARCH
  // =====================================================

  function clearSearch() {
    setBiomarkers([]);
    setSelectedBiomarker(null);
    setHasSearched(false);
    setError("");
  }


  return {
    biomarkers,
    selectedBiomarker,

    loading,
    detailsLoading,

    error,
    hasSearched,

    searchBiomarkers,
    selectBiomarker,

    clearSelection,
    clearSearch,
  };
}