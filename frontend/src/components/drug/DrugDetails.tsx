import { useState } from "react";
import type { Drug } from "../../types/drug";
import { Copy, Check, ChevronDown, ChevronUp, Pill } from "lucide-react";
import { motion } from "framer-motion";

type DrugDetailsProps = {
  drug: Drug | null;
};

export default function DrugDetails({
  drug,
}: DrugDetailsProps) {
  const [showDescription, setShowDescription] = useState(false);
  const [copied, setCopied] = useState("");

  const copyText = async (label: string, value: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => {
      setCopied("");
    }, 1500);
  };

  if (!drug) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm flex items-center justify-center"
      >
        <div className="text-center">
          <div className="rounded-full bg-slate-100 p-4 mb-4 inline-flex">
            <Pill size={28} className="text-slate-400" />
          </div>
          <h2
            className="text-lg font-bold text-slate-700"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Drug Details
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-sm" style={{ fontFamily: "Roboto Slab" }}>
            Select a drug from the search results to view its complete information.
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
              {drug.molecule_name || "Unknown Drug"}
            </h2>
            <p className="mt-0.5 text-sm text-slate-500 truncate" style={{ fontFamily: "Roboto Slab" }}>
              {drug.brand || "No brand information"}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 flex-shrink-0">
            {drug.route && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200/50">
                {drug.route}
              </span>
            )}
            {drug.dosage_form && (
              <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-medium text-purple-700 border border-purple-200/50">
                {drug.dosage_form}
              </span>
            )}
          </div>
        </div>

        {/* Summary Items - Compact */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <SummaryItem
            title="Brand"
            value={drug.brand}
            copied={copied === "Brand"}
            onCopy={() => copyText("Brand", drug.brand)}
          />
          <SummaryItem
            title="Route"
            value={drug.route}
            copied={copied === "Route"}
            onCopy={() => copyText("Route", drug.route)}
          />
          <SummaryItem
            title="Dosage Form"
            value={drug.dosage_form}
            copied={copied === "Dosage"}
            onCopy={() => copyText("Dosage", drug.dosage_form)}
          />
          <SummaryItem
            title="Category"
            value={drug.therapeutic_category}
            copied={copied === "Category"}
            onCopy={() => copyText("Category", drug.therapeutic_category)}
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
            <DetailItem label="Molecule Name" value={drug.molecule_name} />
            <DetailItem label="Brand" value={drug.brand} />
            <DetailItem label="Route" value={drug.route} />
            <DetailItem label="Dosage Form" value={drug.dosage_form} />
            <DetailItem label="Therapeutic Category" value={drug.therapeutic_category} />
          </div>
        </section>

        {/* Description */}
        {drug.description && (
          <section>
            <h3
              className="text-sm font-semibold text-slate-700 mb-2.5 flex items-center gap-2"
              style={{ fontFamily: "Roboto Slab" }}
            >
              <span className="w-1 h-4 bg-blue-500 rounded-full" />
              Description
            </h3>
            <ExpandableSection
              text={drug.description}
              expanded={showDescription}
              onToggle={() => setShowDescription(!showDescription)}
            />
          </section>
        )}
      </div>
    </motion.div>
  );
}

// Detail Item Component
type DetailItemProps = {
  label: string;
  value: string;
};

function DetailItem({ label, value }: DetailItemProps) {
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

// Expandable Section Component
type ExpandableSectionProps = {
  text: string;
  expanded: boolean;
  onToggle: () => void;
};

function ExpandableSection({
  text,
  expanded,
  onToggle,
}: ExpandableSectionProps) {
  const limit = 300;
  const shouldTrim = text && text.length > limit;
  const displayText = shouldTrim && !expanded
    ? text.substring(0, limit) + "..."
    : text;

  return (
    <div className="rounded-lg border border-slate-200/60 bg-slate-50/30 p-3">
      <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "Roboto Slab" }}>
        {displayText || "—"}
      </p>
      {shouldTrim && (
        <button
          onClick={onToggle}
          className="mt-2 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          style={{ fontFamily: "Roboto Slab" }}
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}