import type { TargetDrug } from "../../types/targetDrug";
import { motion } from "framer-motion";
import { Pill } from "lucide-react";

type RelatedDrugsProps = {
  drugs: TargetDrug[];
};

export default function RelatedDrugs({
  drugs,
}: RelatedDrugsProps) {
  if (drugs.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-slate-100 p-1.5">
            <Pill size={14} className="text-slate-400" />
          </div>
          <div>
            <h3
              className="text-xs font-semibold text-slate-600"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Related Drugs
            </h3>
            <p className="text-[10px] text-slate-400" style={{ fontFamily: "Roboto Slab" }}>
              No related drugs found
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-slate-200/60 bg-white shadow-sm overflow-hidden"
    >
      {/* Header - Compact */}
      <div className="flex items-center justify-between border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white px-3 py-2">
        <div className="flex items-center gap-1.5">
          <div className="rounded bg-emerald-100 p-1">
            <Pill size={12} className="text-emerald-600" />
          </div>
          <h3
            className="text-xs font-semibold text-slate-700"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Related Drugs
          </h3>
          <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
            {drugs.length}
          </span>
        </div>
      </div>

      {/* Drug List - Compact */}
      <div className="p-2 space-y-1 max-h-[250px] overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {drugs.map((drug, index) => (
          <motion.div
            key={drug.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="group flex items-center justify-between rounded-lg border border-slate-200/60 bg-white px-3 py-1.5 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-[10px] font-mono text-slate-400 w-5 flex-shrink-0">
                #{index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-700 truncate" style={{ fontFamily: "Roboto Slab" }}>
                  {drug.drug_name || "Unnamed Drug"}
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {drug.drug_code || "N/A"}
                </p>
              </div>
            </div>
            
            <div className="flex-shrink-0 ml-2">
              <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                drug.clinical_status?.toLowerCase() === 'approved' 
                  ? 'bg-emerald-100 text-emerald-700'
                  : drug.clinical_status?.toLowerCase() === 'clinical trial'
                  ? 'bg-blue-100 text-blue-700'
                  : drug.clinical_status?.toLowerCase() === 'preclinical'
                  ? 'bg-amber-100 text-amber-700'
                  : drug.clinical_status?.toLowerCase() === 'discontinued'
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {drug.clinical_status || "Unknown"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer - Compact */}
      {drugs.length > 0 && (
        <div className="border-t border-slate-200/60 bg-slate-50/30 px-3 py-1.5">
          <p className="text-[9px] text-slate-400 text-center" style={{ fontFamily: "Roboto Slab" }}>
            {drugs.length} drug{drugs.length !== 1 ? "s" : ""} associated
          </p>
        </div>
      )}
    </motion.div>
  );
}