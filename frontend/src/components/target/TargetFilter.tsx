import { motion, type Variants } from "framer-motion";

const targetTypes = [
  "All",
  "Successful",
  "Clinical trial",
  "Preclinical",
  "Patented-recorded",
  "Literature-reported",
  "Discontinued",
];

type TargetFilterProps = {
  selectedType: string;
  onSelect: (type: string) => void;
};

export default function TargetFilter({
  selectedType,
  onSelect,
}: TargetFilterProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants :Variants= {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-medium text-slate-700" style={{ fontFamily: "Roboto Slab" }}>
          Filter by Target Type
        </h3>
        <span className="text-xs text-slate-400">|</span>
        <span className="text-xs text-slate-400">
          {selectedType === "All" ? "Showing all types" : `Selected: ${selectedType}`}
        </span>
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-wrap gap-2"
      >
        {targetTypes.map((type) => (
          <motion.button
            key={type}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.15 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(type)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
              selectedType === type
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                : "border border-slate-200/60 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
            }`}
            style={{ fontFamily: "Roboto Slab" }}
          >
            {type}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}