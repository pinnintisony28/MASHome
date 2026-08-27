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
      {/* Biomarker ID */}

      <td className="px-4 py-3">
        <span
          className="text-sm font-semibold text-emerald-700 transition-colors duration-150 group-hover:text-emerald-600"
          style={{
            fontFamily: "Roboto Slab",
          }}
        >
          {biomarker.biomarker_id || "—"}
        </span>
      </td>

      {/* Biomarker Name */}

      <td className="px-4 py-3">
        <span
          className="text-sm text-slate-700"
          style={{
            fontFamily: "Roboto Slab",
          }}
        >
          {biomarker.biomarker_name || "—"}
        </span>
      </td>

      {/* Category */}

      <td className="px-4 py-3">
        <span
          className={`
            inline-flex
            rounded-full
            px-2.5
            py-1
            text-[11px]
            font-semibold
            ${
              biomarker.category ===
              "Blood & Serum Biomarkers"
                ? "bg-blue-50 text-blue-700"
                : biomarker.category ===
                  "Imaging-Based Biomarkers"
                ? "bg-purple-50 text-purple-700"
                : "bg-slate-100 text-slate-600"
            }
          `}
        >
          {biomarker.category || "—"}
        </span>
      </td>

      {/* Subgroup */}

      <td className="px-4 py-3">
        <span className="text-sm text-slate-600">
          {biomarker.subgroup || "—"}
        </span>
      </td>
    </motion.tr>
  );
}