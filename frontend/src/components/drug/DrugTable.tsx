import type { Drug } from "../../types/drug";
import DrugRow from "./DrugRow";
import { motion } from "framer-motion";

type DrugTableProps = {
  drugs: Drug[];
  selectedDrugId?: number;
  onSelect: (id: number) => void;
};

export default function DrugTable({
  drugs,
  selectedDrugId,
  onSelect,
}: DrugTableProps) {
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
            {drugs.length} drug{drugs.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-400">Live</span>
        </div>
      </div>

      {/* Table - Takes all remaining space */}
      <div className="flex-1 overflow-auto scrollbar-hide min-h-[200px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <table className="min-w-full">
          <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-sm">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
                Molecule
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
                Brand
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
                Route
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
                Dosage Form
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
                Category
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {drugs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-sm text-slate-500"
                  style={{ fontFamily: "Roboto Slab" }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span>No drugs found</span>
                    <span className="text-xs text-slate-400">Try adjusting your search</span>
                  </div>
                </td>
              </tr>
            ) : (
              drugs.map((drug) => (
                <DrugRow
                  key={drug.id}
                  drug={drug}
                  onSelect={onSelect}
                  isSelected={selectedDrugId === drug.id}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}