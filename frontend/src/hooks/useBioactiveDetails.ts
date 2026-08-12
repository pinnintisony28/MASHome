import { useEffect, useState } from "react";
import BioactiveProfileService from "../services/bioactiveProfileService";
import type { BioactiveProfile } from "../services/bioactiveProfileService";

export default function useBioactiveDetails(id: number) {
  const [profile, setProfile] = useState<BioactiveProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const data = await BioactiveProfileService.getProfile(id);

        setProfile(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load bioactive.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      load();
    }
  }, [id]);

  return {
    profile,
    loading,
    error,
  };
}