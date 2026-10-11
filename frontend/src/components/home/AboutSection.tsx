import {
  Database,
  Microscope,
  Search,
  Users,
  GraduationCap,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const highlights = [
  {
    icon: Database,
    tag: "Integrate",
    title: "Integrated Biomedical Data",
    description:
      "Combine multiple biomedical datasets into a unified research platform.",
    iconColor: "#10B981",
  },
  {
    icon: Search,
    tag: "Explore",
    title: "Advanced Search",
    description:
      "Search genes, targets, drugs, biomarkers, and publications from a single place.",
    iconColor: "#3B82F6",
  },
  {
    icon: Microscope,
    tag: "Support",
    title: "Research Support",
    description:
      "Designed to assist researchers, faculty members, and students working on MASLD.",
    iconColor: "#F59E0B",
  },
];

/* Data types that live inside the platform */
const dataTypes = [
  "Genes",
  "Therapeutic targets",
  "Approved drugs",
  "Biomarkers",
  "Bioactives",
  "Clinical trials",
  "Literature",
];

/* Sample result types shown under the search bar */
const resultTypes = [
  { label: "Gene", className: "bg-cyan-50 text-cyan-700 border-cyan-100" },
  { label: "Drug", className: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { label: "Biomarker", className: "bg-orange-50 text-orange-700 border-orange-100" },
  { label: "Trial", className: "bg-purple-50 text-purple-700 border-purple-100" },
];

/* Where the datasets are curated from */
const sources = ["GeneCards", "UniProt", "DrugBank", "KEGG", "ClinicalTrials.gov"];

/* Who the platform is built for */
const audience = [
  { label: "Researchers", Icon: Microscope },
  { label: "Faculty", Icon: Users },
  { label: "Students", Icon: GraduationCap },
];

export default function AboutSection() {
  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

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

  const rightVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
      className="about-root relative mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-white px-4 py-14 sm:px-10 sm:py-16"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300..800&family=Dancing+Script:wght@500;600;700&display=swap');
        .about-root, .about-root * { font-family: 'Roboto Slab', Georgia, serif; }
        /* Cursive accents (higher specificity than the rule above) */
        .about-root .about-cursive {
          font-family: 'Dancing Script', cursive;
          font-weight: 600;
        }
      `}</style>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <motion.div variants={leftVariants}>
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5"
            >
              <Database size={16} className="text-emerald-600" aria-hidden="true" />
              <span className="text-sm font-normal tracking-wide text-slate-600">
                About MASHome
              </span>
            </motion.div>

            {/* Heading: Roboto Slab + cursive */}
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="text-3xl font-normal leading-tight tracking-tight text-slate-700 sm:text-4xl lg:text-[2.75rem]">
                A Unified Biomedical{" "}
                <span className="about-cursive text-[1.15em] text-emerald-600">
                  Knowledge Platform
                </span>
                <span aria-hidden="true" className="mt-3 flex items-center gap-2">
                  <span className="h-1 w-20 rounded-full bg-emerald-600" />
                  <span className="h-1 w-5 rounded-full bg-emerald-300" />
                  <span className="h-1 w-1.5 rounded-full bg-emerald-200" />
                </span>
              </h2>
            </motion.div>

            {/* Lead paragraph with a cursive drop cap */}
            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-xl text-base leading-8 text-slate-700"
            >
              <span
                aria-hidden="true"
                className="about-cursive float-left mr-3 mt-1 text-7xl leading-[0.75] text-emerald-600"
              >
                M
              </span>
              <span className="sr-only">M</span>
              ASHome is a comprehensive biomedical knowledge discovery
              platform developed to support research in Metabolic
              Dysfunction-Associated Steatotic Liver Disease (MASLD).
            </motion.p>

            {/* Second paragraph on a vertical rule */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl border-l-2 border-emerald-200 pl-5 text-base font-light leading-8 text-slate-600"
            >
              The platform integrates therapeutic targets, approved
              drugs, genes, biomarkers, bioactives, clinical trials,
              and scientific literature into a single searchable
              environment, enabling efficient exploration of
              interconnected biomedical knowledge.
            </motion.p>

            {/* Data sources: a citation strip */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex max-w-xl flex-col overflow-hidden rounded-xl border border-slate-200 sm:flex-row"
            >
              <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-emerald-50/70 px-4 py-3 sm:border-b-0 sm:border-r">
                <Database size={16} className="text-emerald-600" aria-hidden="true" />
                <span className="text-sm font-medium text-emerald-800">
                  Curated from
                </span>
              </div>
              <ul className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-2 bg-white px-4 py-3">
                {sources.map((source) => (
                  <li
                    key={source}
                    className="text-sm text-slate-600 transition-colors duration-200 hover:text-emerald-700"
                  >
                    {source}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column: a connected pipeline */}
          <motion.ol variants={rightVariants} className="relative space-y-5">
            {/* Dashed rail linking the three steps */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-6 top-6 -translate-x-1/2 border-l-2 border-dashed border-emerald-200"
            />

            {highlights.map((item, index) => {
              const Icon = item.icon;
              const featured = index === 0;

              return (
                <motion.li
                  key={item.title}
                  variants={itemVariants}
                  className="relative pl-16 sm:pl-20"
                >
                  {/* Node on the rail */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white shadow-sm"
                    style={{ borderColor: item.iconColor }}
                  >
                    <Icon size={20} style={{ color: item.iconColor }} />
                  </span>

                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className={`rounded-2xl p-6 transition-shadow duration-300 hover:shadow-xl sm:p-7 ${
                      featured
                        ? "bg-emerald-800 text-white shadow-lg shadow-emerald-900/20"
                        : "border border-slate-200 bg-white shadow-sm hover:shadow-slate-900/10"
                    }`}
                  >
                    <span
                      className="about-cursive block text-2xl leading-none"
                      style={{ color: featured ? "#A7F3D0" : item.iconColor }}
                    >
                      {item.tag}
                    </span>

                    <h3
                      className={`mt-2 text-lg font-medium leading-snug ${
                        featured ? "text-white" : "text-slate-700"
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

                    {/* Step 1: data types inside the platform */}
                    {index === 0 && (
                      <ul
                        aria-label="Data types in the platform"
                        className="mt-5 flex flex-wrap gap-2"
                      >
                        {dataTypes.map((type) => (
                          <li
                            key={type}
                            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-emerald-50"
                          >
                            {type}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Step 2: a look at the search */}
                    {index === 1 && (
                      <div aria-hidden="true" className="mt-5">
                        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-400">
                          <Search size={14} />
                          <span>Search genes, targets, drugs…</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {resultTypes.map(({ label, className }) => (
                            <span
                              key={label}
                              className={`rounded-md border px-2.5 py-0.5 text-xs ${className}`}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 3: who the platform is for */}
                    {index === 2 && (
                      <ul
                        aria-label="Who the platform is for"
                        className="mt-5 flex flex-wrap gap-2"
                      >
                        {audience.map(({ label, Icon: AudienceIcon }) => (
                          <li
                            key={label}
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600"
                          >
                            <AudienceIcon
                              size={13}
                              className="text-amber-500"
                              aria-hidden="true"
                            />
                            {label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </motion.section>
  );
}