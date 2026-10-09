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

type HeroProps = {
    onSearch?: () => void;
};

/*
  Design notes
  - Concept: a microscope field of view. MASLD is fatty liver disease, so the platform's
    seven data types are drawn as lipid droplets seen in a tissue section.
  - The droplets light up one after another (a quiet guided tour of what is inside) and
    hovering a droplet pauses the tour on it.
  - A graduated ring turns very slowly around the field, with a fixed pointer at the top.
  - Palette: ink teal #134E4A, teal-700 (action), teal-100/300 (droplets), mist #F0FAF8,
    emerald-500 (one small accent). Typography: Roboto Slab throughout.
  - Reduced motion: no entrance, no ring turn, no automatic tour.
*/

const STATS = [
    { value: "50K+", label: "Publications", Icon: BookOpen },
    { value: "2K+", label: "Compounds", Icon: Flask },
    { value: "500+", label: "Clinical Trials", Icon: Microscope },
];

/* Data types as droplets: size is the diameter and x/y the centre, in % of the field */
const DROPLETS = [
    { label: "Genes", size: 32, x: 50, y: 50, delay: 0.2 },
    { label: "Therapeutic targets", size: 26, x: 50, y: 20, delay: 0.35 },
    { label: "Approved drugs", size: 26, x: 76, y: 35, delay: 0.45 },
    { label: "Biomarkers", size: 24, x: 76.8, y: 65.5, delay: 0.55 },
    { label: "Bioactives", size: 26, x: 50, y: 80, delay: 0.65 },
    { label: "Clinical trials", size: 28, x: 24, y: 65, delay: 0.75 },
    { label: "Literature", size: 26, x: 23.2, y: 34.5, delay: 0.85 },
];

/* Graduated ring: 72 ticks, every sixth one longer */
const TICKS = Array.from({ length: 72 }, (_, i) => {
    const a = (i * 5 * Math.PI) / 180;
    const major = i % 6 === 0;
    const r1 = 98;
    const r2 = major ? 90 : 94.5;
    return {
        x1: 100 + r1 * Math.sin(a),
        y1: 100 - r1 * Math.cos(a),
        x2: 100 + r2 * Math.sin(a),
        y2: 100 - r2 * Math.cos(a),
        major,
    };
});

/* PREVIEW ONLY: the router library isn't available in the preview, so navigation is stubbed.
   In your project use Hero.creative.tsx, which keeps useNavigate and navigates to /dashboard. */
const useNavigate = () => (path: string) => {
    console.log("navigate to", path);
};

export default function Hero({ onSearch }: HeroProps) {
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    /* Light up the droplets one at a time */
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
            className="relative overflow-hidden rounded-3xl border border-teal-100 bg-[#F0FAF8]"
            style={{ fontFamily: "Roboto Slab" }}
        >
            {/* Faint concentric rings behind the field, like an eyepiece */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
                <div className="absolute -right-48 top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full border border-teal-200/60" />
                <div className="absolute -right-24 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full border border-teal-200/50" />
            </div>

            <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-14 lg:py-20">
                {/* Left content */}
                <motion.div
                    variants={leftVariants}
                    initial={reduceMotion ? false : "hidden"}
                    animate="visible"
                    className="text-center lg:col-span-7 lg:text-left"
                >
                    {/* Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2"
                    >
                        <Sparkles className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                        <span className="text-sm font-medium text-teal-800">
                            MASLD Knowledge Discovery Platform
                        </span>
                    </motion.div>

                    {/* Main title */}
                    <motion.h1
                        variants={itemVariants}
                        className="mt-6 text-6xl font-bold leading-[0.95] tracking-tight text-[#134E4A] sm:text-7xl lg:text-8xl"
                        style={{ fontFamily: "Roboto Slab" }}
                    >
                        MASHome
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto mt-6 max-w-xl text-2xl font-semibold leading-snug tracking-tight text-slate-800 sm:text-3xl lg:mx-0"
                    >
                        Accelerating MASLD Research through Integrated Knowledge
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600 lg:mx-0"
                    >
                        Explore interconnected biomedical datasets including therapeutic
                        targets, approved drugs, genes, biomarkers, bioactives, clinical
                        trials and scientific literature through a unified research platform.
                    </motion.p>

                    {/* Stats */}
                    <motion.dl
                        variants={itemVariants}
                        className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 lg:justify-start"
                    >
                        {STATS.map(({ value, label, Icon }) => (
                            <div key={label} className="flex flex-row-reverse items-center gap-3">
                                <div className="text-left">
                                    <dt className="text-xs text-slate-500">{label}</dt>
                                    <dd
                                        className="text-xl font-bold leading-tight text-[#134E4A]"
                                        style={{ fontFamily: "Roboto Slab" }}
                                    >
                                        {value}
                                    </dd>
                                </div>
                                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-teal-100 bg-white text-teal-700">
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                            </div>
                        ))}
                    </motion.dl>

                    {/* CTA buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start"
                    >
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="group inline-flex items-center gap-2.5 rounded-xl bg-teal-700 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition duration-200 hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F0FAF8] active:scale-[0.98] motion-reduce:active:scale-100"
                        >
                            <Search size={18} aria-hidden="true" />
                            <span>Explore Database</span>
                            <ArrowRight
                                size={18}
                                aria-hidden="true"
                                className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                            />
                        </button>

                        {/* Secondary CTA */}
                        <button
                            type="button"
                            className="group inline-flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-teal-900 transition-colors duration-200 hover:bg-teal-100/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                        >
                            <span>Learn More</span>
                            <ArrowRight
                                size={18}
                                aria-hidden="true"
                                className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                            />
                        </button>
                    </motion.div>
                </motion.div>

                {/* Right side: microscope field */}
                <div className="lg:col-span-5">
                    <div className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-md">
                        {/* Slowly turning graduated ring */}
                        <motion.svg
                            viewBox="0 0 200 200"
                            aria-hidden="true"
                            className="absolute inset-0 h-full w-full"
                            animate={reduceMotion ? undefined : { rotate: 360 }}
                            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
                        >
                            {TICKS.map((t, i) => (
                                <line
                                    key={i}
                                    x1={t.x1}
                                    y1={t.y1}
                                    x2={t.x2}
                                    y2={t.y2}
                                    strokeLinecap="round"
                                    strokeWidth={t.major ? 1.4 : 0.8}
                                    className={t.major ? "stroke-teal-700" : "stroke-teal-300"}
                                />
                            ))}
                        </motion.svg>

                        {/* Fixed pointer: the ring turns past it */}
                        <svg
                            viewBox="0 0 12 10"
                            aria-hidden="true"
                            className="absolute -top-2 left-1/2 h-2.5 w-3 -translate-x-1/2 fill-emerald-500"
                        >
                            <polygon points="0,0 12,0 6,10" />
                        </svg>

                        {/* The field */}
                        <div className="absolute inset-[6%] overflow-hidden rounded-full border border-teal-200 bg-white/70">
                            <ul aria-label="Data types in the platform">
                                {DROPLETS.map((d, i) => {
                                    const isActive = i === active;
                                    return (
                                        <motion.li
                                            key={d.label}
                                            initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 120,
                                                damping: 16,
                                                delay: d.delay,
                                            }}
                                            onMouseEnter={() => {
                                                setActive(i);
                                                setPaused(true);
                                            }}
                                            onMouseLeave={() => setPaused(false)}
                                            className={`absolute flex aspect-square items-center justify-center rounded-full border text-center transition-colors duration-500 ${
                                                isActive
                                                    ? "border-teal-700 bg-teal-600"
                                                    : "border-teal-300/80 bg-teal-100/60"
                                            }`}
                                            style={{
                                                width: `${d.size}%`,
                                                left: `${d.x - d.size / 2}%`,
                                                top: `${d.y - d.size / 2}%`,
                                            }}
                                        >
                                            {/* membrane ring */}
                                            <span
                                                aria-hidden="true"
                                                className={`pointer-events-none absolute inset-1.5 rounded-full border transition-colors duration-500 ${
                                                    isActive ? "border-teal-300/70" : "border-teal-200"
                                                }`}
                                            />
                                            <span
                                                className={`relative px-1 font-medium leading-tight transition-colors duration-500 ${
                                                    i === 0
                                                        ? "text-sm sm:text-base"
                                                        : "text-[10px] sm:text-xs"
                                                } ${isActive ? "text-white" : "text-teal-900"}`}
                                            >
                                                {d.label}
                                            </span>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Scale bar, as on a microscopy figure */}
                    <div className="mt-4 flex items-center justify-center gap-3 text-xs text-teal-900/80 sm:text-sm">
                        <span
                            aria-hidden="true"
                            className="relative block h-2 w-14 border-x-2 border-teal-700/70 after:absolute after:inset-x-0 after:top-1/2 after:h-0.5 after:-translate-y-1/2 after:bg-teal-700/70"
                        />
                        7 integrated data types
                    </div>
                </div>
            </div>
        </motion.section>
    );
}