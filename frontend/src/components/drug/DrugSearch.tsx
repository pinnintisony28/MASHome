import { useState } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

type DrugSearchProps = {
  onSearch: (keyword: string) => void;
  onClear: () => void;
};

export default function DrugSearch({ onSearch, onClear }: DrugSearchProps) {
  const [keyword, setKeyword] = useState("");

  function handleSearch() {
    onSearch(keyword);
  }

  function handleClear() {
    setKeyword("");
    onClear();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm"
    >
      <div className="mb-3 flex items-baseline gap-2">
        <h2
          className="text-sm font-bold text-slate-800"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Search Drugs
        </h2>
        <span
          className="hidden text-xs text-slate-400 sm:inline"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Find by name, brand, or category
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="group relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-emerald-500"
            size={15}
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
            placeholder="Search by molecule name, brand, therapeutic category..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
            style={{ fontFamily: "Roboto Slab" }}
          />
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="flex flex-1 items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-emerald-700 sm:flex-none"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Search
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClear}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-800 sm:flex-none"
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