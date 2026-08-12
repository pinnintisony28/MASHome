import { Beaker, ChevronDown, ChevronUp, Sparkles, Activity } from "lucide-react";
import type { BioactiveADME } from "../../../types/bioactiveAdme";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";

type Props = {
  adme: BioactiveADME;
};

function Row({
  label,
  value,
  index,
}: {
  label: string;
  value: string | number | undefined | null;
  index?: number;
}) {
  // Color code values for better visualization
  const getValueColor = (label: string, val: string | number | undefined | null) => {
    if (val === undefined || val === null || val === "—") return "text-slate-400";
    
    const strVal = String(val).toLowerCase();
    
    if (label.includes("Absorption") || label.includes("Permeant")) {
      if (strVal.includes("high") || strVal === "yes" || strVal === "true") return "text-emerald-600";
      if (strVal.includes("low") || strVal === "no" || strVal === "false") return "text-rose-500";
    }
    
    if (label.includes("Lipinski") || label.includes("Ghose") || label.includes("Veber")) {
      if (strVal.includes("yes") || strVal.includes("pass")) return "text-emerald-600";
      if (strVal.includes("no") || strVal.includes("fail")) return "text-rose-500";
    }
    
    if (label.includes("Bioavailability")) {
      const num = parseFloat(strVal);
      if (num >= 0.5) return "text-emerald-600";
      if (num >= 0.3) return "text-amber-600";
      return "text-rose-500";
    }
    
    return "text-slate-700";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: (index || 0) * 0.04 }}
      className="flex justify-between py-2.5 border-b border-slate-100/80 last:border-b-0 hover:bg-slate-50/50 px-2 -mx-2 rounded-lg transition-colors duration-150"
    >
      <span className="text-sm text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
        {label}
      </span>

      <span className={`font-medium ${getValueColor(label, value)}`} style={{ fontFamily: "Roboto Slab" }}>
        {value ?? "—"}
      </span>
    </motion.div>
  );
}

export default function ADMESection({ adme }: Props) {
  const [expandedSections, setExpandedSections] = useState({
    chemical: true,
    absorption: true,
    drugLikeness: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="overflow-hidden rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-emerald-50/10 shadow-sm"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-between border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white px-5 py-3.5"
      >
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-emerald-100 p-1.5">
            <Beaker size={16} className="text-emerald-600" />
          </div>
          <h3
            className="text-sm font-semibold text-slate-700"
            style={{ fontFamily: "Roboto Slab" }}
          >
            ADME Profile
          </h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200/50">
            <Sparkles size={10} className="text-emerald-400" />
            Pharmacokinetics
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-400">Computed</span>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Chemical Properties */}
        <motion.div 
          variants={itemVariants}
          className="rounded-xl border border-slate-200/60 bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <button
            onClick={() => toggleSection('chemical')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 rounded-full bg-emerald-500" />
              <h4 className="text-sm font-semibold text-slate-700" style={{ fontFamily: "Roboto Slab" }}>
                Chemical Properties
              </h4>
              <span className="text-[10px] text-slate-400">• {Object.keys(adme).filter(k => ['molecular_formula', 'molecular_weight', 'tpsa', 'ilogp'].includes(k)).filter(k => adme[k as keyof BioactiveADME] !== null && adme[k as keyof BioactiveADME] !== undefined).length} properties</span>
            </div>
            <div className="text-slate-400">
              {expandedSections.chemical ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {expandedSections.chemical && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="px-4 pb-4"
            >
              <div className="rounded-lg bg-slate-50/50 p-2">
                <Row label="Formula" value={adme.molecular_formula} index={0} />
                <Row label="Molecular Weight" value={adme.molecular_weight} index={1} />
                <Row label="TPSA" value={adme.tpsa} index={2} />
                <Row label="LogP" value={adme.ilogp} index={3} />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Absorption */}
        <motion.div 
          variants={itemVariants}
          className="rounded-xl border border-slate-200/60 bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <button
            onClick={() => toggleSection('absorption')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 rounded-full bg-blue-500" />
              <h4 className="text-sm font-semibold text-slate-700" style={{ fontFamily: "Roboto Slab" }}>
                Absorption
              </h4>
              <span className="text-[10px] text-slate-400">• {Object.keys(adme).filter(k => ['gi_absorption', 'bbb_permeant', 'pgp_substrate'].includes(k)).filter(k => adme[k as keyof BioactiveADME] !== null && adme[k as keyof BioactiveADME] !== undefined).length} properties</span>
            </div>
            <div className="text-slate-400">
              {expandedSections.absorption ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {expandedSections.absorption && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="px-4 pb-4"
            >
              <div className="rounded-lg bg-slate-50/50 p-2">
                <Row label="GI Absorption" value={adme.gi_absorption} index={4} />
                <Row label="BBB Permeant" value={adme.bbb_permeant} index={5} />
                <Row label="P-gp Substrate" value={adme.pgp_substrate} index={6} />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Drug Likeness */}
        <motion.div 
          variants={itemVariants}
          className="rounded-xl border border-slate-200/60 bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <button
            onClick={() => toggleSection('drugLikeness')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 rounded-full bg-purple-500" />
              <h4 className="text-sm font-semibold text-slate-700" style={{ fontFamily: "Roboto Slab" }}>
                Drug-likeness
              </h4>
              <span className="text-[10px] text-slate-400">• 6 rules</span>
            </div>
            <div className="text-slate-400">
              {expandedSections.drugLikeness ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {expandedSections.drugLikeness && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="px-4 pb-4"
            >
              <div className="rounded-lg bg-slate-50/50 p-2">
                <Row label="Lipinski" value={adme.lipinski} index={7} />
                <Row label="Ghose" value={adme.ghose} index={8} />
                <Row label="Veber" value={adme.veber} index={9} />
                <Row label="Egan" value={adme.egan} index={10} />
                <Row label="Muegge" value={adme.muegge} index={11} />
                <Row label="Bioavailability" value={adme.bioavailability_score} index={12} />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div 
        variants={itemVariants}
        className="border-t border-slate-200/60 bg-slate-50/30 px-5 py-2.5 flex items-center justify-between"
      >
        <span className="text-[10px] text-slate-400 flex items-center gap-1.5">
          <Activity size={12} className="text-emerald-400" />
          ADME properties computed using cheminformatics algorithms
        </span>
        <span className="text-[10px] text-slate-400">v2.0</span>
      </motion.div>
    </motion.section>
  );
}