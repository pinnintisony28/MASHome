import { motion } from "framer-motion";

type StatsCardProps = {
  title: string;
  value: number;
  index?: number;
};

export default function StatsCard({ title, value, index = 0 }: StatsCardProps) {
  // Different border styles for variety
  const borderStyles = [
    "border-l-4 border-l-emerald-500",
    "border-l-4 border-l-blue-500",
    "border-l-4 border-l-purple-500",
    "border-l-4 border-l-amber-500",
    "border-l-4 border-l-rose-500",
    "border-l-4 border-l-cyan-500",
    "border-l-4 border-l-indigo-500",
    "border-l-4 border-l-teal-500",
  ];

  const borderStyle = borderStyles[index % borderStyles.length];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        },
      }}
      whileHover={{ 
        x: 4,
        transition: { duration: 0.15 }
      }}
      className={`relative rounded-lg border border-slate-200/60 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md ${borderStyle}`}
    >
      {/* Top accent dot */}
      <div className="absolute -top-1.5 right-4 h-3 w-3 rounded-full bg-slate-200/50" />
      
      {/* Content */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
            {title}
          </h3>
          <span className="text-[10px] font-medium text-slate-400">#{String(index + 1).padStart(2, '0')}</span>
        </div>
        
        <p className="mt-3 text-3xl font-bold text-slate-800" style={{ fontFamily: "Roboto Slab" }}>
          {value.toLocaleString()}
        </p>
        
        {/* Bottom progress bar */}
        <div className="mt-3 h-0.5 w-full rounded-full bg-slate-100">
          <div 
            className="h-0.5 rounded-full bg-slate-300 transition-all duration-500" 
            style={{ width: `${Math.min((value / 10000) * 100, 100)}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}