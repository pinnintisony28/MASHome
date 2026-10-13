
import { useEffect, useState } from "react";
import TargetService from "../services/targetService";
import type { Target } from "../types/target";
import type { TargetDrug } from "../types/targetDrug";

export default function useTargets() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [targetDrugs, setTargetDrugs] = useState<TargetDrug[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(true);

  // Load targets automatically when the page opens.
  useEffect(() => {
    void loadTargets();
  }, []);

  async function loadTargets() {
    try {
      setLoading(true);
      setError("");

      const response = await TargetService.getAll(1, 25);
      setTargets(response.items);
    } catch (err) {
      console.error("Failed to load targets:", err);
      setError("Failed to load targets.");
      setTargets([]);
    } finally {
      setLoading(false);
    }
  }

  async function searchTargets(keyword: string) {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      await loadTargets();
      return;
    }

    try {
      setLoading(true);
      setError("");
      setHasSearched(true);
      setSelectedTarget(null);
      setTargetDrugs([]);

      const data = await TargetService.search(trimmedKeyword);
      setTargets(data);
    } catch (err) {
      console.error("Failed to search targets:", err);
      setError("Failed to search targets.");
      setTargets([]);
    } finally {
      setLoading(false);
    }
  }

  async function selectTarget(targetId: string) {
    try {
      setLoading(true);
      setError("");

      const data = await TargetService.getById(targetId);
      setSelectedTarget(data);

      const drugs = await TargetService.getDrugs(targetId);
      setTargetDrugs(drugs);
    } catch (err) {
      console.error("Unable to load target details:", err);
      setError("Unable to load target details.");
    } finally {
      setLoading(false);
    }
  }

  function clearSelection() {
    setSelectedTarget(null);
    setTargetDrugs([]);
  }

  function clearSearch() {
    setSelectedTarget(null);
    setTargetDrugs([]);
    void loadTargets();
  }

  return {
    targets,
    selectedTarget,
    targetDrugs,
    loading,
    error,
    hasSearched,
    searchTargets,
    selectTarget,
    clearSelection,
    clearSearch,
  };
}
