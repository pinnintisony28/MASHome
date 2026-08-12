import { useState } from "react";
import GeneService from "../services/geneService";
import type { Gene, GeneDetails } from "../types/gene";

export default function useGenes() {
  const [genes, setGenes] = useState<Gene[]>([]);
  const [selectedGene, setSelectedGene] =
    useState<GeneDetails | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function searchGenes(keyword: string) {
    try {
      setLoading(true);
      setError("");
      setHasSearched(true);

      if (!keyword.trim()) {
        setGenes([]);
        setSelectedGene(null);
        return;
      }

      const data = await GeneService.search(keyword);

      setGenes(data);
      setSelectedGene(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search genes.");
      setGenes([]);
    } finally {
      setLoading(false);
    }
  }

  async function selectGene(symbol: string) {
    try {
      setLoading(true);
      setError("");

      const data = await GeneService.getDetails(symbol);

      setSelectedGene(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load gene details.");
    } finally {
      setLoading(false);
    }
  }

  function clearSelection() {
    setSelectedGene(null);
  }

  function clearSearch() {
    setGenes([]);
    setSelectedGene(null);
    setHasSearched(false);
    setError("");
  }
//   function clearSelection() {
//   setSelectedGene(null);
// }

  return {
    genes,
    selectedGene,
    loading,
    error,
    hasSearched,

    searchGenes,
    selectGene,
    clearSelection,
    clearSearch,
  };
}