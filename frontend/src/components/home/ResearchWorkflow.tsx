import { useEffect, useState } from "react";
import {
  HeartPulse,
  Activity,
  Crosshair,
  Pill,
  FlaskConical,
  BookOpen,
  Dna,
  Network,
  GitBranch,
  Atom,
  FileText,
  ChevronLeft,
  ChevronRight,
  Repeat,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type Variants } from "framer-motion";

const workflow = [
  {
    title: "Disease",
    description: "MASLD",
    detail:
      "Core MASLD information: definition, stages, risk factors and disease mechanisms.",
    icon: HeartPulse,
    color: "text-red-600",
  },
  {
    title: "Associated Diseases",
    description: "Comorbidities and related conditions",
    detail:
      "Conditions that commonly occur with or follow MASLD, such as type 2 diabetes and cardiovascular disease.",
    icon: Network,
    color: "text-rose-600",
  },
  {
    title: "Genes & Proteins",
    description: "Variants, expression and protein data",
    detail:
      "Genes and proteins linked to MASLD, with variants, expression levels and functional annotations.",
    icon: Dna,
    color: "text-cyan-600",
  },
  {
    title: "Pathways",
    description: "Molecular and signaling pathways",
    detail:
      "Metabolic and signaling pathways involved in the development and progression of MASLD.",
    icon: GitBranch,
    color: "text-amber-600",
  },
  {
    title: "Biomarkers",
    description: "Identify disease indicators",
    detail:
      "Molecular and clinical indicators used to diagnose, stage or monitor the disease.",
    icon: Activity,
    color: "text-orange-600",
  },
  {
    title: "Targets",
    description: "Therapeutic target discovery",
    detail:
      "Proteins and pathways that can be modulated to treat MASLD, ranked by supporting evidence.",
    icon: Crosshair,
    color: "text-blue-600",
  },
  {
    title: "Drugs",
    description: "Drug discovery & repurposing",
    detail:
      "Approved, investigational and repurposed compounds, mapped to the targets they act on.",
    icon: Pill,
    color: "text-emerald-600",
  },
  {
    title: "Docking & Dynamics",
    description: "Molecular docking and simulation",
    detail:
      "Docking and molecular dynamics results showing how compounds bind to their targets.",
    icon: Atom,
    color: "text-indigo-600",
  },
  {
    title: "Clinical Trials",
    description: "Evaluate treatments",
    detail:
      "Registered studies that evaluate MASLD treatments, with their phase and recruitment status.",
    icon: FlaskConical,
    color: "text-purple-600",
  },
  {
    title: "Patents",
    description: "Intellectual property landscape",
    detail:
      "Patent filings that cover MASLD compounds, targets and treatment methods.",
    icon: FileText,
    color: "text-fuchsia-600",
  },
  {
    title: "Literature",
    description: "Scientific evidence",
    detail:
      "Publications that support the findings across every module of the platform.",
    icon: BookOpen,
    color: "text-slate-700",
  },
];

function StepButton({
  step,
  isActive,
  isDone,
  onClick,
  tabIndex = 0,
}: {
  step: (typeof workflow)[number];
  isActive: boolean;
  isDone: boolean;
  onClick: () => void;
  tabIndex?: number;
}) {
  const Icon = step.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={tabIndex}
      aria-current={isActive ? "step" : undefined}
      className="group relative z-10 flex w-full flex-col items-center gap-3 rounded-xl px-1 pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
          isActive
            ? "scale-50 border-emerald-800 bg-emerald-800 text-white shadow-lg shadow-emerald-900/25 ring-4 ring-emerald-100"
            : isDone
              ? "border-emerald-600 bg-white group-hover:bg-emerald-50"
              : "border-slate-200 bg-white group-hover:border-emerald-400"
        }`}
      >
        <Icon size={20} className={isActive ? "text-white" : step.color} />
      </span>

      <span
        className={`text-center text-xs leading-snug transition-colors ${
          isActive
            ? "font-bold text-emerald-900"
            : "font-medium text-slate-500 group-hover:text-slate-800"
        }`}
      >
        {step.title}
      </span>
    </button>
  );
}

const AUTO_ADVANCE_MS = 3000;

// Panel slides in the direction of travel, then its parts follow one by one
const panelVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 56 }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -56,
    transition: { duration: 0.18, ease: "easeIn" },
  }),
};

const iconVariants: Variants = {
  enter: { opacity: 0, scale: 0.6, rotate: -14 },
  center: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 220, damping: 14 },
  },
  exit: { opacity: 0 },
};

const textVariants: Variants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0 },
};

export default function ResearchWorkflow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();

  // Used by touch swipes: wraps around at either end
  function step(dir: 1 | -1) {
    setDirection(dir);
    setActive((i) => (i + dir + workflow.length) % workflow.length);
  }

  function go(index: number) {
    setDirection(index >= active ? 1 : -1);
    setActive(index);
  }

  // Auto-advance every few seconds; pauses while the section is hovered or
  // focused, and is skipped entirely if the user prefers reduced motion.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setDirection(1);
      setActive((i) => (i + 1) % workflow.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [active, paused]);

  const last = workflow.length - 1;
  const current = workflow[active];
  const CurrentIcon = current.icon;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="wf-root mt-24 rounded-3xl border border-slate-200 bg-white px-4 py-14 shadow-sm sm:px-10 sm:py-16"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300..800&family=Dancing+Script:wght@500;600&display=swap');
        .wf-root, .wf-root * { font-family: 'Roboto Slab', Georgia, serif; }
        /* Cursive half of the heading (higher specificity than the rule above) */
        .wf-root .wf-cursive {
          font-family: 'Dancing Script', cursive;
          font-weight: 600;
        }
        /* Below xl the stepper is a fixed window: it slides, it never scrolls */
        .wf-viewport {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%);
        }
        @media (min-width: 1280px) {
          .wf-viewport { -webkit-mask-image: none; mask-image: none; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-3xl">
          <h2 className="text-4xl font-normal leading-tight tracking-tight text-slate-700 lg:text-4xl">
            Research{" "}
            <span className="wf-cursive text-[1.1em] text-emerald-600">
              Workflow
            </span>
            <span
              aria-hidden="true"
              className="mt-3 flex items-center gap-2"
            >
              <span className="h-1 w-24 rounded-full bg-emerald-600" />
              <span className="h-1 w-6 rounded-full bg-emerald-300" />
              <span className="h-1 w-1.5 rounded-full bg-emerald-200" />
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            MASHome integrates biomedical knowledge across the complete research
            pipeline.
          </p>
        </div>

        {/* Stepper: desktop (full width, evenly spaced, loop arc above) */}
        <div className="relative mt-12 hidden pt-7 xl:block">
          <div
            aria-hidden="true"
            className={`absolute left-[4.5455%] right-[4.5455%] top-0 h-7 rounded-t-3xl border-x-2 border-t-2 border-dashed transition-colors duration-500 ${
              active === last ? "border-emerald-600" : "border-slate-300"
            }`}
          >
            <span
              className={`absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-2 transition-colors duration-500 ${
                active === last ? "text-emerald-700" : "text-slate-400"
              }`}
            >
              <Repeat size={14} />
            </span>
          </div>

          <ol className="grid grid-cols-11">
            {workflow.map((step, index) => (
              <li key={step.title} className="relative flex justify-center">
                {index < last && (
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 top-6 h-0.5 w-full -translate-y-1/2 transition-colors duration-500 ${
                      index < active ? "bg-emerald-600" : "bg-slate-200"
                    }`}
                  />
                )}
                <StepButton
                  step={step}
                  isActive={index === active}
                  isDone={index < active}
                  onClick={() => go(index)}
                />
              </li>
            ))}
          </ol>
        </div>

        {/* Stepper: mobile and tablet (circular, no scrolling) */}
        <div className="wf-viewport relative mt-10 h-28 overflow-hidden xl:hidden">
          <ol className="relative h-full">
            {workflow.map((step, index) => {
              // Shortest signed distance from the active step, wrapping around
              const half = Math.floor(workflow.length / 2);
              const offset =
                ((index - active + workflow.length + half) % workflow.length) -
                half;
              const hidden = Math.abs(offset) > 3;

              return (
                <li
                  key={step.title}
                  className="absolute left-1/2 top-0 -ml-[2.75rem] w-[5.5rem]"
                  style={{
                    transform: `translateX(${offset * 5.5}rem)`,
                    opacity: hidden ? 0 : 1,
                    pointerEvents: hidden ? "none" : "auto",
                    transition: "transform 500ms ease-out, opacity 300ms",
                  }}
                >
                  {/* Connector to the next step; the last one loops to the first */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-[calc(50%+1.5rem)] top-6 w-10 -translate-y-1/2 border-t-2 transition-colors duration-500 ${
                      index === last
                        ? `border-dashed ${
                            active === last
                              ? "border-emerald-600"
                              : "border-slate-300"
                          }`
                        : index < active
                          ? "border-emerald-600"
                          : "border-slate-200"
                    }`}
                  />
                  <StepButton
                    step={step}
                    isActive={index === active}
                    isDone={index < active}
                    onClick={() => go(index)}
                    tabIndex={hidden ? -1 : 0}
                  />
                </li>
              );
            })}
          </ol>
        </div>

        {/* Detail panel */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <motion.div
            style={{ touchAction: "pan-y" }}
            onPanEnd={(_, info) => {
              if (info.offset.x < -50) step(1);
              else if (info.offset.x > 50) step(-1);
            }}
          >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current.title}
              custom={direction}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid gap-6 p-6 sm:p-10 md:grid-cols-[auto_1fr] md:gap-10"
            >
              <motion.div
                variants={iconVariants}
                className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <CurrentIcon size={36} className={current.color} />
              </motion.div>

              <div>
                <motion.p
                  variants={textVariants}
                  className="text-sm font-semibold text-emerald-800"
                >
                  Module {active + 1} of {workflow.length}
                </motion.p>
                <motion.h3
                  variants={textVariants}
                  className="mt-1 text-2xl font-bold text-slate-800 sm:text-2xl"
                >
                  {current.title}
                </motion.h3>
                <motion.p
                  variants={textVariants}
                  className="mt-2 text-lg text-slate-700"
                >
                  {current.description}
                </motion.p>
                <motion.p
                  variants={textVariants}
                  className="mt-4 max-w-2xl text-base leading-7 text-slate-600"
                >
                  {current.detail}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
          </motion.div>

          {/* Timer bar: fills until the next module appears */}
          {!reduceMotion && (
            <div className="h-1 bg-slate-200/70">
              <motion.div
                key={`${active}-${paused}`}
                className="h-full bg-emerald-500"
                initial={{ width: "0%" }}
                animate={{ width: paused ? "0%" : "100%" }}
                transition={{
                  duration: paused ? 0 : AUTO_ADVANCE_MS / 1000,
                  ease: "linear",
                }}
              />
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4 sm:px-10">
            <button
              type="button"
              onClick={() => go(Math.max(0, active - 1))}
              disabled={active === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <button
              type="button"
              onClick={() => go(Math.min(last, active + 1))}
              disabled={active === last}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}