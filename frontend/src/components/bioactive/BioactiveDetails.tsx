import { useState } from "react";
import { Copy, Check, Leaf, ChevronDown, ChevronUp } from "lucide-react";
import type { Bioactive } from "../../types/bioactive";
import { motion } from "framer-motion";
import type { BioactiveProfile } from "../../services/bioactiveProfileService";
import ADMESection from "./sections/ADMESection";
import ToxicitySection from "./sections/ToxicitySection";
// import type { BioactiveToxicity } from "../../../types/bioactiveToxicity";
import Molecule2D from "./sections/Molecule2D";
// import { getMoleculeInfo } from "../../services/moleculeService";
import Molecule3D from "./sections/Molecule3D";
type Props = {
  bioactive: Bioactive | null;
  profile: BioactiveProfile | null;
  relatedBioactives: Bioactive[];
};

export default function BioactiveDetails({
  bioactive,
  profile,
  relatedBioactives,
}: Props) {
  const [copied, setCopied] = useState("");
  const [showRelated, setShowRelated] = useState(true);
  


  async function copyText(label: string, value?: string) {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => {
      setCopied("");
    }, 1500);
  }

  if (!bioactive) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm flex items-center justify-center"
      >
        <div className="text-center">
          <div className="rounded-full bg-slate-100 p-4 mb-4 inline-flex">
            <Leaf size={28} className="text-slate-400" />
          </div>
          <h2
            className="text-lg font-bold text-slate-700"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Bioactive Details
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-sm" style={{ fontFamily: "Roboto Slab" }}>
            Select a bioactive compound to view its complete information.
          </p>
        </div>
      </motion.div>
    );
  }
console.log("Bioactive:", JSON.stringify(bioactive, null, 2));
console.log("Profile:", JSON.stringify(profile, null, 2));
console.log("========== DEBUG ==========");
console.log("bioactive", bioactive);
console.log("profile", profile);
console.log("profile.adme", profile?.adme);
console.log("profile.toxicity", profile?.toxicity);
console.log("===========================");
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
              {bioactive.bioactive_name || "Unknown Compound"}
            </h2>
           <p className="mt-0.5 text-sm text-slate-500">
  {bioactive.plants.length} Source Plants
</p>
          </div>

         
        </div>

        {/* Summary Items */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          
          <SummaryItem
            title="Plant Part"
            value={bioactive.useful_part}
            copied={copied === "part"}
            onCopy={() => copyText("part", bioactive.useful_part)}
          />
          <SummaryItem
            title="Phytochemical ID"
            value={bioactive.molecular_formula}
            copied={copied === "phyto"}
            onCopy={() => copyText("phyto", bioactive.molecular_formula)}
          />
          <SummaryItem
  title="Molecular Weight"
  value={bioactive.molecular_weight}
  copied={copied === "weight"}
  onCopy={() => copyText("weight", bioactive.molecular_weight)}
/>
<SummaryItem
  title="IUPAC Name"
  value={bioactive.iupac_name}
  copied={copied === "iupac"}
  onCopy={() => copyText("iupac", bioactive.iupac_name)}
/>

          {/* <SummaryItem
            title="Group"
            value={bioactive.molecular_weight}
            copied={copied === "group"}
            onCopy={() => copyText("group", bioactive.bioactive_group)}
          /> */}
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="mt-6">
 <h3
  className="text-sm font-semibold text-slate-700 flex items-center gap-2"
  style={{ fontFamily: "Roboto Slab" }}
>
  <span className="w-1 h-4 bg-green-500 rounded-full" />
  Source Plants
</h3>

  {bioactive.plants && bioactive.plants.length > 0 ? (
    <div className="space-y-2">
      {bioactive.plants.map((plant) => (
        <a
          key={plant.id}
          href={plant.plant_url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          {plant.plant_name}
        </a>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No plants available.</p>
  )}
</div>
<div className="bg-red-500 text-white p-4 text-xl">
  HELLO AFTER PLANTS
</div>
        {/* Reference Section */}
        
{/* ADME Section */}
{/* <div className="bg-red-500 text-white p-4">
  ADME SHOULD APPEAR HERE
</div>

<div className="bg-green-500 text-white p-4">
  Before ADME
</div>

<ADMESection adme={profile!.adme!} />

<div className="bg-purple-500 text-white p-4">
  After ADME
</div>

<div className="bg-blue-500 text-white p-4">
  TOXICITY SHOULD APPEAR HERE
</div>

<ToxicitySection toxicity={profile!.toxicity} />
<Molecule2D smiles={bioactive.smiles} />
<Molecule3D bioactiveId={bioactive.bioactive_id} /> */}

<div className="border-4 border-red-500 p-6 bg-yellow-100">
  <h1 className="text-3xl font-bold">ADME TEST</h1>

  <p>{profile?.adme?.molecular_formula}</p>
  <p>{profile?.adme?.molecular_weight}</p>
  <p>{profile?.adme?.gi_absorption}</p>
</div>

        {/* Related Bioactives */}
        {relatedBioactives.length > 0 && (
          <section>
            <button
              onClick={() => setShowRelated(!showRelated)}
              className="w-full flex items-center justify-between group"
            >
              <h3
                className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                style={{ fontFamily: "Roboto Slab" }}
              >
                <span className="w-1 h-4 bg-blue-500 rounded-full" />
                Related Bioactives
                <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
                  {relatedBioactives.length}
                </span>
              </h3>
              <span className="text-slate-400 group-hover:text-slate-600 transition-colors">
                {showRelated ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>

            {showRelated && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-1.5 mt-2"
              >
                {relatedBioactives.map((item, index) => (
                  <motion.div
                    key={item.bioactive_id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`rounded-lg border p-2.5 transition-all duration-200 ${
                      item.bioactive_id === bioactive.bioactive_id
                        ? "border-emerald-300 bg-emerald-50/50"
                        : "border-slate-200/60 bg-white hover:border-emerald-200 hover:bg-emerald-50/20"
                    }`}
                  >
                    <p className="text-sm font-medium text-slate-800" style={{ fontFamily: "Roboto Slab" }}>
                      {item.bioactive_name || "—"}
                      {item.bioactive_id === bioactive.bioactive_id && (
                        <span className="ml-2 text-[10px] font-medium text-emerald-600">(Selected)</span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500">
  {item.plants?.length ?? 0} Plants
</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </section>
        )}
      </div>
    </motion.div>
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
  value?: string;
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
     <p
  className="mt-0.5 text-xs font-medium text-slate-700 break-words whitespace-normal"
  style={{ fontFamily: "Roboto Slab" }}
>
  {value ?? "—"}
</p>
    </div>
  );
}