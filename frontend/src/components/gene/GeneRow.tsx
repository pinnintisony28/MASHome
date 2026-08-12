import type { Gene } from "../../types/gene";
import { motion } from "framer-motion";

type GeneRowProps = {
  gene: Gene;
  onSelect: (symbol: string) => void;
  isSelected: boolean;
};

export default function GeneRow({
  gene,
  onSelect,
  isSelected,
}: GeneRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(gene.symbol)}
      className={`group cursor-pointer transition-all duration-150 ${
        isSelected
          ? "bg-emerald-50/80 border-l-2 border-l-emerald-500"
          : "hover:bg-slate-50/80"
      }`}
    >
      <td className="px-4 py-3">
        <span className="text-sm font-semibold text-emerald-700 group-hover:text-emerald-600 transition-colors duration-150" style={{ fontFamily: "Roboto Slab" }}>
          {gene.symbol || "—"}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="text-sm text-slate-700" style={{ fontFamily: "Roboto Slab" }}>
          {gene.gene_name || "—"}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-medium text-blue-700 border border-blue-200/50">
          {gene.gene_type || "—"}
        </span>
      </td>
    </motion.tr>
  );
}