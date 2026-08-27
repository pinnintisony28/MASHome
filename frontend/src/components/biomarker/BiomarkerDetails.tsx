import {
  Activity,
  Database,
  FileText,
  FlaskConical,
  Image,
  Info,
  MapPin,
} from "lucide-react";

type Biomarker = {
  id: number;
  biomarker_id: string;
  biomarker_name: string;
  category: string;
  subgroup?: string | null;
  normal_range?: string | null;
  clinical_significance?: string | null;
  description?: string | null;
  source_sheet: string;
};

interface BiomarkerDetailsProps {
  biomarker: Biomarker | null;
}

export default function BiomarkerDetails({
  biomarker,
}: BiomarkerDetailsProps) {
  if (!biomarker) {
    return (
      <div className="flex h-full min-h-[480px] items-center justify-center">

        <div className="max-w-sm text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
            <FlaskConical size={26} />
          </div>

          <h3 className="text-base font-semibold text-slate-800">
            Select a biomarker
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Select a biomarker from the
            results list to view its detailed
            information.
          </p>

        </div>

      </div>
    );
  }
   console.log(
    "DETAILS RENDERING:",
    biomarker.id,
    biomarker.biomarker_name
  );

  const isBlood =
    biomarker.category ===
    "Blood & Serum Biomarkers";

  const isImaging =
    biomarker.category ===
    "Imaging-Based Biomarkers";

  const CategoryIcon = isBlood
    ? Activity
    : isImaging
    ? Image
    : Database;

  const categoryLabel = isBlood
    ? "Blood & Serum Biomarker"
    : isImaging
    ? "Imaging-Based Biomarker"
    : "Overall Biomarker";

  const renderValue = (
    value?: string | null
  ) => {
    if (
      value === null ||
      value === undefined ||
      value.trim() === ""
    ) {
      return (
        <span className="text-slate-400">
          Not available
        </span>
      );
    }

    return value;
  };

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================== */}

      <div className="border-b border-slate-200 pb-5">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-sm">
            <CategoryIcon size={21} />
          </div>

          <div className="min-w-0">

            <div className="mb-2 flex flex-wrap items-center gap-2">

              <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-semibold text-teal-700">
                {categoryLabel}
              </span>

              {biomarker.subgroup && (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500">
                  {biomarker.subgroup}
                </span>
              )}

            </div>

            <h2
              className="text-xl font-bold leading-7 text-slate-900"
              style={{
                fontFamily: "Roboto Slab",
              }}
            >
              {biomarker.biomarker_name}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Biomarker ID:{" "}
              <span className="font-medium text-slate-500">
                {biomarker.biomarker_id}
              </span>
            </p>

          </div>

        </div>

      </div>

      {/* =================================================
          DESCRIPTION
      ================================================== */}

      <section>

        <div className="mb-3 flex items-center gap-2">

          <Info
            size={16}
            className="text-teal-600"
          />

          <h3 className="text-sm font-semibold text-slate-900">
            Description
          </h3>

        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
            {renderValue(
              biomarker.description
            )}
          </p>

        </div>

      </section>

      {/* =================================================
          NORMAL RANGE
      ================================================== */}

      <section>

        <div className="mb-3 flex items-center gap-2">

          <Activity
            size={16}
            className="text-teal-600"
          />

          <h3 className="text-sm font-semibold text-slate-900">
            Normal Range
          </h3>

        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">

          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
            {renderValue(
              biomarker.normal_range
            )}
          </p>

        </div>

      </section>

      {/* =================================================
          CLINICAL SIGNIFICANCE
      ================================================== */}

      <section>

        <div className="mb-3 flex items-center gap-2">

          <FileText
            size={16}
            className="text-teal-600"
          />

          <h3 className="text-sm font-semibold text-slate-900">
            Clinical Significance
          </h3>

        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
            {renderValue(
              biomarker.clinical_significance
            )}
          </p>

        </div>

      </section>

      {/* =================================================
          INFORMATION
      ================================================== */}

      <section>

        <div className="mb-3 flex items-center gap-2">

          <Database
            size={16}
            className="text-teal-600"
          />

          <h3 className="text-sm font-semibold text-slate-900">
            Database Information
          </h3>

        </div>

        <div className="grid gap-3 sm:grid-cols-2">

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">

              <Database size={13} />

              Category

            </div>

            <p className="mt-2 text-sm font-medium text-slate-700">
              {biomarker.category}
            </p>

          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">

              <MapPin size={13} />

              Source

            </div>

            <p className="mt-2 break-words text-sm font-medium text-slate-700">
              {biomarker.source_sheet.trim()}
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}