
import { useClinicalTrials } from "../../hooks/useClinicalTrials";
import ClinicalTrialSearch from "../../components/clinicalTrial/ClinicalTrialSearch";
import ClinicalTrialTable from "../../components/clinicalTrial/ClinicalTrialTable";
import { motion } from "framer-motion";
import { FlaskConical, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClinicalTrials() {
  const {
    clinicalTrials,
    loading,
    error,
    totalRecords,
    searchTrials,
    clearSearch,
  } = useClinicalTrials();

  const navigate = useNavigate();

  const handleSelectTrial = (trialId: string) => {
    navigate(`/clinical-trials/${encodeURIComponent(trialId)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-[1600px] px-4 py-8"
      style={{ fontFamily: "Roboto Slab, serif" }}
    >
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="relative inline-block text-3xl font-light text-slate-900">
                Clinical Trials
                <span className="absolute -bottom-2 left-0 h-0.5 w-12 rounded-full bg-emerald-500" />
                <span className="absolute -bottom-2 left-14 h-0.5 w-2 rounded-full bg-emerald-300" />
              </h1>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Explore registered clinical trials, study designs, sponsors,
              recruitment status and interventions related to MASLD and
              associated diseases.
            </p>
          </div>

          <div className="mt-1 flex items-center gap-2">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-400">Database</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <ClinicalTrialSearch
          onSearch={searchTrials}
          onClear={clearSearch}
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FlaskConical
                  size={16}
                  className="animate-pulse text-emerald-600"
                />
              </div>
            </div>
            <p className="text-sm text-slate-500">
              Loading clinical trials...
            </p>
          </div>
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-xl border border-red-200 bg-red-50 px-6 py-4"
        >
          <p className="text-sm text-red-600">{error}</p>
        </motion.div>
      )}

      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 w-full"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
              Showing {clinicalTrials.length} of{" "}
              {totalRecords.toLocaleString()} clinical trials
              <span className="text-slate-300">•</span>
              <Sparkles size={14} className="text-emerald-400" />
              <span className="text-xs text-slate-400">
                Ready to explore
              </span>
            </span>
          </div>

          <div className="w-full">
            <ClinicalTrialTable
              clinicalTrials={clinicalTrials}
              onSelect={handleSelectTrial}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
