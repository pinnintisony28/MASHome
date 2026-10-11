import { useEffect } from "react";
import useTargets from "../../hooks/useTargets";
import TargetSearch from "../../components/target/TargetSearch";
import TargetTable from "../../components/target/TargetTable";
import TargetDetails from "../../components/target/TargetDetails";
import TargetWelcome from "../../components/target/TargetWelcome";
import RelatedDrugs from "../../components/target/RelatedDrugs";
import TargetFilter from "../../components/target/TargetFilter";
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

  const showDetails = !!selectedTarget;

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
        <h1
          className="text-3xl font-light text-slate-900 relative inline-block"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Targets
          <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-emerald-500 rounded-full" />
          <span className="absolute -bottom-2 left-14 w-2 h-0.5 bg-emerald-300 rounded-full" />
        </h1>
        {!showDetails && (
          <p
            className="mt-4 text-sm text-slate-500"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Explore therapeutic targets by searching with a Target ID, Gene Name,
            Target Name, Bio Class, or Target Type.
          </p>
        )}
      </div>

      {/* Search and Filter Section (hidden on the details page) */}
      {!showDetails && (
        <div className="space-y-4 mb-6">
          <TargetSearch onSearch={searchTargets} onClear={clearSearch} />
          <TargetFilter selectedType={selectedType} onSelect={filterByType} />
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
              Loading targets...
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
        <TargetWelcome onQuickSearch={searchTargets} />
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
              className="mt-8 space-y-6"
            >
              <TargetDetails target={selectedTarget} onBack={clearSelection} />
              <RelatedDrugs drugs={targetDrugs} />
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
                  {targets.length} target{targets.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <TargetTable
  targets={targets}
  onSelect={selectTarget}
/>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}