import { ArrowLeft, FlaskConical, Leaf, Sparkles, Share2, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Bioactive } from "../../types/bioactive";

type Props = {
  bioactive: Bioactive;
};

export default function BioactiveHeader({ bioactive }: Props) {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-emerald-50/20 shadow-sm"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white px-6 py-3.5">
        <motion.button
          whileHover={{ x: -3, transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/bioactives")}
          className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-emerald-600 transition-colors"
          style={{ fontFamily: "Roboto Slab" }}
        >
          <ArrowLeft size={15} />
          <span>Back to Bioactives</span>
        </motion.button>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg border border-slate-200/60 bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-500 hover:border-emerald-200 hover:text-emerald-600 transition-all"
          >
            <Share2 size={13} className="inline mr-1" />
            Share
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg border border-slate-200/60 bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-500 hover:border-emerald-200 hover:text-emerald-600 transition-all"
          >
            <Bookmark size={13} className="inline mr-1" />
            Save
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-7">
        <div className="flex items-start gap-5">
          {/* Icon with Glow */}
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-2 rounded-xl bg-emerald-400/20 blur-xl animate-pulse" />
            <div className="relative rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 p-4 shadow-lg shadow-emerald-500/30">
              <Leaf className="text-white" size={28} />
            </div>
          </motion.div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1
                  className="text-2xl font-bold text-slate-900"
                  style={{ fontFamily: "Roboto Slab" }}
                >
                  {bioactive.bioactive_name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200/50">
                    <Sparkles size={10} className="text-emerald-400" />
                    Natural Bioactive Compound
                  </span>
                  <span className="text-[10px] text-slate-400">•</span>
                  <span className="text-[10px] text-slate-400">ID: {bioactive.bioactive_id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.06,
                delayChildren: 0.15,
              },
            },
          }}
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
            }}
          >
            <InfoCard title="Formula" value={bioactive.molecular_formula || "—"} />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
            }}
          >
            <InfoCard title="Weight" value={bioactive.molecular_weight || "—"} />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
            }}
          >
            <InfoCard title="Bioactive ID" value={String(bioactive.bioactive_id)} />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
            }}
          >
            <InfoCard title="Status" value="Active" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

type CardProps = {
  title: string;
  value: string;
};

function InfoCard({ title, value }: CardProps) {
  return (
    <motion.div 
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="rounded-xl border border-slate-200/60 bg-white/80 backdrop-blur-sm px-4 py-3.5 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <p
        className="text-[10px] font-medium uppercase tracking-wider text-slate-400"
        style={{ fontFamily: "Roboto Slab" }}
      >
        {title}
      </p>
      <p
        className="mt-1 text-base font-semibold text-slate-800"
        style={{ fontFamily: "Roboto Slab" }}
      >
        {value}
      </p>
    </motion.div>
  );
}