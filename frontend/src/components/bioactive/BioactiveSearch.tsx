import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import BioactiveService from "../../services/bioactiveService";
import type { Bioactive } from "../../types/bioactive";

type Props = {
  onSearch: (keyword: string) => void;
  onClear: () => void;
  onSelect: (bioactive: Bioactive) => void;
};

export default function BioactiveSearch({
  onSearch,
  onClear,
  onSelect,
}: Props) {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<Bioactive[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const value = keyword.trim();

    if (!value) {
      setSuggestions([]);
      setShowSuggestions(false);
      setSuggestionsLoading(false);
      return;
    }

    let cancelled = false;

    const timer = window.setTimeout(async () => {
      try {
        setSuggestionsLoading(true);

        const results = await BioactiveService.search(value);

        if (!cancelled) {
          setSuggestions(results.slice(0, 50));
          setShowSuggestions(true);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load bioactive suggestions:", error);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } finally {
        if (!cancelled) {
          setSuggestionsLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [keyword]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSearch = () => {
    setShowSuggestions(false);
    onSearch(keyword.trim());
  };

  const handleClear = () => {
    setKeyword("");
    setSuggestions([]);
    setShowSuggestions(false);
    onClear();
  };

  const handleSelect = (bioactive: Bioactive) => {
    setKeyword(bioactive.bioactive_name);
    setShowSuggestions(false);
    onSelect(bioactive);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="rounded-lg bg-emerald-100 p-1.5" />

        <h2
          className="text-sm font-bold text-slate-800"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Search Bioactives
        </h2>

        <span className="text-[10px] text-slate-400">|</span>

        <span className="hidden text-[10px] text-slate-400 sm:inline">
          Find by plant, compound, or group
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div ref={wrapperRef} className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400"
            size={15}
          />

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => {
              if (keyword.trim()) setShowSuggestions(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }

              if (e.key === "Escape") {
                setShowSuggestions(false);
              }
            }}
            placeholder="Search by Plant, Compound, Group..."
            autoComplete="off"
            className="w-full rounded-lg border border-slate-200/60 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 hover:bg-slate-50/50 focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
            style={{ fontFamily: "Roboto Slab" }}
          />

          {showSuggestions && keyword.trim() && (
            <div
              className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg"
              style={{ fontFamily: "Roboto Slab" }}
            >
              {suggestionsLoading ? (
                <p className="px-3 py-3 text-sm text-slate-500">
                  Loading suggestions...
                </p>
              ) : suggestions.length > 0 ? (
                suggestions.map((bioactive) => (
                  <button
                    key={bioactive.bioactive_id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(bioactive)}
                    className="block w-full border-b border-slate-100 px-3 py-2.5 text-left transition-colors last:border-b-0 hover:bg-emerald-50"
                  >
                    <p className="text-sm font-normal text-slate-800">
                      {bioactive.bioactive_name}
                    </p>

                    {bioactive.plants?.length > 0 && (
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        Plant:{" "}
                        {bioactive.plants
                          .map((plant) => plant.plant_name)
                          .join(", ")}
                      </p>
                    )}

                    {bioactive.family && (
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        Family: {bioactive.family}
                      </p>
                    )}
                  </button>
                ))
              ) : (
                <p className="px-3 py-3 text-sm text-slate-500">
                  No matching bioactives found.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-emerald-600/20 transition-all duration-200 hover:shadow-md hover:shadow-emerald-600/30 active:scale-95"
            style={{ fontFamily: "Roboto Slab" }}
          >
            <span>Search</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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