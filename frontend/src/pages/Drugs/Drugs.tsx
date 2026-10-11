import { useEffect } from "react";
import useDrugs from "../../hooks/useDrugs";
import DrugSearch from "../../components/drug/DrugSearch";
import DrugTable from "../../components/drug/DrugTable";
import DrugDetails from "../../components/drug/DrugDetails";
import DrugWelcome from "../../components/drug/DrugWelcome";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Drugs() {
  const {
    drugs,
    selectedDrug,
    loading,
    error,
    hasSearched,
    searchDrugs,
    selectDrug,
    clearSearch,
    clearSelection,
  } = useDrugs();

  const showDetails = !!selectedDrug;

  // Start at the top whenever we switch between table and details
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [showDetails]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1
              className="text-3xl font-light text-slate-900 relative inline-block"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Therapeutic Drugs
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-emerald-500 rounded-full" />
              <span className="absolute -bottom-2 left-14 w-2 h-0.5 bg-emerald-300 rounded-full" />
            </h1>
            {!showDetails && (
              <p
                className="mt-4 text-sm text-slate-500"
                style={{ fontFamily: "Roboto Slab" }}
              >
                Explore approved drugs, therapeutic categories, dosage forms,
                administration routes, and detailed drug descriptions.
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-400">Database</span>
          </div>
        </div>
      </div>

      {/* Search Section (hidden on the details page) */}
      {!showDetails && (
        <div className="mb-6">
          <DrugSearch onSearch={searchDrugs} onClear={clearSearch} />
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
            <p
              className="text-sm text-slate-500"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Loading drugs...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4">
          <p
            className="text-sm text-red-600"
            style={{ fontFamily: "Roboto Slab" }}
          >
            {error}
          </p>
        </div>
      )}

      {/* Welcome State */}
      {!loading && !error && !hasSearched && (
        <DrugWelcome onQuickSearch={searchDrugs} />
      )}

      {/* Results / Details: one view at a time */}
      {!loading && !error && hasSearched && (
        <>
          {showDetails ? (
            /* ---------- Details "page" ---------- */
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 space-y-4"
            >
              <button
                onClick={clearSelection}
                className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
                style={{ fontFamily: "Roboto Slab" }}
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                />
                <span>Back to table</span>
              </button>

              <DrugDetails drug={selectedDrug} />
            </motion.div>
          ) : (
            /* ---------- Table view ---------- */
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <div className="mb-4 flex items-center justify-between">
                <p
                  className="text-sm text-slate-500"
                  style={{ fontFamily: "Roboto Slab" }}
                >
                  {drugs.length} drug{drugs.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <div className="h-[calc(100vh-380px)] min-h-[400px]">
                <DrugTable drugs={drugs} onSelect={selectDrug} />
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}