import { useNavigate } from "react-router-dom";

import type { AssociatedDisease } from "../../types/associatedDisease";

type Props = {
  associatedDiseases: AssociatedDisease[];
};

export default function AssociatedDiseaseTable({
  associatedDiseases,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="h-full overflow-auto">
        <table className="w-full min-w-[1100px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-slate-100">
            <tr className="border-b border-slate-200">
              <th className="min-w-[300px] px-4 py-3 text-left font-semibold text-slate-700">
                Associated Disease
              </th>

              <th className="min-w-[240px] px-4 py-3 text-left font-semibold text-slate-700">
                Relationship with NAFLD/MASH
              </th>

              <th className="min-w-[550px] px-4 py-3 text-left font-semibold text-slate-700">
                Underlying Reason
              </th>
            </tr>
          </thead>

          <tbody>
            {associatedDiseases.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No associated diseases found.
                </td>
              </tr>
            ) : (
              associatedDiseases.map((disease) => (
                <tr
                  key={disease.id}
                  onClick={() =>
                    navigate(
                      `/associated-diseases/${disease.id}`
                    )
                  }
                  className="cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-50"
                >
                  <td className="px-4 py-3 align-top font-medium text-slate-800">
                    {disease.associated_disease || "—"}
                  </td>

                  <td className="px-4 py-3 align-top">
                    {disease.relationship_with_nafld_mash ? (
                      <span className="inline-flex rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                        {disease.relationship_with_nafld_mash}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td className="px-4 py-3 align-top leading-6 text-slate-700">
                    {disease.underlying_reason || "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}