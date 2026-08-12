import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Patent } from "../../types/patent";

type Props = {
  patents: Patent[];
};

export default function PatentTable({ patents }: Props) {
  const navigate = useNavigate();

  return (
    <div className="h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="h-full overflow-auto">
        <table className="w-full min-w-[1100px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-slate-100">
            <tr className="border-b border-slate-200">
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                Application Id
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                Application Number
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                Application Date
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                Country
              </th>

              <th className="min-w-[350px] px-4 py-3 text-left font-semibold text-slate-700">
                Title
              </th>

              <th className="min-w-[250px] px-4 py-3 text-left font-semibold text-slate-700">
                I P C
              </th>
            </tr>
          </thead>

          <tbody>
            {patents.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No patents found.
                </td>
              </tr>
            ) : (
              patents.map((patent) => (
                <tr
                  key={patent.id}
                  onClick={() =>
                    navigate(`/patents/${patent.id}`)
                  }
                  className="cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-50"
                >
                  {/* Application ID */}
                  <td className="px-4 py-3 align-top">
                    {patent.application_id &&
                    patent.application_url ? (
                      <a
                        href={patent.application_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 font-medium text-emerald-700 hover:text-emerald-900 hover:underline"
                      >
                        {patent.application_id}

                        <ExternalLink size={13} />
                      </a>
                    ) : (
                      <span className="text-slate-400">
                        —
                      </span>
                    )}
                  </td>

                  {/* Application Number */}
                  <td className="px-4 py-3 align-top text-slate-700">
                    {patent.application_number || "—"}
                  </td>

                  {/* Application Date */}
                  <td className="whitespace-nowrap px-4 py-3 align-top text-slate-600">
                    {patent.application_date || "—"}
                  </td>

                  {/* Country */}
                  <td className="px-4 py-3 align-top">
                    {patent.country ? (
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                        {patent.country}
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        —
                      </span>
                    )}
                  </td>

                  {/* Title */}
                  <td className="px-4 py-3 align-top leading-6 text-slate-700">
                    {patent.title || "—"}
                  </td>

                  {/* IPC */}
                  <td className="px-4 py-3 align-top leading-6 text-slate-600">
                    {patent.ipc || "—"}
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