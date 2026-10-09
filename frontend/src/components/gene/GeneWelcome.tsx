import { Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type GeneWelcomeProps = {
  onQuickSearch: (keyword: string) => void;
};

const COLUMNS = 16;
const AMPLITUDE = 12;

/* Flat-top hexagon: width 9rem, height = width / 1.1547 */
const HEX_CLIP = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
const HEX_W = "9rem";
const HEX_H = "7.794rem";

/* Animated DNA helix: one calm, looping moment at the top of the card */
function Helix({ animated }: { animated: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-10 items-center justify-center gap-2.5"
    >
      {Array.from({ length: COLUMNS }, (_, i) => {
        const delay = i * 0.14;
        const staticY = AMPLITUDE * Math.sin(i * 0.65);

        const loop = {
          duration: 2.8,
          ease: "easeInOut" as const,
          repeat: Infinity,
          delay,
        };

        return (
          <div key={i} className="relative flex h-10 w-2 items-center justify-center">
            <motion.span
              className="absolute w-px origin-center bg-emerald-200"
              style={{ height: AMPLITUDE * 2 }}
              initial={{ scaleY: Math.abs(Math.cos(i * 0.65)) }}
              animate={animated ? { scaleY: [1, 0, 1, 0, 1] } : undefined}
              transition={loop}
            />
            <motion.span
              className="absolute h-2 w-2 rounded-full bg-emerald-500"
              initial={{ y: -staticY }}
              animate={
                animated
                  ? {
                      y: [-AMPLITUDE, 0, AMPLITUDE, 0, -AMPLITUDE],
                      scale: [0.75, 1, 1.25, 1, 0.75],
                    }
                  : undefined
              }
              transition={loop}
            />
            <motion.span
              className="absolute h-2 w-2 rounded-full bg-teal-400"
              initial={{ y: staticY }}
              animate={
                animated
                  ? {
                      y: [AMPLITUDE, 0, -AMPLITUDE, 0, AMPLITUDE],
                      scale: [1.25, 1, 0.75, 1, 1.25],
                    }
                  : undefined
              }
              transition={loop}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function GeneWelcome({ onQuickSearch }: GeneWelcomeProps) {
  const reduceMotion = useReducedMotion();

  const quickSearches = [
    { term: "MIR122", kind: "Gene symbol" },
    { term: "H19", kind: "Gene symbol" },
    { term: "MEG3", kind: "Gene symbol" },
    { term: "RNA Gene", kind: "Gene type" },
  ];

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      style={{ fontFamily: "Roboto Slab" }}
    >
      {/* Hero */}
      <div className="bg-gradient-to-b from-emerald-50/80 to-white px-6 pt-8 pb-6 text-center sm:px-10 sm:pt-10">
        <Helix animated={!reduceMotion} />

        <h2
          className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Explore Gene Information
        </h2>

        <p
          className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Search genes by symbol, gene name or gene type to explore biological
          properties and therapeutic relevance.
        </p>
      </div>

      {/* Quick search: chain of hexagon "molecule rings" */}
      <div className="px-6 pb-10 sm:px-10">
        <p
          className="mb-5 text-center text-sm font-medium text-slate-500"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Not sure where to start? Try one of these.
        </p>

        <div className="grid grid-cols-2 justify-items-center gap-4 sm:flex sm:items-start sm:justify-center sm:gap-0">
          {quickSearches.map(({ term, kind }, index) => (
            <button
              key={term}
              type="button"
              onClick={() => onQuickSearch(term)}
              aria-label={`Search for ${term}`}
              className={`group relative block shrink-0 bg-transparent transition-transform duration-200 hover:z-10 hover:scale-105 focus:outline-none motion-reduce:transition-none motion-reduce:hover:scale-100 ${
                index > 0 ? "sm:-ml-9" : ""
              } ${index % 2 === 1 ? "sm:mt-[3.9rem]" : ""}`}
              style={{ width: HEX_W, height: HEX_H, fontFamily: "Roboto Slab" }}
            >
              {/* hexagon border */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-emerald-200 transition-colors duration-200 group-hover:bg-emerald-500 group-focus-visible:bg-emerald-700"
                style={{ clipPath: HEX_CLIP }}
              />
              {/* hexagon fill */}
              <span
                aria-hidden="true"
                className="absolute inset-[2px] bg-white transition-colors duration-200 group-hover:bg-emerald-50"
                style={{ clipPath: HEX_CLIP }}
              />
              {/* content */}
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 text-center">
                <Search
                  size={14}
                  className="text-emerald-500 transition-colors duration-200 group-hover:text-emerald-700"
                  aria-hidden="true"
                />
                <span className="mt-1 text-base font-semibold text-slate-800">
                  {term}
                </span>
                <span className="text-[11px] text-slate-500">{kind}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}