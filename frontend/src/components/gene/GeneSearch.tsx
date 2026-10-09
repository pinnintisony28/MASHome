import { useState } from "react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type GeneSearchProps = {
  onSearch: (keyword: string) => void;
  onClear: () => void;
};

export default function GeneSearch({ onSearch, onClear }: GeneSearchProps) {
  const [keyword, setKeyword] = useState("");
  const reduceMotion = useReducedMotion();

  const hasText = keyword.trim() !== "";

  function handleSearch() {
    onSearch(keyword);
  }

  function handleClear() {
    setKeyword("");
    onClear();
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl bg-emerald-900 p-6 shadow-lg shadow-emerald-950/10 sm:p-7"
      style={{ fontFamily: "Roboto Slab" }}
    >
      {/* Soft depth, no motion */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-teal-400/10"
      />

      <div className="relative">
        {/* Heading */}
        <h2
          className="text-lg font-bold tracking-tight text-white"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Search genes
        </h2>
        <p
          className="mt-1 text-sm text-emerald-100/80"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Find genes by symbol, name or type.
        </p>

        {/* Search row */}
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-200/70"
              size={20}
              aria-hidden="true"
            />

            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              aria-label="Search genes"
              placeholder="Search by gene symbol, gene name or gene type..."
              className="w-full rounded-t-lg border-0 border-b-2 border-emerald-700 bg-transparent py-3 pl-11 pr-3 text-base text-white placeholder:text-emerald-200/70 transition-colors duration-200 hover:border-emerald-500 focus:border-teal-300 focus:bg-white/5 focus:outline-none"
              style={{ fontFamily: "Roboto Slab" }}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-emerald-50 transition-colors duration-150 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 sm:flex-none"
              style={{ fontFamily: "Roboto Slab" }}
            >
              <X size={14} aria-hidden="true" />
              Clear
            </button>

            <div className="relative flex flex-1 sm:flex-none">
              {/* One-time ring when the search becomes ready */}
              <AnimatePresence>
                {hasText && !reduceMotion && (
                  <motion.span
                    key="ready-ring"
                    aria-hidden="true"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 1.25, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-teal-300"
                  />
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={handleSearch}
                className={`relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 active:scale-[0.98] motion-reduce:active:scale-100 sm:flex-none ${
                  hasText
                    ? "bg-white text-emerald-900 hover:bg-emerald-50"
                    : "bg-white/90 text-emerald-900/90 hover:bg-white"
                }`}
                style={{ fontFamily: "Roboto Slab" }}
              >
                <Search size={14} aria-hidden="true" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}