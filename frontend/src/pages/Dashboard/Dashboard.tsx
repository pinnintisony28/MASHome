import useDashboard from "../../hooks/useDashboard";
import StatsGrid from "../../components/dashboard/StatsGrid";
import BrowseDatabase from "../../components/home/BrowseDatabase";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { stats, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
          <p className="text-sm text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4">
          <p className="text-sm text-red-600" style={{ fontFamily: "Roboto Slab" }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <BrowseDatabase />
      {/* Header
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold text-slate-900"
            style={{ fontFamily: "Roboto Slab" }}
          >
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of MASHome platform statistics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-500">Live</span>
        </div>
      </div> */}

      {/* Stats Grid */}
      {/* <div className="mb-8">
        <StatsGrid stats={stats} />
      </div> */}

      {/* Browse Database */}
      
    </motion.div>
  );
}