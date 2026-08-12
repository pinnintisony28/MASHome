import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import PatentService from "../../services/patentService";
import type { Patent } from "../../types/patent";

export default function PatentDetailsPage() {
  const { patentId } = useParams();
  const navigate = useNavigate();

  const [patent, setPatent] = useState<Patent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPatent() {
      try {
        setLoading(true);
        setError("");

        const data = await PatentService.getById(
          Number(patentId)
        );

        setPatent(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load patent details.");
      } finally {
        setLoading(false);
      }
    }

    if (patentId) {
      loadPatent();
    }
  }, [patentId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-sm text-slate-500">
          Loading patent details...
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
          onClick={() => navigate("/patents")}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Patents
        </button>
      </div>
    );
  }

  if (!patent) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-sm text-slate-500">
          Patent not found.
        </p>

        <button
          onClick={() => navigate("/patents")}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Patents
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8">

        {/* Back */}
        <button
          onClick={() => navigate("/patents")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
        >
          <ArrowLeft size={17} />
          Back to Patents
        </button>

        {/* Header */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <FileText
                size={23}
                className="text-emerald-600"
              />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Patent
              </p>

              <h1
                className="mt-1 text-2xl font-semibold text-slate-900"
                style={{ fontFamily: "Roboto Slab" }}
              >
                {patent.application_id || "Patent Details"}
              </h1>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Patent Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete information available for this patent.
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">

            <Detail
              label="Application Id"
              value={
                patent.application_id &&
                patent.application_url ? (
                  <a
                    href={patent.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-emerald-700 hover:underline"
                  >
                    {patent.application_id}
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  "—"
                )
              }
            />

            <Detail
              label="Application Number"
              value={patent.application_number || "—"}
            />

            <Detail
              label="Application Date"
              value={patent.application_date || "—"}
            />

            <Detail
              label="Country"
              value={patent.country || "—"}
            />

            <div className="md:col-span-2">
              <Detail
                label="Title"
                value={patent.title || "—"}
              />
            </div>

            <div className="md:col-span-2">
              <Detail
                label="I P C"
                value={patent.ipc || "—"}
              />
            </div>

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