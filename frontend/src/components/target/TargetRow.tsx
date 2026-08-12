import type { Target } from "../../types/target";
import StatusBadge from "../common/StatusBadge";
import { motion } from "framer-motion";

type TargetRowProps = {
  target: Target;
  onSelect: (targetId: string) => void;
  isSelected: boolean;
};

export default function TargetRow({
  target,
  onSelect,
  isSelected,
}: TargetRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(target.target_id)}
      className={`group cursor-pointer transition-all duration-150 ${
        isSelected
          ? "bg-emerald-50/80 border-l-2 border-l-emerald-500"
          : "hover:bg-slate-50/80"
      }`}
    >
      <td className="px-4 py-3 text-sm">
        <span className={`font-mono text-xs font-medium ${
          isSelected ? "text-emerald-700" : "text-slate-600 group-hover:text-emerald-600"
        } transition-colors duration-150`}>
          {target.target_id}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="text-sm font-medium text-slate-700" style={{ fontFamily: "Roboto Slab" }}>
          {target.gene_name || "—"}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="text-sm text-slate-600" style={{ fontFamily: "Roboto Slab" }}>
          {target.target_name || "—"}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="text-sm text-slate-600" style={{ fontFamily: "Roboto Slab" }}>
          {target.bio_class || "—"}
        </span>
      </td>

      <td className="px-4 py-3">
        <StatusBadge status={target.target_type} />
      </td>
    </motion.tr>
  );
}