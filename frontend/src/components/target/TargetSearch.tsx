import { useState } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

type TargetSearchProps = {
  onSearch: (keyword: string) => void;
  onClear: () => void;
};

export default function TargetSearch({
  onSearch,
  onClear,
}: TargetSearchProps) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword);
  };

  const handleClear = () => {
    setKeyword("");
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
        {/* Search Input */}
        <div className="relative flex-1">
          <Search 
            size={18} 
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-emerald-500" 
          />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by Target ID, Gene Name, Target Name..."
            className="w-full rounded-lg border border-slate-200/60 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400/20 hover:border-slate-300"
            style={{ fontFamily: "Roboto Slab" }}
          />
        </div>

        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-medium text-white shadow-sm shadow-emerald-600/20 transition-all duration-200 hover:shadow-md hover:shadow-emerald-600/30 active:scale-95"
          style={{ fontFamily: "Roboto Slab" }}
        >
          <Search size={18} />
          <span>Search</span>
        </motion.button>

        {/* Clear Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleClear}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-200/60 bg-white px-6 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 active:scale-95"
          style={{ fontFamily: "Roboto Slab" }}
        >
          <X size={18} />
          <span>Clear</span>
        </motion.button>
      </div>
    </motion.form>
  );
}