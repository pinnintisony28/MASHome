import { motion , type Variants} from "framer-motion";
import { Search, Sparkles } from "lucide-react";

type TargetWelcomeProps = {
  onQuickSearch: (keyword: string) => void;
};

const quickSearches = [
  "FGFR1",
  "EGFR",
  "VEGFR2",
  "Kinase",
  "GPCR",
  "Enzyme",
];

export default function TargetWelcome({
  onQuickSearch,
}: TargetWelcomeProps) {
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants :Variants= {
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-slate-50/50 via-white to-emerald-50/20 p-5 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-emerald-500 p-1.5 shadow-sm shadow-emerald-500/10">
          <Search size={14} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2
              className="text-base font-semibold text-slate-800"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Explore Targets
            </h2>
            <Sparkles size={10} className="text-emerald-400" />
          </div>
          
          <p className="mt-1 text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "Roboto Slab" }}>
            Search by Target ID, Gene Name, Target Name, Bio Class, or Target Type
          </p>

          <div className="mt-3">
            <div className="flex flex-wrap gap-1.5">
              {quickSearches.map((item) => (
                <motion.button
                  key={item}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onQuickSearch(item)}
                  className="rounded-full border border-slate-200/60 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                  style={{ fontFamily: "Roboto Slab" }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}