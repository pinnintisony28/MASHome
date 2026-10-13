
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";

import ClinicalTrialService from "../../services/clinicalTrialService";
import type { TerminatedTrial } from "../../types/terminatedTrial";

export default function WithdrawnTrialDetailsPage() {
  const { trialId } = useParams<{ trialId: string }>();
  const navigate = useNavigate();

  const [trial, setTrial] = useState<TerminatedTrial | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTrial() {
      if (!trialId) {
        setError("Trial ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await ClinicalTrialService.getWithdrawnById(
          decodeURIComponent(trialId)
        );

        setTrial(data);
      } catch (err) {
        console.error("Failed to load withdrawn trial:", err);
        setError("Unable to load withdrawn trial details.");
      } finally {
        setLoading(false);
      }
    }

    loadTrial();
  }, [trialId]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-[1600px] px-4 py-8"
      style={{ fontFamily: "'Roboto Slab', serif" }}
    >
      <button
        onClick={() => navigate("/clinical-trials/withdrawn")}
        className="mb-6 inline-flex items-center gap-2 rounded-lg border border-amber-200 px-4 py-2 text-sm text-amber-700 transition hover:bg-amber-50"
      >
        <ArrowLeft size={16} />
        Back to Withdrawn Trials
      </button>

      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-amber-100 p-3">
          <FlaskConical size={24} className="text-amber-700" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Withdrawn Clinical Trial Details
          </h1>
          {trial && (
            <p className="mt-1 text-sm text-slate-500">
              {trial.nct_number}
            </p>
          )}
        </div>
      </div>

      {loading && (
        <p className="py-10 text-center text-sm text-slate-500">
          Loading trial details...
        </p>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && trial && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-2 md:divide-x md:divide-y-0">
            {[
              ["Study Title", trial.study_title],
              ["NCT Number", trial.nct_number],
              ["Study Status", trial.study_status],
              ["Reason", trial.reason],
              ["Sponsor", trial.sponsor],
              ["Collaborators", trial.collaborators],
              ["Conditions", trial.conditions],
              ["Interventions", trial.interventions],
              ["Study Type", trial.study_type],
              ["Phase", trial.phase],
              ["Enrollment", trial.enrollment],
              ["Other IDs", trial.other_ids],
            ].map(([label, value]) => (
              <div key={label} className="p-5">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  {label}
                </p>
                <p className="break-words text-sm leading-6 text-slate-800">
                  {value || "Not available"}
                </p>
              </div>
            ))}
          </div>

          {trial.study_url && (
            <div className="border-t border-slate-100 p-5">
              <a
                href={trial.study_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-amber-700 hover:underline"
              >
                View original study
              </a>
            </div>
          )}
        </div>
      )}
    </motion.main>
  );
}
