
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

import ClinicalTrialDetails from "../../components/clinicalTrial/ClinicalTrialDetails";
import ClinicalTrialService from "../../services/clinicalTrialService";
import type { ClinicalTrial } from "../../types/clinicalTrial";

export default function ClinicalTrialDetailsPage() {
  const { trialId } = useParams<{ trialId: string }>();
  const navigate = useNavigate();

  const [trial, setTrial] = useState<ClinicalTrial | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTrial = async () => {
      if (!trialId) {
        setError("Clinical trial ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const decodedTrialId = decodeURIComponent(trialId);
        const data = await ClinicalTrialService.getById(decodedTrialId);

        setTrial(data);
      } catch (err) {
        console.error("Failed to load clinical trial details:", err);
        setError("Unable to load this clinical trial. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadTrial();
  }, [trialId]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-[1600px] px-4 py-8"
      style={{ fontFamily: "Roboto Slab, serif" }}
    >
      <button
        onClick={() => navigate("/clinical-trials")}
        className="mb-6 inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-4 py-2 text-sm text-emerald-700 transition hover:bg-emerald-50"
      >
        <ArrowLeft size={16} />
        Back to Clinical Trials
      </button>

      <h1 className="mb-6 text-2xl font-semibold text-slate-900">
        Clinical Trial Details
      </h1>

      {loading && (
        <p className="py-10 text-center text-sm text-slate-500">
          Loading clinical trial details...
        </p>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && trial && (
        <div className="w-full">
          <ClinicalTrialDetails trial={trial} />
        </div>
      )}
    </motion.main>
  );
}
