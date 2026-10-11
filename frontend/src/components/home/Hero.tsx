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
  - Left column restyled only; right column (data-type hub) content is unchanged.
  - Background: white, with a soft linear gradient on the right side only
    (emerald, fades out toward the middle); no colour glows.
  - Typography: Roboto Slab throughout; only the second half of the main
    heading uses a cursive script (Dancing Script).
  - Text colours are soft (teal-700 / slate-500 / slate-600), nothing near black.
  - Reduced motion: no entrance and no automatic tour.
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
            className="hero-bg relative overflow-hidden rounded-3xl border border-slate-200 bg-white"
            style={{ fontFamily: "'Roboto Slab', serif" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600&family=Roboto+Slab:wght@300;400;500&display=swap');
                .hero-cursive {
                    font-family: 'Dancing Script', cursive;
                    font-weight: 600;
                }
            `}</style>

            {/* Right-side linear gradient (decorative).
                Mobile: fades up from the bottom, behind the stacked hub.
                Desktop (lg): covers the right ~45% and fades out to the left. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-emerald-200/70 via-emerald-100/60 to-transparent lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[45%] lg:bg-gradient-to-l"
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
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5"
                    >
                        <Sparkles className="h-4 w-4 text-teal-500" aria-hidden="true" />
                        <span className="text-sm font-normal tracking-wide text-slate-600">
                            MASLD Knowledge Discovery Platform
                        </span>
                    </motion.div>

                    {/* Main title: Roboto Slab + cursive */}
                    <motion.h1
                        variants={itemVariants}
                        className="mt-6 text-5xl leading-none tracking-tight text-teal-700 sm:text-6xl lg:text-7xl"
                        style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                        <span className="font-normal">MAS</span>
                        <span className="hero-cursive ml-1 text-[1.15em] text-teal-600">
                            Home
                        </span>
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
                       className="mt-4 max-w-xl text-base font-normal leading-8 text-slate-600 sm:text-lg"
                    >
                        Explore interconnected biomedical datasets including therapeutic
                        targets, approved drugs, genes, biomarkers, bioactives, clinical
                        trials and scientific literature through a unified research platform.
                    </motion.p>

                    {/* Stats */}
                    <motion.dl
                        variants={itemVariants}
                        className="mt-7 flex flex-wrap gap-x-8 gap-y-3"
                    >
                        {STATS.map(({ value, label, Icon }) => (
                            <div key={label} className="flex items-center gap-2.5">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                </span>

                                <div className="flex flex-col-reverse">
                                    <dt className="text-xs font-normal text-slate-500">
                                        {label}
                                    </dt>
                                    <dd className="text-base font-medium leading-tight text-teal-700 sm:text-lg">
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
                            className="group inline-flex items-center gap-2.5 rounded-xl bg-teal-600 px-7 py-3.5 text-base font-medium text-white shadow-sm transition duration-200 hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:active:scale-100"
                        >
                            <Search size={18} aria-hidden="true" />
                            <span>Explore Database</span>
                        </button>

                        {/* Secondary CTA */}
                        <button
                            type="button"
                            onClick={() => navigate("/publications")}
                            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-medium text-slate-600 transition-colors duration-200 hover:border-teal-500 hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
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

                {/* Right side: MASLD hub with its data types (unchanged) */}
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