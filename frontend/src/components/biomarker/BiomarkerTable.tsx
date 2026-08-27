import type { Biomarker } from "../../types/biomarker";
import BiomarkerRow from "./BiomarkerRow";
import { Database } from "lucide-react";

type BiomarkerTableProps = {
  biomarkers: Biomarker[];
  selectedId?: number;
  onSelect: (id: number) => void;
};

export default function BiomarkerTable({
  biomarkers,
  selectedId,
  onSelect,
}: BiomarkerTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

      {/* =====================================================
          TABLE HEADER
      ====================================================== */}

      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">

        <div className="flex items-center gap-2">

          <Database
            size={16}
            className="text-teal-600"
          />

          <h3 className="text-sm font-semibold text-slate-800">
            Biomarkers
          </h3>

        </div>

        <span className="text-xs text-slate-400">
          {biomarkers.length} records
        </span>

      </div>

      {/* =====================================================
          TABLE
      ====================================================== */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[650px]">

          <thead>

            <tr className="border-b border-slate-200 bg-white">

              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                ID
              </th>

              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Biomarker
              </th>

              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Category
              </th>

              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Subgroup
              </th>

            </tr>

          </thead>

          <tbody>

            {biomarkers.length > 0 ? (
              biomarkers.map((biomarker) => (
                <BiomarkerRow
                  key={biomarker.id}
                  biomarker={biomarker}
                  onSelect={onSelect}
                  isSelected={
                    selectedId === biomarker.id
                  }
                />
              ))
            ) : (
              <tr>

                <td
                  colSpan={4}
                  className="px-6 py-12 text-center"
                >

                  <div className="mx-auto max-w-sm">

                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                      <Database size={18} />
                    </div>

                    <p className="text-sm font-medium text-slate-600">
                      No biomarkers found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try a different search or
                      category.
                    </p>

                  </div>

                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}