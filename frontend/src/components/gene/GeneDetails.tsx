import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp, Dna } from "lucide-react";
import type { GeneDetails as GeneDetailsType } from "../../types/gene";
import { motion } from "framer-motion";

type GeneDetailsProps = {
  gene: GeneDetailsType | null;
};

export default function GeneDetails({
  gene,
}: GeneDetailsProps) {
  const [copied, setCopied] = useState("");

  const copyText = async (label: string, value: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => {
      setCopied("");
    }, 1500);
  };

  if (!gene) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm flex items-center justify-center"
      >
        <div className="text-center">
          <div className="rounded-full bg-slate-100 p-4 mb-4 inline-flex">
            <Dna size={28} className="text-slate-400" />
          </div>
          <h2
            className="text-lg font-bold text-slate-700"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Gene Details
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-sm" style={{ fontFamily: "Roboto Slab" }}>
            Select a gene from the search results to view detailed information.
          </p>
        </div>
      </motion.div>
    );
  }

  const property = gene.properties?.[0];

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
              {gene.symbol || "Unknown Gene"}
            </h2>
            <p className="mt-0.5 text-sm text-slate-500 truncate" style={{ fontFamily: "Roboto Slab" }}>
              {gene.gene_name || "No gene name available"}
            </p>
          </div>

          {gene.gene_type && (
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-medium text-blue-700 border border-blue-200/50 flex-shrink-0">
              {gene.gene_type}
            </span>
          )}
        </div>

        {/* Summary Items */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <SummaryItem
            title="Gene Symbol"
            value={gene.symbol}
            copied={copied === "Symbol"}
            onCopy={() => copyText("Symbol", gene.symbol)}
          />
          <SummaryItem
            title="Gene Type"
            value={gene.gene_type}
            copied={copied === "Type"}
            onCopy={() => copyText("Type", gene.gene_type)}
          />
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Gene Properties */}
        <section>
          <h3
            className="text-sm font-semibold text-slate-700 mb-2.5 flex items-center gap-2"
            style={{ fontFamily: "Roboto Slab" }}
          >
            <span className="w-1 h-4 bg-emerald-500 rounded-full" />
            Gene Properties
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <DetailItem label="Global Score" value={property?.global_score?.toString() ?? "—"} />
            <DetailItem label="Clinical Stage" value={property?.max_clinical_stage ?? "—"} />
            <DetailItem label="Membrane Protein" value={property?.is_in_membrane ? "Yes" : "No"} />
            <DetailItem label="Secreted" value={property?.is_secreted ? "Yes" : "No"} />
            <DetailItem label="Has Ligand" value={property?.has_ligand ? "Yes" : "No"} />
            <DetailItem label="Small Molecule Binder" value={property?.has_small_molecule_binder ? "Yes" : "No"} />
            <DetailItem label="Has Pocket" value={property?.has_pocket ? "Yes" : "No"} />
            <DetailItem label="Tissue Specificity" value={property?.tissue_specificity ?? "—"} />
            <DetailItem label="Tissue Distribution" value={property?.tissue_distribution ?? "—"} />
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