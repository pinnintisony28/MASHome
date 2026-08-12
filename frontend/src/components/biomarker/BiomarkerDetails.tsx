import { useState } from "react";
import { Copy, Check, Activity } from "lucide-react";
import type { Biomarker } from "../../types/biomarker";
import { motion } from "framer-motion";

type BiomarkerDetailsProps = {
  biomarker: Biomarker | null;
};

export default function BiomarkerDetails({
  biomarker,
}: BiomarkerDetailsProps) {
  const [copied, setCopied] = useState("");

  const copyText = async (label: string, value: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => {
      setCopied("");
    }, 1500);
  };

  if (!biomarker) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm flex items-center justify-center"
      >
        <div className="text-center">
          <div className="rounded-full bg-slate-100 p-4 mb-4 inline-flex">
            <Activity size={28} className="text-slate-400" />
          </div>
          <h2
            className="text-lg font-bold text-slate-700"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Biomarker Details
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-sm" style={{ fontFamily: "Roboto Slab" }}>
            Select a biomarker from the search results to view its details.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full rounded-xl border border-slate-200/60 bg-white shadow-sm overflow-hidden flex flex-col"
    >
      {/* Header - Fixed */}
      <div className="border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white p-4 flex-shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2
              className="text-lg font-bold text-slate-800 truncate"
              style={{ fontFamily: "Roboto Slab" }}
            >
              {biomarker.biomarker_name || "Unknown Biomarker"}
            </h2>
            <p className="mt-0.5 text-sm text-slate-500 truncate" style={{ fontFamily: "Roboto Slab" }}>
              {biomarker.biomarker_id || "No ID available"}
            </p>
          </div>

          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200/50 flex-shrink-0">
            Biomarker
          </span>
        </div>

        {/* Summary Items */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <SummaryItem
            title="Biomarker ID"
            value={biomarker.biomarker_id}
            copied={copied === "id"}
            onCopy={() => copyText("id", biomarker.biomarker_id)}
          />
          <SummaryItem
            title="Disease"
            value={biomarker.disease_name}
            copied={copied === "disease"}
            onCopy={() => copyText("disease", biomarker.disease_name)}
          />
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Basic Information */}
        <section>
          <h3
            className="text-sm font-semibold text-slate-700 mb-2.5 flex items-center gap-2"
            style={{ fontFamily: "Roboto Slab" }}
          >
            <span className="w-1 h-4 bg-emerald-500 rounded-full" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <DetailItem label="Biomarker Name" value={biomarker.biomarker_name} />
            <DetailItem label="Disease" value={biomarker.disease_name} />
            <DetailItem label="ICD-11" value={biomarker.icd11} />
            <DetailItem label="ICD-10" value={biomarker.icd10} />
            <DetailItem label="ICD-9" value={biomarker.icd9} />
          </div>
        </section>
      </div>
    </motion.div>
  );
}

// Detail Item Component
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200/60 bg-slate-50/30 px-3 py-2">
      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400" style={{ fontFamily: "Roboto Slab" }}>
        {label}
      </p>
      <p className="mt-0.5 text-sm text-slate-700 truncate" style={{ fontFamily: "Roboto Slab" }}>
        {value || "—"}
      </p>
    </div>
  );
}

// Summary Item Component
function SummaryItem({
  title,
  value,
  copied,
  onCopy,
}: {
  title: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-lg border border-slate-200/60 bg-white px-2.5 py-2 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-medium uppercase tracking-wider text-slate-400" style={{ fontFamily: "Roboto Slab" }}>
          {title}
        </p>
        {value && (
          <button
            onClick={onCopy}
            className="text-slate-300 hover:text-emerald-600 transition-colors"
          >
            {copied ? (
              <Check size={12} className="text-emerald-500" />
            ) : (
              <Copy size={12} />
            )}
          </button>
        )}
      </div>
      <p className="mt-0.5 text-xs font-medium text-slate-700 truncate" style={{ fontFamily: "Roboto Slab" }}>
        {value || "—"}
      </p>
    </div>
  );
}