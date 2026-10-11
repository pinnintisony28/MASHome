import {
  Search,
  Stethoscope,
  ArrowRight,
  Sparkles,
  FlaskConical,
  Tablets,
  Syringe,
  Layers,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

type DrugWelcomeProps = {
  onQuickSearch: (keyword: string) => void;
};

const quickSearches = ["Resmetirom", "Semaglutide", "GLP-1", "Thyroid"];

const searchTiles = [
  { icon: FlaskConical, label: "Molecule", hint: "Generic name" },
  { icon: Layers, label: "Category", hint: "Therapeutic class" },
  { icon: Tablets, label: "Dosage form", hint: "Tablet, capsule..." },
  { icon: Syringe, label: "Route", hint: "Oral, injectable..." },
];

function DrugIcon() {
  return (
    <div className="relative h-24 w-24">
      {/* Pulse rings */}
      {[0, 1.3].map((delay) => (
        <motion.span
          key={delay}
          className="absolute inset-0 rounded-full bg-emerald-400/20"
          animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeOut",
            delay,
          }}
        />
      ))}

      {/* Orbiting dots */}
      <motion.div
        className="absolute -inset-3"
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/50" />
      </motion.div>
      <motion.div
        className="absolute -inset-6"
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-teal-300" />
      </motion.div>

      {/* Badge */}
      <motion.div
        className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/30 ring-4 ring-white"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Soft inner highlight */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/25 to-transparent" />

        {/* Capsule */}
        <motion.svg
          viewBox="0 0 48 48"
          className="relative h-14 w-14"
          fill="none"
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <g transform="rotate(-45 24 24)">
            {/* Left half */}
            <path d="M15 17 H24 V31 H15 A7 7 0 0 1 15 17 Z" fill="white" />
            {/* Right half */}
            <path
              d="M24 17 H33 A7 7 0 0 1 33 31 H24 Z"
              fill="#a7f3d0"
            />
            {/* Seam */}
            <line
              x1="24"
              y1="17"
              x2="24"
              y2="31"
              stroke="#059669"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            {/* Shine */}
            <line
              x1="13"
              y1="20"
              x2="21"
              y2="20"
              stroke="#10b981"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </motion.svg>
      </motion.div>
    </div>
  );
}

export default function DrugWelcome({ onQuickSearch }: DrugWelcomeProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-slate-50/60 via-white to-emerald-50/40 px-6 py-12 shadow-sm sm:px-10"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.35) 1px, transparent 0)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div className="absolute left-0 top-0 h-1 w-28 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />

      <div className="relative">
        {/* Icon */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <DrugIcon />
        </motion.div>

        {/* Title + description */}
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-600 shadow-sm backdrop-blur">
            <Sparkles size={11} />
            Drug Database
          </div>

          <h2
            className="mt-4 bg-gradient-to-r from-slate-800 via-slate-700 to-emerald-700 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Explore Therapeutic Drugs
          </h2>

          <p
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Search approved drugs by molecule name, brand, therapeutic category,
            dosage form, or route of administration.
          </p>
        </motion.div>

        {/* Search tiles */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {searchTiles.map(({ icon: Icon, label, hint }) => (
            <div
              key={label}
              className="group rounded-xl border border-slate-200/60 bg-white/70 p-3 text-center shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-100"
            >
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors duration-200 group-hover:bg-emerald-500 group-hover:text-white">
                <Icon size={18} />
              </div>
              <p
                className="mt-2 text-xs font-semibold text-slate-700"
                style={{ fontFamily: "Roboto Slab" }}
              >
                {label}
              </p>
              <p
                className="text-[10px] text-slate-400"
                style={{ fontFamily: "Roboto Slab" }}
              >
                {hint}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Quick search */}
        <motion.div variants={itemVariants} className="mt-8">
          <p
            className="mb-3 text-center text-[10px] font-medium uppercase tracking-widest text-slate-400"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Quick search
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickSearches.map((item) => (
              <motion.button
                key={item}
                variants={itemVariants}
                whileHover={{ scale: 1.06, y: -2, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onQuickSearch(item)}
                className="group relative overflow-hidden rounded-full border border-emerald-200/70 bg-white px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm transition-all duration-200 hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-100"
                style={{ fontFamily: "Roboto Slab" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                {/* Shine sweep */}
                <span className="absolute inset-y-0 -left-full w-1/2 skew-x-12 bg-white/60 transition-all duration-500 group-hover:left-[150%]" />
                <span className="relative z-10 flex items-center gap-1.5">
                  <Search size={12} className="text-emerald-400" />
                  {item}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <div className="flex w-full items-center justify-center gap-4">
            <div className="h-px max-w-20 flex-1 bg-gradient-to-r from-transparent to-emerald-200" />
            <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
              <Stethoscope size={12} className="text-emerald-400" />
              <span>Start exploring</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={12} className="text-emerald-400" />
              </motion.span>
            </span>
            <div className="h-px max-w-20 flex-1 bg-gradient-to-l from-transparent to-emerald-200" />
          </div>

          <p
            className="text-center text-xs text-slate-400"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Search by molecule name, brand, or choose a quick search above
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}