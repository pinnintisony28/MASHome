import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";

import { useAssociatedDiseases } from "../../hooks/useAssociatedDiseases";

import AssociatedDiseaseSearch from "../../components/associatedDisease/AssociatedDiseaseSearch";
import AssociatedDiseaseTable from "../../components/associatedDisease/AssociatedDiseaseTable";

export default function AssociatedDiseases() {
  const {
    associatedDiseases,
    loading,
    error,
    totalRecords,
    page,
    totalPages,
    searchAssociatedDiseases,
    clearSearch,
    setPage,
  } = useAssociatedDiseases();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
            <HeartPulse
              size={22}
              className="text-emerald-600"
            />
          </div>

          <div>
            <h1
              className="text-3xl font-light text-slate-900"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Associated Diseases
            </h1>

            <p
              className="mt-1 text-sm text-slate-500"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Explore diseases associated with
              NAFLD/MASH and their underlying reasons.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <AssociatedDiseaseSearch
          onSearch={searchAssociatedDiseases}
          onClear={clearSearch}
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />

            <p className="text-sm text-slate-500">
              Loading associated diseases...
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Results Header */}
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-700">
              Showing{" "}
              {associatedDiseases.length > 0
                ? (page - 1) * 25 + 1
                : 0}
              -
              {Math.min(
                page * 25,
                totalRecords
              )}{" "}
              of {totalRecords.toLocaleString()} associated diseases
            </p>
          </div>

          {/* Table */}
          <div className="h-[calc(100vh-320px)] min-h-[450px]">
            <AssociatedDiseaseTable
              associatedDiseases={associatedDiseases}
            />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Page {page} of {totalPages}
              </p>

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setPage(Math.max(page - 1, 1))
                  }
                  disabled={page === 1}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from(
                  {
                    length: Math.min(
                      totalPages,
                      7
                    ),
                  },
                  (_, index) => {
                    let pageNumber = index + 1;

                    if (
                      totalPages > 7 &&
                      page > 4
                    ) {
                      pageNumber =
                        page - 3 + index;

                      if (
                        pageNumber >
                        totalPages
                      ) {
                        pageNumber =
                          totalPages - 6 + index;
                      }
                    }

                    return pageNumber;
                  }
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() =>
                      setPage(pageNumber)
                    }
                    className={`min-w-9 rounded-lg px-3 py-2 text-xs font-medium ${
                      page === pageNumber
                        ? "bg-emerald-600 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setPage(
                      Math.min(
                        page + 1,
                        totalPages
                      )
                    )
                  }
                  disabled={
                    page === totalPages
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}