import { motion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

type TargetWelcomeProps = {
  onQuickSearch: (keyword: string) => void;
};

const quickSearches = ["FGFR1", "EGFR", "VEGFR2", "Kinase", "GPCR", "Enzyme"];

// Makes SVG groups rotate around their own center
const centered = { transformBox: "fill-box", transformOrigin: "center" } as const;

function TargetIcon() {
  return (
    <div className="relative h-14 w-14 shrink-0">
      {/* Pulse rings */}
      {[0, 1.1].map((delay) => (
        <motion.span
          key={delay}
          className="absolute inset-0 rounded-full bg-emerald-400/25"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
            delay,
          }}
        />
      ))}

      {/* Badge */}
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/25 ring-4 ring-white">
        <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
          {/* Static rings */}
          <circle cx="24" cy="24" r="18" stroke="white" strokeOpacity="0.45" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="11" stroke="white" strokeOpacity="0.75" strokeWidth="1.5" />

          {/* Rotating crosshair */}
          <motion.g
            style={centered}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <line x1="24" y1="2" x2="24" y2="10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="24" y1="38" x2="24" y2="46" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="2" y1="24" x2="10" y2="24" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="38" y1="24" x2="46" y2="24" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </motion.g>

          {/* Orbiting "ligand" */}
          <motion.g
            style={centered}
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="24" cy="6" r="2.2" fill="#a7f3d0" />
          </motion.g>

          {/* Pulsing core */}
          <motion.circle
            cx="24"
            cy="24"
            r="4"
            fill="white"
            style={centered}
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </div>
  );
}

export default function TargetWelcome({ onQuickSearch }: TargetWelcomeProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-slate-50/60 via-white to-emerald-50/30 p-6 shadow-sm"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative flex items-center gap-4">
        <TargetIcon />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2
              className="text-lg font-semibold text-slate-800"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Explore Targets
            </h2>
            <motion.span
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={12} className="text-emerald-400" />
            </motion.span>
          </div>

          <p
            className="mt-1 text-xs leading-relaxed text-slate-500"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Search by Target ID, Gene Name, Target Name, Bio Class, or Target Type
          </p>
        </div>
      </div>

      <div className="relative mt-4 border-t border-slate-100 pt-4">
        <p
          className="mb-2 text-[10px] font-medium uppercase tracking-wider text-slate-400"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Quick search
        </p>
        <div className="flex flex-wrap gap-1.5">
          {quickSearches.map((item) => (
            <motion.button
              key={item}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onQuickSearch(item)}
              className="rounded-full border border-slate-200/60 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-emerald-100"
              style={{ fontFamily: "Roboto Slab" }}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}