import { useState } from "react";
import { Copy, Check, ExternalLink, FlaskConical } from "lucide-react";
import type { ClinicalTrial } from "../../types/clinicalTrial";
import { motion } from "framer-motion";

type Props = {
  trial: ClinicalTrial | null;
};

export default function ClinicalTrialDetails({ trial }: Props) {
  const [copied, setCopied] = useState("");

  async function copyText(label: string, value: string) {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => {
      setCopied("");
    }, 1500);
  }

  if (!trial) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm flex items-center justify-center"
      >
        <div className="text-center">
          <div className="rounded-full bg-slate-100 p-4 mb-4 inline-flex">
            <FlaskConical size={28} className="text-slate-400" />
          </div>
          <h2
            className="text-lg font-bold text-slate-700"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Clinical Trial Details
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-sm" style={{ fontFamily: "Roboto Slab" }}>
            Select a clinical trial to view complete study information.
          </p>
        </div>
      </motion.div>
    );
  }

  const statusColor =
    trial.status?.toLowerCase().includes("recruit")
      ? "bg-blue-100 text-blue-700 border border-blue-200/50"
      : trial.status?.toLowerCase().includes("completed")
      ? "bg-emerald-100 text-emerald-700 border border-emerald-200/50"
      : "bg-amber-100 text-amber-700 border border-amber-200/50";

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
              {trial.trial_id || "Unknown Trial"}
            </h2>
            <p className="mt-0.5 text-sm text-slate-500 line-clamp-2" style={{ fontFamily: "Roboto Slab" }}>
 {trial.title || "No title available"}            </p>
          </div>

          {trial.status && (
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium flex-shrink-0 ${statusColor}`}>
              {trial.status}
            </span>
          )}
        </div>

        {/* Summary Items */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <SummaryItem
            title="Trial ID"
            value={trial.trial_id}
            copied={copied === "trial"}
            onCopy={() => copyText("trial", trial.trial_id)}
          />
          <SummaryItem
            title="Sponsor"
            value={trial.sponsor}
            copied={copied === "sponsor"}
            onCopy={() => copyText("sponsor", trial.sponsor)}
          />
          <SummaryItem
            title="Study Type"
            value={trial.study_type || "—"}
            copied={copied === "study"}
            onCopy={() => copyText("study", trial.study_type)}
          />
          <SummaryItem
            title="Phase"
            value={trial.phase || "—"}
            copied={copied === "phase"}
            onCopy={() => copyText("phase", trial.phase)}
          />
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Study Design */}
        {trial.study_design && (
          <Section title="Study Design" value={trial.study_design} />
        )}

        {/* Condition */}
        {trial.conditions && (
          <Section title="Condition" value={trial.conditions} />
        )}

        {/* Intervention */}
        {trial.interventions && (
          <Section title="Intervention" value={trial.interventions} />
        )}

        {/* Scientific Title */}
        {trial.scientific_title && (
          <Section title="Scientific Title" value={trial.scientific_title} />
        )}

        {/* Additional Info Grid */}
        <div className="grid grid-cols-2 gap-2">
          <DetailItem label="Enrollment" value={String(trial.enrollment ?? "—")} />

<DetailItem label="Country" value={trial.country || "—"} />

<DetailItem label="Gender" value={trial.gender || "—"} />

<DetailItem label="Age" value={trial.age || "—"} />

<DetailItem label="Phase" value={trial.phase || "—"} />

<DetailItem label="Registry" value={trial.registry || "—"} />

<DetailItem label="Start Date" value={trial.start_date || "—"} />

<DetailItem label="Completion Date" value={trial.completion_date || "—"} />
        </div>

        {/* Website Link */}
        {trial.url && (
          <div className="rounded-lg border border-slate-200/60 bg-slate-50/30 p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 mb-2" style={{ fontFamily: "Roboto Slab" }}>
              Clinical Trial Website
            </p>
            <a
              href={trial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              style={{ fontFamily: "Roboto Slab" }}
            >
              <span>Open Clinical Trial</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Section Component
function Section({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200/60 bg-slate-50/30 p-3">
      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 mb-1.5" style={{ fontFamily: "Roboto Slab" }}>
        {title}
      </p>
      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line" style={{ fontFamily: "Roboto Slab" }}>
        {value || "—"}
      </p>
    </div>
  );
}

// Detail Item Component
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200/60 bg-slate-50/30 px-3 py-2">
      <p className="text-[9px] font-medium uppercase tracking-wider text-slate-400" style={{ fontFamily: "Roboto Slab" }}>
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
        {value && value !== "—" && (
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