import { useState } from "react";
import DrugService from "../services/drugService";
import type { Drug } from "../types/drug";

export default function useDrugs() {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function searchDrugs(keyword: string) {
    try {
      setLoading(true);
      setError("");
      setHasSearched(true);

      if (!keyword.trim()) {
        setDrugs([]);
        setSelectedDrug(null);
        return;
      }

      const data = await DrugService.search(keyword);
      setDrugs(data);
      setSelectedDrug(null);
    } catch (err) {
      console.error(err);
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
      console.error(err);
      setError("Unable to load drug details.");
    } finally {
      setLoading(false);
    }
  }
function clearSelection() {
  setSelectedDrug(null);
}
  function clearSearch() {
    setDrugs([]);
    setSelectedDrug(null);
    setHasSearched(false);
    setError("");
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
