import { Search, ArrowRight, Sparkles, BookOpen, FlaskRound as Flask, Microscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

type HeroProps = {
    onSearch?: () => void;
};

export default function Hero({ onSearch }: HeroProps) {
    const navigate = useNavigate();

    // Container animation
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    // Left content animation
    const leftVariants: Variants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    // Right content animation
    const rightVariants: Variants = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    // Stagger children
    const staggerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    // Individual item animation
    const itemVariants: Variants = {
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
        <motion.section 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-teal-50/40 px-8 py-16 shadow-xl border border-slate-200/60"
        >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-teal-500/5 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-3xl" />
                <div className="absolute top-1/2 right-1/4 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-2xl" />
            </div>

            <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center">
                {/* Left Content */}
                <motion.div 
                    variants={leftVariants}
                    className="flex-1 text-center lg:text-left"
                >
                    <motion.div 
                        variants={staggerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                    >
                        {/* Badge */}
                        <motion.div 
                            variants={itemVariants}
                            className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600/10 to-emerald-600/10 px-5 py-2.5 backdrop-blur-sm border border-teal-500/20"
                        >
                            <Sparkles className="h-4 w-4 text-teal-600" />
                            <span className="text-sm font-semibold text-teal-700 tracking-wide">
                                MASLD Knowledge Discovery Platform
                            </span>
                        </motion.div>

                        {/* Main Title */}
                        <motion.h1
                            variants={itemVariants}
                            className="mb-3 bg-gradient-to-r from-slate-900 via-teal-800 to-emerald-800 bg-clip-text text-6xl font-bold text-transparent"
                            style={{ fontFamily: "Roboto Slab" }}
                        >
                            MASHome
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={itemVariants}
                            className="mb-4 text-2xl font-semibold text-slate-800 tracking-tight"
                        >
                            Accelerating MASLD Research through{" "}
                            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                                Integrated Knowledge
                            </span>
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 lg:mx-0"
                        >
                            Explore interconnected biomedical datasets including therapeutic
                            targets, approved drugs, genes, biomarkers, bioactives, clinical
                            trials and scientific literature through a unified research platform.
                        </motion.p>

                        {/* Stats Section */}
                        <motion.div 
                            variants={itemVariants}
                            className="mt-8 flex flex-wrap justify-center gap-8 lg:justify-start"
                        >
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-teal-50 p-2">
                                    <BookOpen className="h-5 w-5 text-teal-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">50K+</p>
                                    <p className="text-xs text-slate-500">Publications</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-emerald-50 p-2">
                                    <Flask className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">2K+</p>
                                    <p className="text-xs text-slate-500">Compounds</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-cyan-50 p-2">
                                    <Microscope className="h-5 w-5 text-cyan-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">500+</p>
                                    <p className="text-xs text-slate-500">Clinical Trials</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div 
                            variants={itemVariants}
                            className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start"
                        >
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-teal-600/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-teal-600/40 active:scale-95"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-teal-700 to-emerald-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <Search size={20} className="relative z-10" />
                                <span className="relative z-10">Explore Database</span>
                                <ArrowRight
                                    size={18}
                                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </button>

                            {/* Secondary CTA */}
                            <button className="group flex items-center gap-2 rounded-2xl px-6 py-4 text-base font-medium text-slate-600 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900">
                                <span>Learn More</span>
                                <ArrowRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Right Side - SVG Illustration */}
                <motion.div 
                    variants={rightVariants}
                    className="flex-1"
                >
                    <div className="relative">
                        {/* Floating decorative elements */}
                        <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-teal-500/10 backdrop-blur-sm border border-teal-500/20" />
                        <div className="absolute -bottom-4 -right-4 h-12 w-12 rounded-full bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20" />

                        <svg
                            viewBox="0 0 500 400"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-auto w-full"
                        >
                            {/* Background decorative circles */}
                            <circle cx="250" cy="200" r="180" fill="#E6F7F3" opacity="0.3" />
                            <circle cx="250" cy="200" r="140" fill="#D1F0EA" opacity="0.3" />
                            <circle cx="250" cy="200" r="100" fill="#B8E8DF" opacity="0.2" />

                            {/* Central DNA/Helix structure */}
                            <g transform="translate(250, 200)">
                                {/* Left strand */}
                                <path
                                    d="M-80,-150 C-60,-100 -100,-50 -80,0 C-60,50 -100,100 -80,150"
                                    stroke="#0D9488"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    fill="none"
                                    className="opacity-60"
                                />
                                {/* Right strand */}
                                <path
                                    d="M80,-150 C60,-100 100,-50 80,0 C60,50 100,100 80,150"
                                    stroke="#0D9488"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    fill="none"
                                    className="opacity-60"
                                />

                                {/* Cross connections (rungs) */}
                                {[-120, -80, -40, 0, 40, 80, 120].map((y, i) => (
                                    <line
                                        key={i}
                                        x1={-80 + (i % 2 === 0 ? 10 : 0)}
                                        y1={y}
                                        x2={80 - (i % 2 === 0 ? 0 : 10)}
                                        y2={y}
                                        stroke="#14B8A6"
                                        strokeWidth="2"
                                        opacity="0.4"
                                    />
                                ))}

                                {/* Nodes on strands */}
                                {[-140, -100, -60, -20, 20, 60, 100, 140].map((y, i) => (
                                    <g key={`left-${i}`}>
                                        <circle
                                            cx={-80 + (i % 2 === 0 ? 15 : -15)}
                                            cy={y}
                                            r="8"
                                            fill="#0D9488"
                                            opacity="0.8"
                                        />
                                        <circle
                                            cx={-80 + (i % 2 === 0 ? 15 : -15)}
                                            cy={y}
                                            r="4"
                                            fill="#CCFBF1"
                                        />
                                    </g>
                                ))}
                                {[-140, -100, -60, -20, 20, 60, 100, 140].map((y, i) => (
                                    <g key={`right-${i}`}>
                                        <circle
                                            cx={80 - (i % 2 === 0 ? 15 : -15)}
                                            cy={y}
                                            r="8"
                                            fill="#0D9488"
                                            opacity="0.8"
                                        />
                                        <circle
                                            cx={80 - (i % 2 === 0 ? 15 : -15)}
                                            cy={y}
                                            r="4"
                                            fill="#CCFBF1"
                                        />
                                    </g>
                                ))}
                            </g>

                            {/* Floating data nodes */}
                            <g opacity="0.3">
                                <circle cx="100" cy="80" r="6" fill="#14B8A6" />
                                <circle cx="400" cy="100" r="6" fill="#14B8A6" />
                                <circle cx="80" cy="320" r="6" fill="#14B8A6" />
                                <circle cx="420" cy="300" r="6" fill="#14B8A6" />
                                <circle cx="150" cy="350" r="4" fill="#14B8A6" />
                                <circle cx="350" cy="60" r="4" fill="#14B8A6" />
                            </g>

                            {/* Connecting lines */}
                            <g opacity="0.15">
                                <line x1="100" y1="80" x2="170" y2="120" stroke="#14B8A6" strokeWidth="1" />
                                <line x1="400" y1="100" x2="330" y2="120" stroke="#14B8A6" strokeWidth="1" />
                                <line x1="80" y1="320" x2="170" y2="280" stroke="#14B8A6" strokeWidth="1" />
                                <line x1="420" y1="300" x2="330" y2="280" stroke="#14B8A6" strokeWidth="1" />
                            </g>

                            {/* Decorative dots around */}
                            {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360].map((angle, i) => (
                                <circle
                                    key={i}
                                    cx={250 + 190 * Math.cos(angle * Math.PI / 180)}
                                    cy={200 + 190 * Math.sin(angle * Math.PI / 180)}
                                    r="3"
                                    fill="#14B8A6"
                                    opacity="0.2"
                                />
                            ))}
                        </svg>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}