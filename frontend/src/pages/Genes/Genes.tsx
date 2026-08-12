import useGenes from "../../hooks/useGenes";
import GeneSearch from "../../components/gene/GeneSearch";
import GeneTable from "../../components/gene/GeneTable";
import GeneDetails from "../../components/gene/GeneDetails";
import GeneWelcome from "../../components/gene/GeneWelcome";
import { motion } from "framer-motion";
import { Dna, Sparkles } from "lucide-react";

export default function Genes() {
 const {
  genes,
  selectedGene,
  loading,
  error,
  hasSearched,
  searchGenes,
  selectGene,
  clearSelection,
  clearSearch,
} = useGenes();

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
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-gradient-to-br from-emerald-00 to-teal-00 p-2 shadow-lg shadow-emerald-500/20">
                {/* <Dna size={20} className="text-white" /> */}
              </div>
              <h1
                className="text-3xl font-light text-slate-900 relative inline-block"
                style={{ fontFamily: "Roboto Slab" }}
              >
                Genes
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-emerald-500 rounded-full" />
                <span className="absolute -bottom-2 left-14 w-2 h-0.5 bg-emerald-300 rounded-full" />
              </h1>
            </div>
            <p className="mt-3 text-sm text-slate-500 pl-11" style={{ fontFamily: "Roboto Slab" }}>
              Explore genes, biological properties, therapeutic relevance and molecular characteristics.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-400">Database</span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <GeneSearch onSearch={searchGenes} onClear={clearSearch} />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Dna size={16} className="text-emerald-600 animate-pulse" />
              </div>
            </div>
            <p className="text-sm text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
              Loading genes...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-xl border border-red-200 bg-red-50 px-6 py-4"
        >
          <p className="text-sm text-red-600" style={{ fontFamily: "Roboto Slab" }}>
            {error}
          </p>
        </motion.div>
      )}

      {/* Welcome State */}
      {!loading && !error && !hasSearched && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GeneWelcome onQuickSearch={searchGenes} />
        </motion.div>
      )}

      {/* Results Section */}
      {!loading && !error && hasSearched && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8"
        >
          {/* Results Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700" style={{ fontFamily: "Roboto Slab" }}>
                  {genes.length} gene{genes.length !== 1 ? "s" : ""} found
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Sparkles size={10} className="text-emerald-400" />
                  Ready to explore
                </span>
              </div>
            </div>
            {selectedGene && (
              <button
                onClick={clearSelection}
                className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors hover:underline"
                style={{ fontFamily: "Roboto Slab" }}
              >
                Clear selection
              </button>
            )}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left Column - Gene Table */}
            <div className="h-[calc(100vh-400px)] min-h-[400px]">
              <GeneTable
                genes={genes}
                selectedSymbol={selectedGene?.symbol}
                onSelect={selectGene}
              />
            </div>

            {/* Right Column - Gene Details */}
            <div className="h-[calc(100vh-400px)] min-h-[400px]">
              <GeneDetails gene={selectedGene} />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}