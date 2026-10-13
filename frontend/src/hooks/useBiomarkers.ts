
import { useEffect, useState } from "react";
import BiomarkerService from "../services/biomarkerService";
import type { Biomarker } from "../types/biomarker";

export default function useBiomarkers() {
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  const [selectedBiomarker, setSelectedBiomarker] =
    useState<Biomarker | null>(null);

  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(true);

  // Load all biomarkers automatically when the page opens
  useEffect(() => {
    void loadAllBiomarkers();
  }, []);

  // GET ALL BIOMARKERS
  async function loadAllBiomarkers() {
    try {
      setLoading(true);
      setError("");

      const data = await BiomarkerService.getAll();

      setBiomarkers(data);
      setSelectedBiomarker(null);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setError("Failed to load biomarkers.");
      setBiomarkers([]);
    } finally {
      setLoading(false);
    }
  }

  // SEARCH BIOMARKERS
  async function searchBiomarkers(keyword: string) {
    if (!keyword.trim()) {
      await loadAllBiomarkers();
      return;
    }

    try {
      setLoading(true);
      setError("");
      setHasSearched(true);

      const data = await BiomarkerService.search(keyword);

      setBiomarkers(data);
      setSelectedBiomarker(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search biomarkers.");
      setBiomarkers([]);
    } finally {
      setLoading(false);
    }
  }

  // SELECT BIOMARKER AND LOAD DETAILS
  async function selectBiomarker(id: number) {
    try {
      setDetailsLoading(true);
      setError("");

      const data = await BiomarkerService.getById(id);

      setSelectedBiomarker(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load biomarker details.");
    } finally {
      setDetailsLoading(false);
    }
  }

  // CLEAR SELECTION
  function clearSelection() {
    setSelectedBiomarker(null);
  }

  // CLEAR SEARCH AND RELOAD ALL BIOMARKERS
  async function clearSearch() {
    setSelectedBiomarker(null);
    setError("");
    await loadAllBiomarkers();
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
