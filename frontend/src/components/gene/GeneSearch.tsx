import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import GeneService from "../../services/geneService";
import type { Gene } from "../../types/gene";

type GeneSearchProps = {
  onSearch: (keyword: string) => void;
  onClear: () => void;
  onSelect: (symbol: string) => void;
};

export default function GeneSearch({
  onSearch,
  onClear,
  onSelect,
}: GeneSearchProps) {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<Gene[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasText = keyword.trim() !== "";

  useEffect(() => {
    const value = keyword.trim();

    if (!value) {
      setSuggestions([]);
      setShowSuggestions(false);
      setLoadingSuggestions(false);
      return;
    }

    let cancelled = false;

    const timer = window.setTimeout(async () => {
      setLoadingSuggestions(true);

      try {
        const results = await GeneService.search(value);

        if (!cancelled) {
          setSuggestions(results.slice(0, 50));
          setShowSuggestions(true);
        }
      } catch {
        if (!cancelled) {
          setSuggestions([]);
          setShowSuggestions(true);
        }
      } finally {
        if (!cancelled) {
          setLoadingSuggestions(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [keyword]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function handleSearch() {
    setShowSuggestions(false);
    onSearch(keyword.trim());
  }

  function handleSelect(gene: Gene) {
    if (!gene.symbol) return;

    setKeyword(gene.symbol);
    setShowSuggestions(false);
    onSelect(gene.symbol);
  }

  function handleClear() {
    setKeyword("");
    setSuggestions([]);
    setShowSuggestions(false);
    onClear();
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-visible rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
      style={{ fontFamily: "Roboto Slab" }}
    >
      <h2
        className="text-lg font-bold tracking-tight text-slate-900"
        style={{ fontFamily: "Roboto Slab" }}
      >
        Search genes
      </h2>

      <p
        className="mt-1 text-sm text-slate-500"
        style={{ fontFamily: "Roboto Slab" }}
      >
        Find genes by symbol, name or type.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div ref={containerRef} className="relative z-20 flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
            aria-hidden="true"
          />

          <input
            type="text"
            value={keyword}
            onFocus={() => {
              if (keyword.trim()) setShowSuggestions(true);
            }}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              } else if (e.key === "Escape") {
                setShowSuggestions(false);
              }
            }}
            aria-label="Search genes"
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            placeholder="Search by gene symbol, gene name or gene type..."
            autoComplete="off"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-200 hover:border-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            style={{ fontFamily: "Roboto Slab" }}
          />

          {showSuggestions && (
            <div
              className="absolute left-0 right-0 top-full mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg"
              style={{ fontFamily: "Roboto Slab" }}
            >
              {loadingSuggestions ? (
                <p className="px-4 py-3 text-sm text-slate-500">
                  Searching genes...
                </p>
              ) : suggestions.length > 0 ? (
                suggestions.map((gene, index) => (
                  <button
                    key={gene.id || index}
                    type="button"
                    onClick={() => handleSelect(gene)}
                    className="block w-full border-b border-slate-100 px-4 py-3 text-left text-slate-800 transition-colors last:border-b-0 hover:bg-emerald-50"
                    style={{ fontFamily: "Roboto Slab" }}
                  >
                    <span className="block truncate text-sm font-medium">
                      {gene.symbol || "Unnamed gene"}
                    </span>

                    <span className="mt-1 block truncate text-xs text-slate-500">
                      {gene.gene_name || "Name unavailable"}
                      {gene.gene_type ? ` · ${gene.gene_type}` : ""}
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-slate-500">
                  No matching genes found.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:flex-none"
            style={{ fontFamily: "Roboto Slab" }}
          >
            <X size={14} aria-hidden="true" />
            Clear
          </button>

          <div className="relative flex flex-1 sm:flex-none">
            <AnimatePresence>
              {hasText && !reduceMotion && (
                <motion.span
                  key="ready-ring"
                  aria-hidden="true"
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 1.25, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-emerald-500"
                />
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={handleSearch}
              className={`relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:active:scale-100 sm:flex-none ${
                hasText
                  ? "bg-emerald-700 hover:bg-emerald-800"
                  : "bg-emerald-700/70 hover:bg-emerald-700"
              }`}
              style={{ fontFamily: "Roboto Slab" }}
            >
              <Search size={14} aria-hidden="true" />
              Search
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}