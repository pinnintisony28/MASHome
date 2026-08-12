import type { Biomarker } from "../../types/biomarker";
import { motion } from "framer-motion";

type BiomarkerRowProps = {
  biomarker: Biomarker;
  onSelect: (id: number) => void;
  isSelected: boolean;
};

export default function BiomarkerRow({
  biomarker,
  onSelect,
  isSelected,
}: BiomarkerRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(biomarker.id)}
      className={`group cursor-pointer transition-all duration-150 ${
        isSelected
          ? "bg-emerald-50/80 border-l-2 border-l-emerald-500"
          : "hover:bg-slate-50/80"
      }`}
    >
      <td className="px-4 py-3">
        <span className="text-sm font-semibold text-emerald-700 group-hover:text-emerald-600 transition-colors duration-150" style={{ fontFamily: "Roboto Slab" }}>
          {biomarker.biomarker_id || "—"}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="text-sm text-slate-700" style={{ fontFamily: "Roboto Slab" }}>
          {biomarker.biomarker_name || "—"}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="text-sm text-slate-700" style={{ fontFamily: "Roboto Slab" }}>
          {biomarker.disease_name || "—"}
        </span>
      </td>
    </motion.tr>
  );
}