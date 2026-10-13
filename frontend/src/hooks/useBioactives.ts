
import { useEffect, useState } from "react";
import BioactiveService from "../services/bioactiveService";
import BioactiveProfileService from "../services/bioactiveProfileService";
import type { BioactiveProfile } from "../services/bioactiveProfileService";
import type { Bioactive } from "../types/bioactive";

export default function useBioactives() {
  const [bioactives, setBioactives] = useState<Bioactive[]>([]);
  const [selectedBioactive, setSelectedBioactive] =
    useState<Bioactive | null>(null);

  const [profile, setProfile] = useState<BioactiveProfile | null>(null);
  const [relatedBioactives, setRelatedBioactives] = useState<Bioactive[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(true);

  // Load all bioactives when the page opens
  useEffect(() => {
    void loadAllBioactives();
  }, []);

  async function loadAllBioactives() {
    try {
      setLoading(true);
      setError("");

      const data = await BioactiveService.getAll();

      setBioactives(data);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setError("Failed to load bioactives.");
      setBioactives([]);
    } finally {
      setLoading(false);
    }
  }

  // Search bioactives
  async function searchBioactives(keyword: string) {
    if (!keyword.trim()) {
      await loadAllBioactives();
      return;
    }

    try {
      setLoading(true);
      setError("");
      setHasSearched(true);

      const data = await BioactiveService.search(keyword.trim());

      setBioactives(data);
      setSelectedBioactive(null);
      setProfile(null);
      setRelatedBioactives([]);
    } catch (err) {
      console.error(err);
      setError("Failed to search bioactives.");
      setBioactives([]);
    } finally {
      setLoading(false);
    }
  }

  // Load the selected bioactive profile
  async function selectBioactive(id: number) {
    try {
      setLoading(true);
      setError("");

      const profileData = await BioactiveProfileService.getProfile(id);

      setProfile(profileData);
      setSelectedBioactive(profileData.overview);
      setRelatedBioactives([]);
    } catch (err) {
      console.error(err);
      setError("Unable to load bioactive details.");
    } finally {
      setLoading(false);
    }
  }

  // Clear selected bioactive
  function clearSelection() {
    setSelectedBioactive(null);
    setProfile(null);
    setRelatedBioactives([]);
  }

  // Clear search and show all records again
  async function clearSearch() {
    setSelectedBioactive(null);
    setProfile(null);
    setRelatedBioactives([]);
    await loadAllBioactives();
  }

  return {
    bioactives,
    selectedBioactive,
    relatedBioactives,
    profile,
    loading,
    error,
    hasSearched,
    searchBioactives,
    selectBioactive,
    clearSelection,
    clearSearch,
  };
}
