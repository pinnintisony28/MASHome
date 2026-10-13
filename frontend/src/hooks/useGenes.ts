
import { useEffect, useState } from "react";
import GeneService from "../services/geneService";
import type { Gene, GeneDetails } from "../types/gene";
function getGeneCompleteness(gene: Gene): number {
  return Object.values(gene).filter((value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string" && value.trim() === "") return false;
    return true;
  }).length;
}
export default function useGenes() {
  const [genes, setGenes] = useState<Gene[]>([]);
  const [selectedGene, setSelectedGene] = useState<GeneDetails | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGenes, setTotalGenes] = useState(0);

  useEffect(() => {
    void loadGenes(1);
  }, []);

  async function loadGenes(pageNumber = 1) {
    try {
      setLoading(true);
      setError("");

      const response = await GeneService.getAll(pageNumber, 25);

     setGenes(
  [...response.items].sort(
    (a, b) => getGeneCompleteness(b) - getGeneCompleteness(a)
  )
);
      setPage(response.page);
      setTotalPages(response.total_pages);
      setTotalGenes(response.total);
      setHasSearched(true);
      setSelectedGene(null);
    } catch (err) {
      console.error("Failed to load genes:", err);
      setError("Failed to load genes.");
      setGenes([]);
    } finally {
      setLoading(false);
    }
  }

  async function searchGenes(keyword: string) {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      await loadGenes(1);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setHasSearched(true);
      setSelectedGene(null);

      const data = await GeneService.search(trimmedKeyword);

      setGenes(
  [...data].sort(
    (a, b) => getGeneCompleteness(b) - getGeneCompleteness(a)
  )
);
      setPage(1);
      setTotalPages(1);
      setTotalGenes(data.length);
    } catch (err) {
      console.error("Failed to search genes:", err);
      setError("Failed to search genes.");
      setGenes([]);
      setTotalGenes(0);
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
      console.error("Unable to load gene details:", err);
      setError("Unable to load gene details.");
    } finally {
      setLoading(false);
    }
  }

  function clearSelection() {
    setSelectedGene(null);
  }

  function clearSearch() {
    setSelectedGene(null);
    void loadGenes(1);
  }

  return {
    genes,
    selectedGene,
    loading,
    error,
    hasSearched,
    page,
    totalPages,
    totalGenes,
    loadGenes,
    searchGenes,
    selectGene,
    clearSelection,
    clearSearch,
  };
}
