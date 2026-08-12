import type { Drug } from "../../types/drug";
import { motion } from "framer-motion";

type DrugRowProps = {
  drug: Drug;
  onSelect: (id: number) => void;
  isSelected: boolean;
};

export default function DrugRow({
  drug,
  onSelect,
  isSelected,
}: DrugRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(drug.id)}
      className={`group cursor-pointer transition-all duration-150 ${
        isSelected
          ? "bg-emerald-50/80 border-l-2 border-l-emerald-500"
          : "hover:bg-slate-50/80"
      }`}
    >
      <td className="px-4 py-3">
        <p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors duration-150" style={{ fontFamily: "Roboto Slab" }}>
          {drug.molecule_name || "—"}
        </p>
        <p className="mt-0.5 text-[10px] font-mono text-slate-400">
          #{drug.id}
        </p>
      </td>

      <td className="px-4 py-3">
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-medium text-blue-700 border border-blue-200/50">
          {drug.brand || "—"}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200/50">
          {drug.route || "—"}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-medium text-purple-700 border border-purple-200/50">
          {drug.dosage_form || "—"}
        </span>
      </td>

      <td className="px-4 py-3 max-w-xs">
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed" style={{ fontFamily: "Roboto Slab" }}>
          {drug.therapeutic_category || "—"}
        </p>
      </td>
    </motion.tr>
  );
}