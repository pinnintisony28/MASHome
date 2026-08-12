import { ArrowLeft, FlaskConical } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { OtherTherapy } from "../../types/otherTherapy";

import PathwayDiagram from "./PathwayDiagram";

type Props = {
  therapy: OtherTherapy;
};

export default function OtherTherapyDetails({
  therapy,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">

      {/* Back button */}
      <button
        onClick={() =>
          navigate("/other-therapies")
        }
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to Other Therapies
      </button>

      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
            <FlaskConical
              size={24}
              className="text-emerald-600"
            />
          </div>

          <div className="min-w-0">
            <span className="inline-flex rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              {therapy.category}
            </span>

            <h1
              className="mt-3 text-2xl font-light text-slate-900"
              style={{
                fontFamily: "Roboto Slab",
              }}
            >
              {therapy.item_name ||
                "Other Therapy"}
            </h1>

            {therapy.secondary_name && (
              <p className="mt-1 text-sm italic text-slate-500">
                {therapy.secondary_name}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Description */}
      {therapy.description && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Description
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            {therapy.description}
          </p>
        </section>
      )}

      {/* Mechanism */}
      {therapy.mechanism && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Mechanism
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            {therapy.mechanism}
          </p>
        </section>
      )}

      {/* Effect */}
      {therapy.effect && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Primary Effect / Target
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            {therapy.effect}
          </p>
        </section>
      )}

      {/* Outcome */}
      {therapy.outcome && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Clinical Outcome
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            {therapy.outcome}
          </p>
        </section>
      )}

      {/* Pathway */}
      {therapy.pathway_data && (
        <PathwayDiagram
          pathwayData={therapy.pathway_data}
        />
      )}

      {/* Source */}
      <div className="pb-6 text-xs text-slate-400">
        Source sheet: {therapy.source_sheet}
      </div>
    </div>
  );
}