
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import TargetService from "../../services/targetService";
import type { Target } from "../../types/target";

type TargetSearchProps = {
  onSearch: (keyword: string) => void;
  onClear: () => void;
};

export default function TargetSearch({
  onSearch,
  onClear,
}: TargetSearchProps) {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<Target[]>([]);
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
        const results = await TargetService.search(value);

        if (!cancelled) {
          setSuggestions(results.slice(0, 50));
          setShowSuggestions(true);
        }
      } catch (error) {
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch(keyword.trim());
  };

  const handleSelect = (target: Target) => {
    const value = target.target_name || target.gene_name || target.target_id;
    setKeyword(value);
    setShowSuggestions(false);
    onSearch(value);
  };

  const handleClear = () => {
    setKeyword("");
    setSuggestions([]);
    setShowSuggestions(false);
    onClear();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSearch}
      className="mb-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div ref={containerRef} className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-4 z-10 text-slate-400"
          />

          <input
            type="text"
            value={keyword}
            onFocus={() => {
              if (keyword.trim()) setShowSuggestions(true);
            }}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by Target ID, Gene Name, Target Name..."
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            className="w-full rounded-lg border border-slate-200/60 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 hover:border-slate-300"
            style={{ fontFamily: "Roboto Slab" }}
          />

          {showSuggestions && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl"  style={{ fontFamily: "Roboto Slab" }}>
              {loadingSuggestions ? (
                <p className="px-4 py-3 text-sm text-slate-500">
                  Searching targets...
                </p>
              ) : suggestions.length > 0 ? (
                suggestions.map((target, index) => (
                  <button
                    key={target.target_id || index}
                    type="button"
                    onClick={() => handleSelect(target)}
                    className="flex w-full items-start border-b border-slate-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-emerald-50"
                  >
                    

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-800">
                        {target.target_name || "Unnamed target"}
                      </span>
                      <span className="mt-1 block truncate text-xs text-slate-500">
                        {target.gene_name || "No gene"} ·{" "}
                        {target.target_id || "No ID"}
                        {target.bio_class ? ` · ${target.bio_class}` : ""}
                      </span>
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-slate-500">
                  No matching targets found.
                </p>
              )}
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
          style={{ fontFamily: "Roboto Slab" }}
        >
          <Search size={18} />
          <span>Search</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleClear}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-200/60 bg-white px-6 py-3 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50"
          style={{ fontFamily: "Roboto Slab" }}
        >
          <X size={18} />
          <span>Clear</span>
        </motion.button>
      </div>
    </motion.form>
  );
}
