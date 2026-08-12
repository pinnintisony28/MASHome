import useTargets from "../../hooks/useTargets";
import TargetSearch from "../../components/target/TargetSearch";
import TargetTable from "../../components/target/TargetTable";
import TargetDetails from "../../components/target/TargetDetails";
import TargetWelcome from "../../components/target/TargetWelcome";
import RelatedDrugs from "../../components/target/RelatedDrugs";
import TargetFilter from "../../components/target/TargetFilter";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Targets() {
  const {
    targets,
    selectedTarget,
    targetDrugs,
    loading,
    error,
    hasSearched,
    selectedType,
    filterByType,
    searchTargets,
    clearSearch,
    selectTarget,
    clearSelection,
  } = useTargets();

  console.log("targetDrugs:", targetDrugs);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Header Section */}
      <div className="mb-6">
        <h1
          className="text-3xl font-light text-slate-900 relative inline-block"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Targets
          <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-emerald-500 rounded-full" />
          <span className="absolute -bottom-2 left-14 w-2 h-0.5 bg-emerald-300 rounded-full" />
        </h1>
        <p className="mt-4 text-sm text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
          Explore therapeutic targets by searching with a Target ID, Gene Name,
          Target Name, Bio Class, or Target Type.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="space-y-4 mb-6">
        <TargetSearch onSearch={searchTargets} onClear={clearSearch} />
        <TargetFilter selectedType={selectedType} onSelect={filterByType} />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
            <p className="text-sm text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
              Loading targets...
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
        <TargetWelcome onQuickSearch={searchTargets} />
      )}

      {/* Results Section */}
      {!loading && !error && hasSearched && (
        <div className="mt-8">
          {/* Results Header */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
              {targets.length} target{targets.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left Column - Table */}
            <div>
              <TargetTable
                targets={targets}
                selectedTargetId={selectedTarget?.target_id}
                onSelect={selectTarget}
              />
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Back Button */}
              {selectedTarget && (
                <button
                  onClick={clearSelection}
                  className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
                  style={{ fontFamily: "Roboto Slab" }}
                >
                  <ArrowLeft 
                    size={16} 
                    className="transition-transform duration-200 group-hover:-translate-x-1" 
                  />
                  <span>Back to Search Results</span>
                </button>
              )}

              {/* Target Details */}
              <TargetDetails target={selectedTarget} />

              {/* Related Drugs */}
              {selectedTarget && (
                <RelatedDrugs drugs={targetDrugs} />
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}