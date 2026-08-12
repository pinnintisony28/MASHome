import { Handle, Position } from "reactflow";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function GraphNode({ data }: any) {
  const navigate = useNavigate();

  // Map icon strings to actual icons or use styled text
  const getIconDisplay = (icon: string) => {
    const iconMap: { [key: string]: string } = {
      dashboard: "📊",
      target: "🎯",
      dna: "🧬",
      pill: "💊",
      activity: "📈",
      leaf: "🌿",
      flask: "🔬",
    };
    return iconMap[icon] || "●";
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.08,
        y: -8,
        transition: { duration: 0.25, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(data.route)}
      className="group relative cursor-pointer rounded-2xl bg-gradient-to-br from-white to-slate-50/80 px-6 py-5 shadow-lg transition-all duration-300 hover:shadow-2xl"
      style={{
        border: `2.5px solid ${data.color}`,
        minWidth: data.size === "large" ? 200 : data.size === "small" ? 140 : 170,
        boxShadow: `0 4px 24px ${data.color}20`,
      }}
    >
      {/* Glow Effect on Hover */}
      <div 
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-md"
        style={{ 
          background: `radial-gradient(circle at center, ${data.color}25, transparent 70%)`,
        }}
      />

      {/* Decorative Ring */}
      <div 
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          border: `1.5px solid ${data.color}30`,
        }}
      />

      {/* Handles */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!w-3 !h-3 !border-2 !border-white transition-all duration-300 hover:!scale-125"
        style={{ 
          background: data.color,
          boxShadow: `0 0 12px ${data.color}50`,
        }}
      />
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!w-3 !h-3 !border-2 !border-white transition-all duration-300 hover:!scale-125"
        style={{ 
          background: data.color,
          boxShadow: `0 0 12px ${data.color}50`,
        }}
      />

      <div className="relative text-center">
        {/* Icon with Gradient Background */}
        <div 
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
          style={{ 
            background: `linear-gradient(135deg, ${data.color}20, ${data.color}08)`,
            border: `1px solid ${data.color}20`,
            boxShadow: `0 4px 16px ${data.color}15`,
          }}
        >
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
            {getIconDisplay(data.icon)}
          </span>
        </div>

        {/* Label */}
        <h2
          className="text-sm font-bold tracking-wide transition-colors duration-300 group-hover:opacity-80"
          style={{ color: data.color }}
        >
          {data.label}
        </h2>

        {/* Count with Description */}
        <div className="mt-2 flex flex-col items-center">
          <p className="text-2xl font-bold text-slate-800 leading-none">
            {data.count}
          </p>
          {data.description && (
            <p className="mt-1 text-[10px] font-medium text-slate-400">
              {data.description}
            </p>
          )}
        </div>

        {/* Explore Indicator */}
        <div className="mt-3 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-[10px] font-medium text-slate-400">Explore</span>
          <ArrowRight 
            size={13} 
            className="text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" 
          />
        </div>

        {/* Bottom Accent Bar */}
        <div 
          className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-2/3"
          style={{ background: `linear-gradient(90deg, ${data.color}60, ${data.color})` }}
        />

        {/* Top Accent Dot */}
        <div 
          className="absolute -top-1 right-2 h-1.5 w-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: data.color }}
        />
      </div>
    </motion.div>
  );
}