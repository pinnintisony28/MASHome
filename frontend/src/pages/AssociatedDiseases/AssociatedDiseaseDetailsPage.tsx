import { useEffect, useState } from "react";
import {
  ArrowLeft,
  HeartPulse,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import AssociatedDiseaseService from "../../services/associatedDiseaseService";

import type { AssociatedDisease } from "../../types/associatedDisease";

export default function AssociatedDiseaseDetailsPage() {
  const { diseaseId } = useParams();
  const navigate = useNavigate();

  const [disease, setDisease] =
    useState<AssociatedDisease | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadDisease() {
      try {
        setLoading(true);
        setError("");

        const data =
          await AssociatedDiseaseService.getById(
            Number(diseaseId)
          );

        setDisease(data);
      } catch (err) {
        console.error(err);

        setError(
          "Failed to load associated disease details."
        );
      } finally {
        setLoading(false);
      }
    }

    if (diseaseId) {
      loadDisease();
    }
  }, [diseaseId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-sm text-slate-500">
          Loading associated disease details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-sm text-red-500">
          {error}
        </p>

        <button
          onClick={() =>
            navigate("/associated-diseases")
          }
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Associated Diseases
        </button>
      </div>
    );
  }

  if (!disease) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-sm text-slate-500">
          Associated disease not found.
        </p>

        <button
          onClick={() =>
            navigate("/associated-diseases")
          }
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Associated Diseases
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8">

        {/* Back */}
        <button
          onClick={() =>
            navigate("/associated-diseases")
          }
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
        >
          <ArrowLeft size={17} />
          Back to Associated Diseases
        </button>

        {/* Header */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <HeartPulse
                size={23}
                className="text-emerald-600"
              />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Associated Disease
              </p>

              <h1
                className="mt-1 text-2xl font-semibold text-slate-900"
                style={{
                  fontFamily: "Roboto Slab",
                }}
              >
                {disease.associated_disease ||
                  "Associated Disease Details"}
              </h1>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Disease Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete information available for
              this associated disease.
            </p>
          </div>

          <div className="grid gap-6 p-6">

            <Detail
              label="Associated Disease"
              value={
                disease.associated_disease || "—"
              }
            />

            <Detail
              label="Relationship with NAFLD/MASH"
              value={
                disease.relationship_with_nafld_mash ||
                "—"
              }
            />

            <Detail
              label="Underlying Reason"
              value={
                disease.underlying_reason || "—"
              }
            />

          </div>
        </div>
      </div>
    </div>
  );
}


function Detail({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
        {value}
      </div>
    </div>
  );
}