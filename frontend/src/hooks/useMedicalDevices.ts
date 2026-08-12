import { useEffect, useState } from "react";

import MedicalDeviceService from "../services/medicalDeviceService";

import type { MedicalDevice } from "../types/medicalDevice";

export function useMedicalDevices() {
  const [medicalDevices, setMedicalDevices] = useState<MedicalDevice[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalRecords, setTotalRecords] = useState(0);

  const limit = 25;

  async function loadMedicalDevices(currentPage: number) {
    try {
      setLoading(true);
      setError("");

      const data = await MedicalDeviceService.getAll(
        currentPage,
        limit
      );

      setMedicalDevices(data.items);

      setPage(data.page);

      setTotalPages(data.total_pages);

      setTotalRecords(data.total);
    } catch (err) {
      console.error(err);

      setError("Failed to load medical devices.");

      setMedicalDevices([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMedicalDevices(page);
  }, [page]);

  async function searchMedicalDevices(keyword: string) {
    try {
      setLoading(true);
      setError("");

      if (!keyword.trim()) {
        setPage(1);

        await loadMedicalDevices(1);

        return;
      }

      const data =
        await MedicalDeviceService.search(keyword);

      setMedicalDevices(data);

      setTotalPages(1);

      setTotalRecords(data.length);
    } catch (err) {
      console.error(err);

      setError("Failed to search medical devices.");

      setMedicalDevices([]);
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setPage(1);
    loadMedicalDevices(1);
  }

  return {
    medicalDevices,

    loading,

    error,

    page,

    totalPages,

    totalRecords,

    searchMedicalDevices,

    clearSearch,

    setPage,
  };
}