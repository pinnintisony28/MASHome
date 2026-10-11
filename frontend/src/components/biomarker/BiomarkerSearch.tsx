
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import BiomarkerService from "../../services/biomarkerService";
import type { Biomarker } from "../../types/biomarker";

type BiomarkerSearchProps = {
  onSearch: (keyword: string) => void;
  onClear: () => void;
  onSelect: (biomarker: Biomarker) => void;
};

export default function BiomarkerSearch({
  onSearch,
  onClear,
  onSelect,
}: BiomarkerSearchProps) {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<Biomarker[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
        const results = await BiomarkerService.search(value);

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

  function handleSelect(biomarker: Biomarker) {
    setKeyword(biomarker.biomarker_name);
    setShowSuggestions(false);
    onSelect(biomarker);
  }

  function handleClear() {
    setKeyword("");
    setSuggestions([]);
    setShowSuggestions(false);
    onClear();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
      style={{ fontFamily: "Roboto Slab" }}
    >
      <div className="mb-3 flex items-center gap-2">
        <h2
          className="text-sm font-bold text-slate-800"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Search Biomarkers
        </h2>
        <span className="text-[10px] text-slate-400">|</span>
        <span className="hidden text-[10px] text-slate-400 sm:inline">
          Find by ID, name, or disease
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div ref={containerRef} className="relative z-20 flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={15}
          />

          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => {
              if (keyword.trim()) setShowSuggestions(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              } else if (e.key === "Escape") {
                setShowSuggestions(false);
              }
            }}
            placeholder="Search by Biomarker ID, Biomarker Name or Disease..."
            autoComplete="off"
            aria-label="Search biomarkers"
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            className="w-full rounded-lg border border-slate-200/60 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50/50 focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
            style={{ fontFamily: "Roboto Slab" }}
          />

          {showSuggestions && (
            <div
              className="absolute left-0 right-0 top-full mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl"
              style={{ fontFamily: "Roboto Slab" }}
            >
              {loadingSuggestions ? (
                <p className="px-4 py-3 text-sm text-slate-500">
                  Searching biomarkers...
                </p>
              ) : suggestions.length > 0 ? (
                suggestions.map((biomarker) => (
                  <button
                    key={biomarker.id}
                    type="button"
                    onClick={() => handleSelect(biomarker)}
                    className="block w-full border-b border-slate-100 px-4 py-3 text-left text-slate-800 transition-colors last:border-b-0 hover:bg-emerald-50"
                    style={{ fontFamily: "Roboto Slab" }}
                  >
                    <span className="block truncate text-sm font-medium">
                      {biomarker.biomarker_name}
                    </span>
                    <span className="mt-1 block truncate text-xs text-slate-500">
                      {biomarker.biomarker_id}
                      {biomarker.category
                        ? ` · ${biomarker.category}`
                        : ""}
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-slate-500">
                  No matching biomarkers found.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleSearch}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-emerald-600/20 transition-all duration-200 hover:shadow-md hover:shadow-emerald-600/30 active:scale-95"
            style={{ fontFamily: "Roboto Slab" }}
          >
            <span>Search</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200/60 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 active:scale-95"
            style={{ fontFamily: "Roboto Slab" }}
          >
            <X size={14} />
            <span>Clear</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
