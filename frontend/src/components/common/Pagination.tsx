import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  totalPages: number;
  totalRecords: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function Pagination({
  page,
  totalPages,
  totalRecords,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mt-4 flex items-center justify-between rounded-xl border border-slate-200/60 bg-white px-4 py-3 shadow-sm"
    >
      {/* Left - Previous Button */}
      <button
        onClick={onPrevious}
        disabled={page === 1}
        className="group flex items-center gap-1.5 rounded-lg border border-slate-200/60 px-3.5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        style={{ fontFamily: "Roboto Slab" }}
      >
        <ChevronLeft 
          size={16} 
          className="transition-transform duration-200 group-hover:-translate-x-0.5 disabled:group-hover:translate-x-0" 
        />
        <span>Previous</span>
      </button>

      {/* Center - Page Info */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">Page</span>
          <span className="min-w-[24px] text-center text-sm font-bold text-emerald-600" style={{ fontFamily: "Roboto Slab" }}>
            {page}
          </span>
          <span className="text-xs font-medium text-slate-400">of</span>
          <span className="min-w-[24px] text-center text-sm font-medium text-slate-600" style={{ fontFamily: "Roboto Slab" }}>
            {totalPages}
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-1.5">
          <div className="h-1 w-4 rounded-full bg-emerald-200">
            <div 
              className="h-1 rounded-full bg-emerald-500 transition-all duration-300" 
              style={{ width: `${(page / totalPages) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400">
            {totalRecords} total
          </span>
        </div>
      </div>

      {/* Right - Next Button */}
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="group flex items-center gap-1.5 rounded-lg border border-slate-200/60 px-3.5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        style={{ fontFamily: "Roboto Slab" }}
      >
        <span>Next</span>
        <ChevronRight 
          size={16} 
          className="transition-transform duration-200 group-hover:translate-x-0.5 disabled:group-hover:translate-x-0" 
        />
      </button>
    </motion.div>
  );
}