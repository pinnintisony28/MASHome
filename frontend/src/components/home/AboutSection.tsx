import {
  BookOpen,
  Database,
  Microscope,
  Network,
} from "lucide-react";
import { motion , type Variants } from "framer-motion";

const highlights = [
  {
    icon: Database,
    title: "Integrated Biomedical Data",
    description:
      "Combine multiple biomedical datasets into a unified research platform.",
    color: "from-emerald-50 to-teal-50",
    iconColor: "#10B981",
  },
  {
    icon: Network,
    title: "Knowledge Discovery",
    description:
      "Explore relationships among targets, drugs, genes, biomarkers, and clinical trials.",
    color: "from-purple-50 to-indigo-50",
    iconColor: "#8B5CF6",
  },
  {
    icon: Microscope,
    title: "Research Support",
    description:
      "Designed to assist researchers, faculty members, and students working on MASLD.",
    color: "from-amber-50 to-orange-50",
    iconColor: "#F59E0B",
  },
  {
    icon: BookOpen,
    title: "Scientific Resources",
    description:
      "Provide organized biomedical information for learning, exploration, and future research.",
    color: "from-rose-50 to-pink-50",
    iconColor: "#F43F5E",
  },
];

export default function AboutSection() {
  // Animation Variants
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const leftVariants :Variants = {
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

  const rightVariants:Variants = {
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

  const itemVariants :Variants= {
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
      className="mt-16 px-4 py-16 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 border border-slate-200/40"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left Column */}
          <motion.div variants={leftVariants}>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 mb-4">
              <Database size={16} />
              <span>About MASHome</span>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4">
              <h2
                className="text-3xl font-light text-slate-900 relative inline-block"
                style={{ fontFamily: "Roboto Slab" }}
              >
                A Unified Biomedical Knowledge Platform
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-emerald-500 rounded-full" />
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-slate-600 leading-relaxed mb-4" style={{ fontFamily: "Roboto Slab" }}>
              MASHome is a comprehensive biomedical knowledge discovery
              platform developed to support research in Metabolic
              Dysfunction-Associated Steatotic Liver Disease (MASLD).
            </motion.p>

            <motion.p variants={itemVariants} className="text-slate-600 leading-relaxed" style={{ fontFamily: "Roboto Slab" }}>
              The platform integrates therapeutic targets, approved
              drugs, genes, biomarkers, bioactives, clinical trials,
              and scientific literature into a single searchable
              environment, enabling efficient exploration of
              interconnected biomedical knowledge.
            </motion.p>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            variants={rightVariants}
            className="space-y-4"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ 
                    x: 4,
                    transition: { duration: 0.2 }
                  }}
                  className={`border border-slate-200 rounded-xl p-5 hover:border-emerald-200 transition-colors bg-gradient-to-br ${item.color}`}
                >
                  <div className="flex items-start gap-4" style={{ fontFamily: "Roboto Slab" }}>
                    <motion.div 
                      whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                      className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center border border-white/50`}
                    >
                      <Icon size={20} style={{ color: item.iconColor }} />
                    </motion.div>

                    <div>
                      <h3
                        className="text-sm font-semibold text-slate-900 mb-1"
                        style={{ fontFamily: "Roboto Slab" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}