import {
  HeartPulse,
  Activity,
  Crosshair,
  Pill,
  FlaskConical,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { type Variants } from "framer-motion";
const workflow = [
  {
    title: "Disease",
    description: "MASLD",
    icon: HeartPulse,
    color: "text-red-600",
  },
  {
    title: "Biomarkers",
    description: "Identify disease indicators",
    icon: Activity,
    color: "text-orange-600",
  },
  {
    title: "Targets",
    description: "Therapeutic target discovery",
    icon: Crosshair,
    color: "text-blue-600",
  },
  {
    title: "Drugs",
    description: "Drug discovery & repurposing",
    icon: Pill,
    color: "text-emerald-600",
  },
  {
    title: "Clinical Trials",
    description: "Evaluate treatments",
    icon: FlaskConical,
    color: "text-purple-600",
  },
  {
    title: "Literature",
    description: "Scientific evidence",
    icon: BookOpen,
    color: "text-slate-700",
  },
];

export default function ResearchWorkflow() {
 

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

 

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      className="mt-24 bg-white px-4 py-12 rounded-3xl"
    >
      <motion.div 
        variants={headerVariants}
        className="mb-12 text-center"
      >
        <h2
          className="text-4xl font-light text-slate-900"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Research Workflow
        </h2>

        <p className="mt-3 text-lg text-slate-600" style={{ fontFamily: "Roboto Slab" }}>
          MASHome integrates biomedical knowledge across the complete research
          pipeline.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {workflow.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.title} className="flex items-center">
              <motion.div 
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="w-56 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                  className={`mx-auto mb-4 inline-flex rounded-full bg-slate-100 p-4 ${step.color}`}
                >
                  <Icon size={32} />
                </motion.div>

                <h3
                  className="text-xl font-bold text-slate-800"
                  style={{ fontFamily: "Roboto Slab" }}
                >
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600" style={{ fontFamily: "Roboto Slab" }}>
                  {step.description}
                </p>
              </motion.div>

              {index < workflow.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: false }}
                >
                  <ArrowRight
                    size={28}
                    className="mx-4 hidden text-slate-400 xl:block"
                  />
                </motion.div>
              )}
            </div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}