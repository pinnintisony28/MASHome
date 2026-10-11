import { useState } from "react";
import type { Target } from "../../types/target";
import { Copy, Check, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

type TargetDetailsProps = {
  target: Target | null;
  onBack?: () => void;
};

function BackButton({ onBack }: { onBack?: () => void }) {
  if (!onBack) return null;
  return (
    <button
      onClick={onBack}
      className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200/60 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
      style={{ fontFamily: "Roboto Slab" }}
    >
      <ArrowLeft size={14} />
      Back to table
    </button>
  );
}

export default function TargetDetails({ target, onBack }: TargetDetailsProps) {
  const [showFunction, setShowFunction] = useState(false);
  const [showSequence, setShowSequence] = useState(false);
  const [showSynonyms, setShowSynonyms] = useState(false);
  const [copied, setCopied] = useState("");

  const copyText = async (label: string, value: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => {
      setCopied("");
    }, 1500);
  };

  if (!target) {
    return (
      <div>
        <BackButton onBack={onBack} />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-4">
              <span className="text-2xl">🔬</span>
            </div>
            <h2
              className="text-lg font-bold text-slate-700"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Target Details
            </h2>
            <p
              className="mt-2 max-w-sm text-sm text-slate-500"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Select a target from the search results to explore its biological information.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <BackButton onBack={onBack} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm"
      >
        {/* Header Section */}
        <div className="border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2
                className="truncate text-xl font-bold text-slate-800"
                style={{ fontFamily: "Roboto Slab" }}
              >
                {target.gene_name || "Unknown Gene"}
              </h2>
              <p
                className="mt-1 truncate text-sm text-slate-500"
                style={{ fontFamily: "Roboto Slab" }}
              >
                {target.target_name || "No target name available"}
              </p>
            </div>

            <div className="flex flex-shrink-0 flex-wrap gap-1.5">
              {target.bio_class && (
                <span className="rounded-full border border-emerald-200/50 bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  {target.bio_class}
                </span>
              )}
              {target.target_type && (
                <span className="rounded-full border border-blue-200/50 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {target.target_type}
                </span>
              )}
            </div>
          </div>

          {/* Summary Items */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SummaryItem
              title="Target ID"
              value={target.target_id}
              copied={copied === "Target ID"}
              onCopy={() => copyText("Target ID", target.target_id)}
            />
            <SummaryItem
              title="Gene"
              value={target.gene_name}
              copied={copied === "Gene"}
              onCopy={() => copyText("Gene", target.gene_name)}
            />
            <SummaryItem
              title="UniProt"
              value={target.uniprot_id}
              copied={copied === "UniProt"}
              onCopy={() => copyText("UniProt", target.uniprot_id)}
            />
            <SummaryItem
              title="Former ID"
              value={target.former_id}
              copied={copied === "Former ID"}
              onCopy={() => copyText("Former ID", target.former_id)}
            />
          </div>
        </div>

        {/* Content Section (page scrolls naturally now) */}
        <div className="space-y-5 p-5">
          {/* Basic Information */}
          <section>
            <h3
              className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700"
              style={{ fontFamily: "Roboto Slab" }}
            >
              <span className="h-4 w-1 rounded-full bg-emerald-500" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <DetailItem label="Target ID" value={target.target_id} />
              <DetailItem label="Former ID" value={target.former_id} />
              <DetailItem label="Gene Name" value={target.gene_name} />
              <DetailItem label="UniProt ID" value={target.uniprot_id} />
              <DetailItem label="Bio Class" value={target.bio_class} />
              <DetailItem label="Target Type" value={target.target_type} />
            </div>
          </section>

          {/* Biological Function */}
          {target.function && (
            <ExpandableSection
              title="Biological Function"
              text={target.function}
              expanded={showFunction}
              onToggle={() => setShowFunction(!showFunction)}
            />
          )}

          {/* Protein Sequence */}
          {target.sequence && (
            <ExpandableSection
              title="Protein Sequence"
              text={target.sequence}
              expanded={showSequence}
              onToggle={() => setShowSequence(!showSequence)}
              isSequence={true}
            />
          )}

          {/* Protein Information */}
          {(target.ec_number || target.pdb_structure) && (
            <section>
              <h3
                className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700"
                style={{ fontFamily: "Roboto Slab" }}
              >
                <span className="h-4 w-1 rounded-full bg-purple-500" />
                Protein Information
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <DetailItem label="EC Number" value={target.ec_number} />
                <DetailItem label="PDB Structure" value={target.pdb_structure} />
              </div>
            </section>
          )}

          {/* Synonyms */}
          {target.synonyms && (
            <ExpandableSection
              title="Synonyms"
              text={target.synonyms}
              expanded={showSynonyms}
              onToggle={() => setShowSynonyms(!showSynonyms)}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Detail Item Component
type DetailItemProps = {
  label: string;
  value: string;
};

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="rounded-lg border border-slate-200/60 bg-slate-50/30 px-3 py-2.5">
      <p
        className="text-[10px] font-medium uppercase tracking-wider text-slate-400"
        style={{ fontFamily: "Roboto Slab" }}
      >
        {label}
      </p>
      <p
        className="mt-0.5 truncate text-sm text-slate-700"
        style={{ fontFamily: "Roboto Slab" }}
      >
        {value || "—"}
      </p>
    </div>
  );
}

// Expandable Section Component
type ExpandableSectionProps = {
  title: string;
  text: string;
  expanded: boolean;
  onToggle: () => void;
  isSequence?: boolean;
};

function ExpandableSection({
  title,
  text,
  expanded,
  onToggle,
  isSequence = false,
}: ExpandableSectionProps) {
  const limit = isSequence ? 150 : 300;
  const shouldTrim = text && text.length > limit;
  const displayText =
    shouldTrim && !expanded ? text.substring(0, limit) + "..." : text;

  return (
    <section>
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between"
      >
        <h3
          className="flex items-center gap-2 text-sm font-semibold text-slate-700"
          style={{ fontFamily: "Roboto Slab" }}
        >
          <span
            className={`h-4 w-1 rounded-full ${
              isSequence ? "bg-amber-500" : "bg-blue-500"
            }`}
          />
          {title}
        </h3>
        {shouldTrim && (
          <span className="text-slate-400 transition-colors group-hover:text-slate-600">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        )}
      </button>

      <div className="mt-2">
        <p
          className={`text-sm leading-relaxed text-slate-600 ${
            isSequence
              ? "break-all rounded-lg border border-slate-200/60 bg-slate-50 p-3 font-mono text-xs"
              : ""
          }`}
          style={{ fontFamily: isSequence ? "monospace" : "Roboto Slab" }}
        >
          {displayText || "—"}
        </p>
        {shouldTrim && (
          <button
            onClick={onToggle}
            className="mt-2 text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-700"
            style={{ fontFamily: "Roboto Slab" }}
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </section>
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
    <div className="rounded-lg border border-slate-200/60 bg-white px-3 py-2.5 shadow-sm">
      <div className="flex items-center justify-between">
        <p
          className="text-[10px] font-medium uppercase tracking-wider text-slate-400"
          style={{ fontFamily: "Roboto Slab" }}
        >
          {title}
        </p>
        {value && (
          <button
            onClick={onCopy}
            className="text-slate-300 transition-colors hover:text-emerald-600"
          >
            {copied ? (
              <Check size={13} className="text-emerald-500" />
            ) : (
              <Copy size={13} />
            )}
          </button>
        )}
      </div>
      <p
        className="mt-0.5 truncate text-sm font-medium text-slate-700"
        style={{ fontFamily: "Roboto Slab" }}
      >
        {value || "—"}
      </p>
    </div>
  );
}