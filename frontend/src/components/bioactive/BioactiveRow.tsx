import type { Bioactive } from "../../types/bioactive";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
type Props = {
  bioactive: Bioactive;
  onSelect: (id: number) => void;
  isSelected: boolean;
};
export default function BioactiveRow({
  bioactive,
  onSelect,
  isSelected,
}: Props) {
  const navigate = useNavigate();

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    onClick={() => {
  navigate(`/bioactives/${bioactive.bioactive_id}`);
}}
      className={`group cursor-pointer transition-all duration-150 ${
        isSelected
          ? "bg-emerald-50/80 border-l-2 border-l-emerald-500"
          : "hover:bg-slate-50/80"
      }`}
    >
      <td className="px-4 py-3">
 {bioactive.plants.length > 0 ? (
  <>
    {bioactive.plants[0].plant_name}
    {bioactive.plants.length > 1 && (
      <span className="text-xs text-slate-500">
        {" "}
        +{bioactive.plants.length - 1} more
      </span>
    )}
  </>
) : (
  "—"
)}
</td>

<td className="px-4 py-3">
  <span
    className="text-sm text-slate-700"
    style={{ fontFamily: "Roboto Slab" }}
  >
    {bioactive.bioactive_name || "—"}
  </span>
</td>

<td className="px-4 py-3">
  <span
    className="text-sm text-slate-600"
    style={{ fontFamily: "Roboto Slab" }}
  >
    {bioactive.molecular_formula || "—"}
  </span>
</td>
    </motion.tr>
  );
}