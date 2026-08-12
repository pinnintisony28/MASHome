import { useEffect, useState } from "react";
import DashboardService from "../services/dashboardService";
import type { DashboardStats } from "../types/dashboard";

export default function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await DashboardService.getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  return {
    stats,
    loading,
    error,
  };
}