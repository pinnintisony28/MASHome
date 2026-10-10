import {
  Database,
  Microscope,
  Search,
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
    icon: Search,
    title: "Advanced Search",
    description:
      "Search genes, targets, drugs, biomarkers, and publications from a single place.",
    color: "from-blue-50 to-sky-50",
    iconColor: "#3B82F6",
  },
  {
    icon: Microscope,
    title: "Research Support",
    description:
      "Designed to assist researchers, faculty members, and students working on MASLD.",
    color: "from-amber-50 to-orange-50",
    iconColor: "#F59E0B",
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
      className="about-root relative mt-16 overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 px-4 py-14 sm:px-10 sm:py-16"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300..800&display=swap');
        .about-root, .about-root * { font-family: 'Roboto Slab', Georgia, serif; }
      `}</style>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
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

            <motion.p
              variants={itemVariants}
              className="mt-6 text-base leading-8 text-slate-700"
            >
              MASHome is a comprehensive biomedical knowledge discovery
              platform developed to support research in Metabolic
              Dysfunction-Associated Steatotic Liver Disease (MASLD).
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-base leading-8 text-slate-600"
            >
              The platform integrates therapeutic targets, approved
              drugs, genes, biomarkers, bioactives, clinical trials,
              and scientific literature into a single searchable
              environment, enabling efficient exploration of
              interconnected biomedical knowledge.
            </motion.p>
          </motion.div>

          {/* Right Column: bento tiles */}
          <motion.div
            variants={rightVariants}
            className="grid gap-4 sm:grid-cols-2"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              const featured = index === 0;
              const wide = index === 0;

              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-shadow duration-300 hover:shadow-xl sm:p-7 ${
                    wide ? "sm:col-span-2" : ""
                  } ${
                    featured
                      ? "bg-emerald-800 text-white shadow-lg shadow-emerald-900/20"
                      : "border border-slate-200 bg-white shadow-sm hover:shadow-slate-900/10"
                  }`}
                >
                  {/* Oversized background icon */}
                  <Icon
                    aria-hidden="true"
                    size={featured ? 150 : 110}
                    strokeWidth={1.25}
                    className="pointer-events-none absolute -bottom-6 -right-4 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105"
                    style={{
                      color: featured ? "#ffffff" : item.iconColor,
                      opacity: featured ? 0.1 : 0.09,
                    }}
                  />

                  <div className="relative">
                    <div
                      className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                      style={
                        featured
                          ? { backgroundColor: "rgba(255,255,255,0.15)" }
                          : { backgroundColor: `${item.iconColor}1A` }
                      }
                    >
                      <Icon
                        size={24}
                        style={{ color: featured ? "#ffffff" : item.iconColor }}
                      />
                    </div>

                    <h3
                      className={`text-lg font-semibold leading-snug ${
                        featured ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`mt-2 max-w-md text-sm leading-6 ${
                        featured ? "text-emerald-50/85" : "text-slate-600"
                      }`}
                    >
                      {item.description}
                    </p>
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