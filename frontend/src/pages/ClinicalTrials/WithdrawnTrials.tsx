import { useEffect, useMemo, useState } from "react";
import { ExternalLink, FlaskConical, Search } from "lucide-react";
import { motion } from "framer-motion";

import ClinicalTrialService from "../../services/clinicalTrialService";
import type { TerminatedTrial } from "../../types/terminatedTrial";

export default function WithdrawnTrials() {
  const [trials, setTrials] = useState<TerminatedTrial[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 25;

  useEffect(() => {
    loadWithdrawnTrials();
  }, []);

  async function loadWithdrawnTrials() {
  try {
    setLoading(true);
    setError("");

    const data = await ClinicalTrialService.getAllTerminated();

    setTrials(data);
  } catch (err) {
    console.error(err);
    setError("Failed to load withdrawn clinical trials.");
  } finally {
    setLoading(false);
  }
}
const filteredTrials = useMemo(() => {
  const keyword = search.trim().toLowerCase();

  return trials
    .filter(
      (trial) =>
        trial.study_status?.toUpperCase() === "WITHDRAWN"
    )
    .filter((trial) => {
      if (!keyword) return true;

      return (
        trial.nct_number?.toLowerCase().includes(keyword) ||
        trial.study_title?.toLowerCase().includes(keyword) ||
        trial.conditions?.toLowerCase().includes(keyword) ||
        trial.sponsor?.toLowerCase().includes(keyword) ||
        trial.interventions?.toLowerCase().includes(keyword)
      );
    });
}, [trials, search]);

const totalPages = Math.ceil(
  filteredTrials.length / recordsPerPage
);

const withdrawnTrials = filteredTrials.slice(
  (currentPage - 1) * recordsPerPage,
  currentPage * recordsPerPage
);
 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-100 p-3">
            <FlaskConical
              size={24}
              className="text-amber-700"
            />
          </div>

          <div>
            <h1
              className="text-3xl font-light text-slate-900"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Withdrawn Clinical Trials
            </h1>

            <p
              className="mt-1 text-sm text-slate-500"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Clinical trials that were withdrawn before enrollment.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
}}
            placeholder="Search by NCT number, title, condition, sponsor..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading withdrawn clinical trials...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2
                className="text-lg font-semibold text-slate-800"
                style={{ fontFamily: "Roboto Slab" }}
              >
                Withdrawn Studies
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Showing{" "}
{filteredTrials.length === 0
  ? 0
  : (currentPage - 1) * recordsPerPage + 1}
-
{Math.min(
  currentPage * recordsPerPage,
  filteredTrials.length
)}{" "}
of {filteredTrials.length} studies
              </p>
            </div>

            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
              WITHDRAWN
            </span>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      NCT Number
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Study Title
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Sponsor
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Phase
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Enrollment
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                      Link
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {withdrawnTrials.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center text-sm text-slate-500"
                      >
                        No withdrawn clinical trials found.
                      </td>
                    </tr>
                  ) : (
                    withdrawnTrials.map((trial) => (
                      <tr
                        key={trial.id}
                        className="transition-colors hover:bg-slate-50"
                      >
                        {/* NCT Number */}
                        <td className="whitespace-nowrap px-5 py-4">
                          <span className="font-medium text-amber-700">
                            {trial.nct_number || "—"}
                          </span>
                        </td>

                        {/* Study Title */}
                        <td className="max-w-md px-5 py-4">
                          <p className="text-sm font-medium text-slate-800">
                            {trial.study_title || "—"}
                          </p>

                          {trial.conditions && (
                            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                              {trial.conditions}
                            </p>
                          )}
                        </td>

                        {/* Sponsor */}
                        <td className="max-w-xs px-5 py-4">
                          <p className="text-sm text-slate-700">
                            {trial.sponsor || "—"}
                          </p>
                        </td>

                        {/* Phase */}
                        <td className="whitespace-nowrap px-5 py-4">
                          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                            {trial.phase || "—"}
                          </span>
                        </td>

                        {/* Enrollment */}
                        <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                          {trial.enrollment || "—"}
                        </td>

                        {/* Status */}
                        <td className="whitespace-nowrap px-5 py-4">
                          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">
                            {trial.study_status || "—"}
                          </span>
                        </td>

                        {/* External Link */}
                        <td className="px-5 py-4 text-center">
                          {trial.study_url ? (
                            <a
                              href={trial.study_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600"
                              title="View on ClinicalTrials.gov"
                            >
                              <ExternalLink size={16} />
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination */}
{totalPages > 1 && (
  <div className="mt-5 flex items-center justify-between">
    <p className="text-xs text-slate-500">
      Page {currentPage} of {totalPages}
    </p>

    <div className="flex items-center gap-1">
      <button
        onClick={() =>
          setCurrentPage((page) => Math.max(page - 1, 1))
        }
        disabled={currentPage === 1}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`min-w-9 rounded-lg px-3 py-2 text-xs font-medium transition ${
            currentPage === page
              ? "bg-amber-600 text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() =>
          setCurrentPage((page) =>
            Math.min(page + 1, totalPages)
          )
        }
        disabled={currentPage === totalPages}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  </div>
)}
        </>
      )}
    </motion.div>
  );
}