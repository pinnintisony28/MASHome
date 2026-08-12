import { useState } from "react";
import BioactiveService from "../services/bioactiveService";
import BioactiveProfileService from "../services/bioactiveProfileService";
import type { BioactiveProfile } from "../services/bioactiveProfileService";
import type { Bioactive } from "../types/bioactive";

export default function useBioactives() {
  const [bioactives, setBioactives] = useState<Bioactive[]>([]);
  const [selectedBioactive, setSelectedBioactive] =
    useState<Bioactive | null>(null);

  // NEW: Complete Bioactive Profile
  const [profile, setProfile] = useState<BioactiveProfile | null>(null);

  const [relatedBioactives, setRelatedBioactives] = useState<Bioactive[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function searchBioactives(keyword: string) {
    try {
      setLoading(true);
      setError("");
      setHasSearched(true);

      if (!keyword.trim()) {
        setBioactives([]);
        setSelectedBioactive(null);
        setProfile(null);
        setRelatedBioactives([]);
        return;
      }

      const data = await BioactiveService.search(keyword);



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
  async function selectBioactive(id: number) {
  try {
    setLoading(true);
    setError("");

    const profileData = await BioactiveProfileService.getProfile(id);

    setProfile(profileData);

    // The profile itself is now the selected bioactive
    setSelectedBioactive(profileData.overview);

    // Temporarily disable related bioactives
    setRelatedBioactives([]);
  } catch (err) {
    console.error(err);
    setError("Unable to load bioactive details.");
  } finally {
    setLoading(false);
  }
}
  function clearSelection() {
    setSelectedBioactive(null);
    setProfile(null);
    setRelatedBioactives([]);
  }

  function clearSearch() {
    setBioactives([]);
    setSelectedBioactive(null);
    setProfile(null);
    setRelatedBioactives([]);
    setHasSearched(false);
    setError("");
  }

  return {
    bioactives,

    // Existing
    selectedBioactive,
    relatedBioactives,

    // NEW
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