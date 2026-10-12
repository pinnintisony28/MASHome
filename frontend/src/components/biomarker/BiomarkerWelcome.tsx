import { Activity, Search } from "lucide-react";
import { motion, type Variants } from "framer-motion";

type BiomarkerWelcomeProps = {
  onQuickSearch: (keyword: string) => void;
};

export default function BiomarkerWelcome({
  onQuickSearch,
}: BiomarkerWelcomeProps) {
  const quickSearches = [
    "LCN2",
    "MCP-1",
    "HLA-B",
    "Smallpox",
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm"
    >
      {/* Heading */}
      <motion.div variants={itemVariants} className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Activity size={20} />
        </div>

        <div className="min-w-0">
          <h2
            className="text-lg font-semibold text-slate-800"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Explore Disease Biomarkers
          </h2>
          <p
            className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Search biomarkers using biomarker ID, biomarker name or disease to
            discover disease associations and diagnostic information.
          </p>
        </div>
      </motion.div>

      {/* Quick search */}
      <div className="mt-6 border-t border-slate-100 pt-5">
        <motion.p
          variants={itemVariants}
          className="mb-3 text-[11px] font-medium uppercase tracking-wider text-slate-400"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Quick search
        </motion.p>

        <div className="flex flex-wrap gap-2">
          {quickSearches.map((item) => (
            <motion.button
              key={item}
              type="button"
              variants={itemVariants}
              whileTap={{ scale: 0.97 }}
              onClick={() => onQuickSearch(item)}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-600 transition-colors duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
              style={{ fontFamily: "Roboto Slab" }}
            >
              <Search size={12} className="text-slate-400" />
              {item}
            </motion.button>
          ))}
        </div>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-xs text-slate-400"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Search by ID, name, or disease to discover biomarkers.
        </motion.p>
      </div>
    </motion.div>
  );
}