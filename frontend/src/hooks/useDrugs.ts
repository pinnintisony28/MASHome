
import { useEffect, useState } from "react";
import DrugService from "../services/drugService";
import type { Drug } from "../types/drug";

export default function useDrugs() {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(true);

  // Automatically load all drugs when the page opens.
  useEffect(() => {
    async function loadDrugs() {
      try {
        setLoading(true);
        setError("");

        const data = await DrugService.getAll();
        setDrugs(data);
      } catch (err) {
        console.error("Failed to load drugs:", err);
        setError("Failed to load drugs.");
        setDrugs([]);
      } finally {
        setLoading(false);
      }
    }

    void loadDrugs();
  }, []);

  async function searchDrugs(keyword: string) {
    try {
      setLoading(true);
      setError("");
      setHasSearched(true);
      setSelectedDrug(null);

      if (!keyword.trim()) {
        const data = await DrugService.getAll();
        setDrugs(data);
        return;
      }

      const data = await DrugService.search(keyword.trim());
      setDrugs(data);
    } catch (err) {
      console.error("Failed to search drugs:", err);
      setError("Failed to search drugs.");
      setDrugs([]);
    } finally {
      setLoading(false);
    }
  }

  async function selectDrug(id: number) {
    try {
      setLoading(true);
      setError("");

      const data = await DrugService.getById(id);
      setSelectedDrug(data);
    } catch (err) {
      console.error("Unable to load drug details:", err);
      setError("Unable to load drug details.");
    } finally {
      setLoading(false);
    }
  }

  function clearSelection() {
    setSelectedDrug(null);
  }

  function clearSearch() {
    void searchDrugs("");
  }

  return {
    drugs,
    selectedDrug,
    loading,
    error,
    hasSearched,
    searchDrugs,
    selectDrug,
    clearSearch,
    clearSelection,
  };
}
