import { Dna, Search, Sparkles, ArrowRight } from "lucide-react";
import { motion , type Variants} from "framer-motion";

type GeneWelcomeProps = {
  onQuickSearch: (keyword: string) => void;
};

export default function GeneWelcome({
  onQuickSearch,
}: GeneWelcomeProps) {
  const quickSearches = [
    "MIR122",
    "H19",
    "MEG3",
    "RNA Gene",
  ];

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

  const itemVariants :Variants= {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-slate-50/50 via-white to-emerald-50/20 p-8 shadow-sm"
    >
      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/5 blur-2xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-teal-500/5 blur-2xl" />
      
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />

      <div className="relative">
        {/* Icon Section */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-xl animate-pulse" />
            <div className="relative rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 p-4 shadow-lg shadow-emerald-500/30">
              <Dna size={32} className="text-white" />
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants} className="mt-5 text-center">
          <h2
            className="text-2xl font-bold text-slate-800"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Explore Gene Information
          </h2>
          
          <div className="flex items-center justify-center gap-2 mt-1">
            {/* <Sparkles size={12} className="text-emerald-400" /> */}
            {/* <span className="text-xs text-slate-400">Discover genetic insights</span> */}
            {/* <Sparkles size={12} className="text-emerald-400" /> */}
          </div>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "Roboto Slab" }}>
            Search genes by symbol, gene name or gene type to explore biological properties and therapeutic relevance.
          </p>
        </motion.div>

        {/* Quick Search Buttons */}
        <motion.div 
          variants={itemVariants}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-xs font-medium text-slate-400 mr-1">Quick Search:</span>
          {quickSearches.map((item) => (
            <motion.button
              key={item}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { duration: 0.15 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onQuickSearch(item)}
              className="group relative overflow-hidden rounded-full border border-emerald-200/60 bg-white px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md"
              style={{ fontFamily: "Roboto Slab" }}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Search size={12} className="text-emerald-400" />
                {item}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </motion.button>
          ))}
        </motion.div>

        {/* Bottom Divider */}
        <motion.div 
          variants={itemVariants}
          className="mt-6 flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-emerald-200" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <span>Start exploring</span>
            <ArrowRight size={12} className="text-emerald-400" />
          </span>
          <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-emerald-200" />
        </motion.div>
      </div>
    </motion.div>
  );
}