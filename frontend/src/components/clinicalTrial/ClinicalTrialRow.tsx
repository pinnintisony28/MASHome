import type { ClinicalTrial } from "../../types/clinicalTrial";
import { motion } from "framer-motion";

type Props = {
  trial: ClinicalTrial;
  onSelect: (trialId: string) => void;
  isSelected: boolean;
};

export default function ClinicalTrialRow({
  trial,
  onSelect,
  isSelected,
}: Props) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(trial.trial_id)}
      className={`group cursor-pointer transition-all duration-150 ${
        isSelected
          ? "bg-emerald-50 border-l-4 border-l-emerald-500"
          : "hover:bg-slate-50"
      }`}
    >
      <td className="px-4 py-3">
        <span
          className="font-semibold text-emerald-700"
          style={{ fontFamily: "Roboto Slab" }}
        >
          {trial.trial_id}
        </span>
      </td>

      <td className="px-4 py-3 max-w-sm">
        <p
          className="truncate text-slate-700"
          style={{ fontFamily: "Roboto Slab" }}
          title={trial.title}
        >
          {trial.title}
        </p>
      </td>

      <td className="px-4 py-3">
        {trial.registry || "—"}
      </td>

      <td className="px-4 py-3">
        {trial.status || "—"}
      </td>

      <td className="px-4 py-3">
        {trial.study_type || "—"}
      </td>

      <td className="px-4 py-3 text-center">
        {trial.enrollment || "—"}
      </td>
    </motion.tr>
  );
}