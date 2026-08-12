import { useNavigate } from "react-router-dom";

import type { OtherTherapy } from "../../types/otherTherapy";

type Props = {
  therapies: OtherTherapy[];
};

export default function OtherTherapyTable({
  therapies,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="h-full overflow-auto">
        <table className="w-full min-w-[1000px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-slate-100">
            <tr className="border-b border-slate-200">
              <th className="min-w-[220px] px-4 py-3 text-left font-semibold text-slate-700">
                Therapy
              </th>

              <th className="min-w-[200px] px-4 py-3 text-left font-semibold text-slate-700">
                Category
              </th>

              <th className="min-w-[350px] px-4 py-3 text-left font-semibold text-slate-700">
                Mechanism
              </th>

              <th className="min-w-[350px] px-4 py-3 text-left font-semibold text-slate-700">
                Effect / Outcome
              </th>
            </tr>
          </thead>

          <tbody>
            {therapies.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No other therapies found.
                </td>
              </tr>
            ) : (
              therapies.map((therapy) => (
                <tr
                  key={therapy.id}
                  onClick={() =>
                    navigate(
                      `/other-therapies/${therapy.id}`
                    )
                  }
                  className="cursor-pointer border-b border-slate-100 transition-colors hover:bg-emerald-50/50"
                >
                  {/* Therapy */}
                  <td className="px-4 py-4 align-top">
                    <div className="font-medium text-slate-800">
                      {therapy.item_name || "—"}
                    </div>

                    {therapy.secondary_name && (
                      <div className="mt-1 text-xs italic text-slate-400">
                        {therapy.secondary_name}
                      </div>
                    )}
                  </td>

                  {/* Category */}
                  <td className="px-4 py-4 align-top">
                    <span className="inline-flex rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      {therapy.category}
                    </span>
                  </td>

                  {/* Mechanism */}
                  <td className="px-4 py-4 align-top leading-6 text-slate-700">
                    {therapy.mechanism ||
                      therapy.description ||
                      "—"}
                  </td>

                  {/* Effect / Outcome */}
                  <td className="px-4 py-4 align-top leading-6 text-slate-700">
                    {therapy.effect ||
                      therapy.outcome ||
                      "—"}
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