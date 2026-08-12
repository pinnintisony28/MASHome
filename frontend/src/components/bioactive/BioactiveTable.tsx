import type { Bioactive } from "../../types/bioactive";
import BioactiveRow from "./BioactiveRow";
import { motion } from "framer-motion";

type Props = {
  bioactives: Bioactive[];
  selectedId?: number;
  onSelect: (id: number) => void;
};

export default function BioactiveTable({
  bioactives,
  selectedId,
  onSelect,
}: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/60 px-5 py-3.5 bg-gradient-to-r from-slate-50/50 to-white flex-shrink-0">
        <div>
          <h2
            className="text-base font-bold text-slate-800"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Search Results
          </h2>
          <p className="text-xs text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
            {bioactives.length} bioactive{bioactives.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-slate-400">Live</span>
        </div>
      </div>

      {/* Table - Takes all remaining space */}
      <div className="flex-1 overflow-auto scrollbar-hide min-h-[200px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <table className="min-w-full">
          <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-sm">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
                Plant
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
                Compound
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
                Formula
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {bioactives.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="py-12 text-center text-sm text-slate-500"
                  style={{ fontFamily: "Roboto Slab" }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span>No bioactives found</span>
                    <span className="text-xs text-slate-400">Try adjusting your search</span>
                  </div>
                </td>
              </tr>
            ) : (
              bioactives.map((item) => (
                <BioactiveRow
                  key={item.bioactive_id}
                  bioactive={item}
                  onSelect={onSelect}
                  isSelected={selectedId === item.bioactive_id}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}