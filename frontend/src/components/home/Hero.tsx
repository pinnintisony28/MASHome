import { useEffect, useState } from "react";
import {
    Search,
    ArrowRight,
    Sparkles,
    BookOpen,
    FlaskRound as Flask,
    Microscope,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
type HeroProps = {
    onSearch?: () => void;
};

/*
  Design notes
  - A calm, two-column hero: message and actions on the left, a clean list of the
    platform's data types on the right.
  - The data types highlight one after another (a quiet guided tour of what is inside);
    hovering a row pauses the tour on it.
  - Palette: ink teal #134E4A, teal-700 (action), teal-50/100 (tints), slate for text,
    emerald-500 (one small accent). Typography: Roboto Slab throughout.
  - Reduced motion: no entrance and no automatic tour.
  - Background: clean, clear linear gradient (white → soft teal → white).
*/

const STATS = [
    { value: "50K+", label: "Publications", Icon: BookOpen },
    { value: "2K+", label: "Compounds", Icon: Flask },
    { value: "500+", label: "Clinical Trials", Icon: Microscope },
];

/* Data types shown in the platform panel */
const DROPLETS = [
    { label: "Genes", size: 32, x: 50, y: 50, delay: 0.2 },
    { label: "Therapeutic targets", size: 26, x: 50, y: 20, delay: 0.35 },
    { label: "Approved drugs", size: 26, x: 76, y: 35, delay: 0.45 },
    { label: "Biomarkers", size: 24, x: 76.8, y: 65.5, delay: 0.55 },
    { label: "Bioactives", size: 26, x: 50, y: 80, delay: 0.65 },
    { label: "Clinical trials", size: 28, x: 24, y: 65, delay: 0.75 },
    { label: "Literature", size: 26, x: 23.2, y: 34.5, delay: 0.85 },
];

export default function Hero({ onSearch }: HeroProps) {
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    /* Highlight the data types one at a time */
    useEffect(() => {
        if (reduceMotion || paused) return;
        const timer = setInterval(() => {
            setActive((a) => (a + 1) % DROPLETS.length);
        }, 2200);
        return () => clearInterval(timer);
    }, [paused, reduceMotion]);

    // Left column: one staggered entrance on load
    const leftVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.09, delayChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 14 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: "easeOut" },
        },
    };

    return (
        <motion.section
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="hero-bg relative overflow-hidden rounded-3xl border border-teal-100"
            style={{ fontFamily: "Roboto Slab" }}
        >
            <style>{`
                .hero-bg {
                    /* Clean, clear linear gradient: white → soft teal → white */
                    background: linear-gradient(135deg, #ffffff 0%, #f0fdfa 50%, #ffffff 100%);
                }
                @keyframes hero-drift {
                    from { transform: translate(0, 0) scale(1); }
                    to   { transform: translate(40px, 28px) scale(1.12); }
                }
                .hero-glow { animation: hero-drift 14s ease-in-out infinite alternate; }
                @media (prefers-reduced-motion: reduce) {
                    .hero-glow { animation: none; }
                }
            `}</style>

            {/* Soft colour glows behind the content */}
            <div
                aria-hidden="true"
                className="hero-glow pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-teal-200/50 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="hero-glow pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-emerald-200/50 blur-3xl"
                style={{ animationDuration: "19s", animationDirection: "alternate-reverse" }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-100/60 blur-3xl"
            />

            <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:gap-14 lg:px-14 lg:py-20">
                {/* Left content */}
                <motion.div
                    variants={leftVariants}
                    initial={reduceMotion ? false : "hidden"}
                    animate="visible"
                    className="lg:col-span-7"
                >
                    {/* Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5"
                    >
                        <Sparkles className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                        <span className="text-sm font-normal text-teal-800">
                            MASLD Knowledge Discovery Platform
                        </span>
                    </motion.div>

                    {/* Main title */}
                    <motion.h1
                        variants={itemVariants}
                        className="mt-6 text-5xl font-medium leading-none tracking-tight text-teal-800 sm:text-6xl lg:text-7xl"
                        style={{ fontFamily: "Roboto Slab" }}
                    >
                        MASHome
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={itemVariants}
                        className="mt-5 max-w-xl text-xl font-normal leading-snug text-slate-700 sm:text-2xl"
                    >
                        Accelerating MASLD Research through Integrated Knowledge
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="mt-4 max-w-xl text-base font-light leading-8 text-slate-600 sm:text-lg"
                    >
                        Explore interconnected biomedical datasets including therapeutic
                        targets, approved drugs, genes, biomarkers, bioactives, clinical
                        trials and scientific literature through a unified research platform.
                    </motion.p>

                    {/* Stats */}
                    <motion.dl
                        variants={itemVariants}
                        className="mt-7 flex flex-wrap gap-x-7 gap-y-3"
                    >
                        {STATS.map(({ value, label, Icon }, index) => (
                            <div
                                key={label}
                                className="flex items-center gap-2.5"
                            >
                                <span
                                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white ${
                                        [
                                            "from-teal-400 to-teal-600",
                                            "from-emerald-400 to-emerald-600",
                                            "from-cyan-400 to-sky-600",
                                        ][index % 3]
                                    }`}
                                >
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                </span>

                                <div className="flex flex-col-reverse">
                                    <dt className="text-xs text-slate-500">
                                        {label}
                                    </dt>
                                    <dd
                                        className="text-base font-medium leading-tight text-teal-800 sm:text-lg"
                                        style={{ fontFamily: "Roboto Slab" }}
                                    >
                                        {value}
                                    </dd>
                                </div>
                            </div>
                        ))}
                    </motion.dl>

                    {/* CTA buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-9 flex flex-wrap items-center gap-3"
                    >
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="group inline-flex items-center gap-2.5 rounded-xl bg-teal-700 px-7 py-3.5 text-base font-medium text-white shadow-sm transition duration-200 hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:active:scale-100"
                        >
                            <Search size={18} aria-hidden="true" />
                            <span>Explore Database</span>
                        </button>

                        {/* Secondary CTA */}
                        <button
                            type="button"
                            onClick={() => navigate("/publications")}
                            className="group inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-medium text-slate-800 transition-colors duration-200 hover:border-teal-600 hover:text-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                        >
                            <span>Publications</span>
                            <ArrowRight
                                size={18}
                                aria-hidden="true"
                                className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                            />
                        </button>
                    </motion.div>
                </motion.div>

                {/* Right side: MASLD hub with its data types */}
                <div className="lg:col-span-5">
                    <div
                        className="relative mx-auto aspect-square w-full max-w-md"
                        onMouseLeave={() => setPaused(false)}
                    >
                        {/* Soft glass disc */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-[8%] rounded-full border border-white/70 bg-gradient-to-br from-white/80 to-teal-100/40 shadow-xl shadow-teal-900/5"
                        />
                        {/* Orbit */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-x-[16%] inset-y-[10%] rounded-full border border-dashed border-teal-200"
                        />

                        {/* Connections from the hub to each data type */}
                        <svg
                            viewBox="0 0 100 100"
                            aria-hidden="true"
                            className="absolute inset-0 h-full w-full"
                        >
                            {DROPLETS.map((d, i) => {
                                const angle = (-90 + (360 / DROPLETS.length) * i) * (Math.PI / 180);
                                const x = 50 + 34 * Math.cos(angle);
                                const y = 50 + 40 * Math.sin(angle);
                                const isActive = i === active;
                                return (
                                    <line
                                        key={d.label}
                                        x1={50}
                                        y1={50}
                                        x2={x}
                                        y2={y}
                                        strokeLinecap="round"
                                        strokeWidth={isActive ? 0.6 : 0.3}
                                        className={`transition-all duration-500 ${
                                            isActive ? "stroke-teal-500" : "stroke-teal-200"
                                        }`}
                                    />
                                );
                            })}
                        </svg>

                        {/* Hub */}
                        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-teal-100 bg-white shadow-lg shadow-teal-900/10">
                            <span
                                className="text-lg font-medium tracking-tight text-teal-700"
                                style={{ fontFamily: "Roboto Slab" }}
                            >
                                MASLD
                            </span>
                            <span className="text-[10px] text-slate-400">Knowledge hub</span>
                        </div>

                        {/* Data types around the hub */}
                        <ul aria-label="Data types in the platform">
                            {DROPLETS.map((d, i) => {
                                const angle = (-90 + (360 / DROPLETS.length) * i) * (Math.PI / 180);
                                const left = 50 + 34 * Math.cos(angle);
                                const top = 50 + 40 * Math.sin(angle);
                                const isActive = i === active;

                                return (
                                    <li
                                        key={d.label}
                                        className="absolute -translate-x-1/2 -translate-y-1/2"
                                        style={{ left: `${left}%`, top: `${top}%` }}
                                        onMouseEnter={() => {
                                            setActive(i);
                                            setPaused(true);
                                        }}
                                    >
                                        <motion.div
                                            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: isActive ? 1.06 : 1 }}
                                            transition={{
                                                duration: 0.4,
                                                ease: "easeOut",
                                                delay: reduceMotion ? 0 : d.delay,
                                            }}
                                            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-normal transition-colors duration-500 sm:text-sm ${
                                                isActive
                                                    ? "border-teal-500 bg-teal-600 text-white shadow-lg shadow-teal-700/25"
                                                    : "border-teal-100 bg-white/90 text-teal-700 shadow-sm"
                                            }`}
                                        >
                                            {d.label}
                                        </motion.div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <p className="mt-3 text-center text-sm text-slate-500">
                        {DROPLETS.length} integrated data types
                    </p>
                </div>
            </div>
        </motion.section>
    );
}