import { useNavigate } from "react-router-dom";
import { motion ,type Variants } from "framer-motion";
import {
  Crosshair,
  Pill,
  Dna,
  Leaf,
  Activity,
  FlaskConical,
  ArrowRight,
  Sparkles,
  Target,
  Syringe,
  Flower2,
  HeartPulse,
  TestTube,
  Database,
  Network,
  Atom,
  Beaker,
  ChevronRight,
} from "lucide-react";

const modules = [
  {
    title: "Targets",
    description:
      "Explore therapeutic targets involved in MASLD and related diseases.",
    icon: Crosshair,
    secondaryIcon: Target,
    color: "from-indigo-500 to-purple-500",
    iconColor: "#6366F1",
    bgColor: "from-indigo-50 to-purple-50",
    path: "/targets",
    stat: "1,247 targets",
    pageBg: "from-indigo-50/30 to-purple-50/30",
  },
  {
    title: "Drugs",
    description:
      "Browse approved drugs and investigational therapeutic compounds.",
    icon: Pill,
    secondaryIcon: Syringe,
    color: "from-emerald-500 to-teal-500",
    iconColor: "#10B981",
    bgColor: "from-emerald-50 to-teal-50",
    path: "/drugs",
    stat: "3,892 compounds",
    pageBg: "from-emerald-50/30 to-teal-50/30",
  },
  {
    title: "Genes",
    description:
      "Discover genes associated with disease mechanisms and pathways.",
    icon: Dna,
    secondaryIcon: Atom,
    color: "from-rose-500 to-pink-500",
    iconColor: "#F43F5E",
    bgColor: "from-rose-50 to-pink-50",
    path: "/genes",
    stat: "15,643 genes",
    pageBg: "from-rose-50/30 to-pink-50/30",
  },
  {
    title: "Bioactives",
    description:
      "Explore natural compounds with potential therapeutic activity.",
    icon: Leaf,
    secondaryIcon: Flower2,
    color: "from-amber-500 to-orange-500",
    iconColor: "#F59E0B",
    bgColor: "from-amber-50 to-orange-50",
    path: "/bioactives",
    stat: "8,451 bioactives",
    pageBg: "from-amber-50/30 to-orange-50/30",
  },
  {
    title: "Biomarkers",
    description:
      "Investigate biomarkers for diagnosis, prognosis and treatment.",
    icon: Activity,
    secondaryIcon: HeartPulse,
    color: "from-cyan-500 to-blue-500",
    iconColor: "#06B6D4",
    bgColor: "from-cyan-50 to-blue-50",
    path: "/biomarkers",
    stat: "2,103 biomarkers",
    pageBg: "from-cyan-50/30 to-blue-50/30",
  },
  {
    title: "Clinical Trials",
    description:
      "Access ongoing and completed clinical trials related to MASLD.",
    icon: FlaskConical,
    secondaryIcon: TestTube,
    color: "from-violet-500 to-indigo-500",
    iconColor: "#8B5CF6",
    bgColor: "from-violet-50 to-indigo-50",
    path: "/clinical-trials",
    stat: "876 trials",
    pageBg: "from-violet-50/30 to-indigo-50/30",
  },
];

export default function BrowseDatabaseAlt() {
  const navigate = useNavigate();

  // Animation Variants
  const containerVariants :Variants= {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const headerVariants:Variants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const statsVariants:Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      id="browse-database" 
      className="px-4 py-12 rounded-3xl bg-gradient-to-br from-slate-50/50 via-white to-slate-50/30 border border-slate-200/40"
    >
      {/* Header Section */}
      <motion.div variants={headerVariants} className="mb-12 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-200/50 px-4 py-1.5 border border-slate-200/60 backdrop-blur-sm">
            <Database className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-xs font-medium text-slate-600 tracking-wider uppercase">
              Research Modules
            </span>
          </div>
          
          <div className="mb-4">
  <h2
    className="text-3xl font-light text-slate-900 relative inline-block"
    style={{ fontFamily: "Roboto Slab" }}
  >
    Browse Database
    <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-emerald-500 rounded-full" />
    <span className="absolute -bottom-2 left-14 w-2 h-0.5 bg-emerald-300 rounded-full" />
  </h2>
</div>
          
          <p className="mt-2 text-1xl text-slate-600"style={{ fontFamily: "Roboto Slab" }}>
            Explore integrated biomedical datasets available in MASHome
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>6 Modules</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span>32K+ Data</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Weekly Updates</span>
          </div>
        </div>
      </motion.div>

      {/* Modules Grid */}
      <motion.div variants={containerVariants} className="grid gap-8 md:grid-cols-2">
        {modules.map((module) => {
          const Icon = module.icon;
          const SecondaryIcon = module.secondaryIcon;

          return (
            <motion.div
              key={module.title}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => navigate(module.path)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-0 shadow-sm transition-all duration-500 hover:border-slate-300 hover:shadow-xl"
            >
              <div className="flex flex-col md:flex-row" style={{ fontFamily: "Roboto Slab" }}>
                {/* Left Side - Icon Section */}
                <div className={`relative flex min-h-[180px] w-full items-center justify-center bg-gradient-to-br ${module.bgColor} p-8 md:w-1/3`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.pageBg} opacity-100 transition-opacity duration-500 group-hover:opacity-30`} />
                  
                  <div className="relative z-10 flex flex-col items-center gap-3" style={{ fontFamily: "Roboto Slab" }}>
                    <div className="rounded-2xl bg-white/80 p-4 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <Icon
                        size={28}
                        style={{ color: module.iconColor }}
                        strokeWidth={1.8}
                      />
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-medium text-slate-500">{module.stat}</span>
                    </div>
                  </div>
                  
                  {/* Decorative Pattern */}
                  <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-5 transition-opacity duration-500">
                    <SecondaryIcon size={100} strokeWidth={0.5} />
                  </div>
                </div>

                {/* Right Side - Content Section */}
                <div className="relative flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <h3
                      className="text-xl font-bold text-slate-800"
                      style={{ fontFamily: "Roboto Slab" }}
                    >
                      {module.title}
                    </h3>
                    <ChevronRight
  size={20}
  style={{ color: module.iconColor }}
  className="transition-transform duration-300 group-hover:translate-x-1"
/>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {module.description}
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
<SecondaryIcon
  size={12}
  style={{ color: module.iconColor }}
/>                      <span>{module.stat}</span>
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <span className={`text-xs font-medium bg-gradient-to-r ${module.color} bg-clip-text text-transparent`}>
                      Explore →
                    </span>
                  </div>

                  {/* Bottom Accent Line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-1/3 bg-gradient-to-r ${module.color} transition-all duration-500 group-hover:w-full`}
                  />
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div
                className={`absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-r ${module.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10`}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Access Bar */}
      <motion.div 
        variants={statsVariants}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <span className="text-sm font-medium text-slate-500 mr-2">Quick Access:</span>
        {modules.map((module) => {
          const SecondaryIcon = module.secondaryIcon;
          return (
            <button
              key={module.title}
              onClick={() => navigate(module.path)}
              className={`group flex items-center gap-2 rounded-full border border-slate-200/60 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-${module.color.split(' ')[0].replace('from-', '')}`}
            >
             <SecondaryIcon
  size={14}
  style={{ color: module.iconColor }}
/>
              <span>{module.title}</span>
            </button>
          );
        })}
      </motion.div>
    </motion.section>
  );
}