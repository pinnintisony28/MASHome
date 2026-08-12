import useDrugs from "../../hooks/useDrugs";
import DrugSearch from "../../components/drug/DrugSearch";
import DrugTable from "../../components/drug/DrugTable";
import DrugDetails from "../../components/drug/DrugDetails";
import DrugWelcome from "../../components/drug/DrugWelcome";
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
            <p className="mt-4 text-sm text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
              Explore approved drugs, therapeutic categories, dosage forms,
              administration routes, and detailed drug descriptions.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-400">Database</span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <DrugSearch onSearch={searchDrugs} onClear={clearSearch} />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
            <p className="text-sm text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
              Loading drugs...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4">
          <p className="text-sm text-red-600" style={{ fontFamily: "Roboto Slab" }}>
            {error}
          </p>
        </div>
      )}

      {/* Welcome State */}
      {!loading && !error && !hasSearched && (
        <DrugWelcome onQuickSearch={searchDrugs} />
      )}

      {/* Results Section */}
      {!loading && !error && hasSearched && (
        <div className="mt-8">
          {/* Results Header */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
              {drugs.length} drug{drugs.length !== 1 ? "s" : ""} found
            </p>
            {selectedDrug && (
              <button
                onClick={clearSelection}
                className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors"
                style={{ fontFamily: "Roboto Slab" }}
              >
                Clear selection
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left Column - Drug Table */}
            <div className="h-[calc(100vh-380px)] min-h-[400px]">
              <DrugTable
                drugs={drugs}
                selectedDrugId={selectedDrug?.id}
                onSelect={selectDrug}
              />
            </div>

            {/* Right Column - Drug Details */}
            <div className="h-[calc(100vh-380px)] min-h-[400px]">
              <DrugDetails drug={selectedDrug} />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}