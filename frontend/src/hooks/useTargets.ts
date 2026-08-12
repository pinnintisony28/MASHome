import { useState } from "react";
import TargetService from "../services/targetService";
import type { Target } from "../types/target";
import type { TargetDrug } from "../types/targetDrug";

export default function useTargets() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [targetDrugs, setTargetDrugs] = useState<TargetDrug[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  async function searchTargets(keyword: string) {
    try {
      setLoading(true);
      setError("");
      setHasSearched(true);

      if (!keyword.trim()) {
        setTargets([]);
        return;
      }

      const data = await TargetService.search(keyword);
      setTargets(data);
    } catch (err) {
      console.error(err);
      setError("Failed to search targets.");
      setTargets([]);
    } finally {
      setLoading(false);
    }
  }
  async function filterByType(type: string) {
  try {
    setLoading(true);
    setError("");
    setSelectedType(type);
    setHasSearched(true);

    if (type === "All") {
      setTargets([]);
      return;
    }

    const data = await TargetService.getByType(type);
    setTargets(data);
  } catch (err) {
    console.error(err);
    setError("Failed to filter targets.");
  } finally {
    setLoading(false);
  }
}

  async function selectTarget(targetId: string) {
    try {
      const data = await TargetService.getById(targetId);
      setSelectedTarget(data);
      const drugs = await TargetService.getDrugs(targetId);
setTargetDrugs(drugs);
    } catch (err) {
      console.error(err);
      setError("Unable to load target details.");
    }
  }
function clearSelection() {
  setSelectedTarget(null);
}
function clearSearch() {
  setTargets([]);
  setSelectedTarget(null);
  setTargetDrugs([]);
  setHasSearched(false);
  setSelectedType("All");
  setError("");
}
  return {
    targets,
    selectedTarget,
    loading,
    error,
    hasSearched,
    searchTargets,
    selectTarget,
    clearSelection,
    targetDrugs,
    selectedType,
filterByType,
clearSearch,
  };
}
