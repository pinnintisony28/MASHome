import { useState } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

type BiomarkerSearchProps = {
  onSearch: (keyword: string) => void;
  onClear: () => void;
};

export default function BiomarkerSearch({
  onSearch,
  onClear,
}: BiomarkerSearchProps) {
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
      className="rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="rounded-lg bg-emerald-100 p-1.5">
          {/* <Search size={14} className="text-emerald-600" /> */}
        </div>
        <h2
          className="text-sm font-bold text-slate-800"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Search Biomarkers
        </h2>
        <span className="text-[10px] text-slate-400">|</span>
        <span className="text-[10px] text-slate-400 hidden sm:inline">Find by ID, name, or disease</span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-hover:text-emerald-500"
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
            placeholder="Search by Biomarker ID, Biomarker Name or Disease..."
            className="w-full rounded-lg border border-slate-200/60 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50/50 focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
            style={{ fontFamily: "Roboto Slab" }}
          />
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-emerald-600/20 transition-all duration-200 hover:shadow-md hover:shadow-emerald-600/30 active:scale-95"
            style={{ fontFamily: "Roboto Slab" }}
          >
            {/* <Search size={14} /> */}
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