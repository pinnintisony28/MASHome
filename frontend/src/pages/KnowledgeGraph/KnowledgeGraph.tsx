import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import { Network, Sparkles } from "lucide-react";

import GraphNode from "../../components/knowledgeGraph/GraphNode";
import {
  initialEdges,
  initialNodes,
} from "../../components/knowledgeGraph/graphData";

const nodeTypes = {
  custom: GraphNode,
};

export default function KnowledgeGraph() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-80px)]"
    >
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 p-2 shadow-lg shadow-emerald-500/20">
                <Network size={20} className="text-white" />
              </div>
              <h1
                className="text-3xl font-bold text-slate-900 relative inline-block"
                style={{ fontFamily: "Roboto Slab" }}
              >
                Knowledge Graph
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-emerald-500 rounded-full" />
                <span className="absolute -bottom-2 left-14 w-2 h-0.5 bg-emerald-300 rounded-full" />
              </h1>
            </div>
            <p className="mt-3 text-sm text-slate-500 pl-11 flex items-center gap-2" style={{ fontFamily: "Roboto Slab" }}>
              <Sparkles size={12} className="text-emerald-400" />
              Explore relationships between biomedical datasets within the MASHome platform
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-400">Interactive</span>
          </div>
        </div>
      </div>

      {/* Graph Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="h-[calc(100%-100px)] rounded-2xl border border-slate-200/60 bg-gradient-to-br from-slate-50/50 via-white to-emerald-50/20 shadow-sm overflow-hidden"
      >
        <div className="h-full w-full">
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
            fitView
            className="bg-transparent"
          >
            <Background 
              gap={20} 
              color="#e2e8f0" 
              className="opacity-30"
            />
            <MiniMap 
              className="!bg-white/80 !border !border-slate-200/60 !rounded-xl !shadow-sm"
              nodeColor="#10B981"
              maskColor="rgba(16, 185, 129, 0.1)"
            />
            <Controls 
              className="!bg-white/80 !border !border-slate-200/60 !rounded-xl !shadow-sm !overflow-hidden"
              showInteractive={false}
            />
          </ReactFlow>
        </div>

        {/* Bottom Status Bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/60 shadow-sm flex items-center gap-3">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
            {initialNodes.length} nodes • {initialEdges.length} connections
          </span>
          <span className="text-[10px] text-slate-300">|</span>
          <span className="text-[10px] text-slate-400">Drag to explore</span>
        </div>
      </motion.div>
    </motion.div>
  );
}