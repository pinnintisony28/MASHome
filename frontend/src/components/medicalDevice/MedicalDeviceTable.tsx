import { useNavigate } from "react-router-dom";

import type { MedicalDevice } from "../../types/medicalDevice";

type Props = {
  medicalDevices: MedicalDevice[];
};

export default function MedicalDeviceTable({
  medicalDevices,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="h-full overflow-auto">
        <table className="w-full min-w-[1500px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-slate-100">
            <tr className="border-b border-slate-200">
              <th className="min-w-[240px] whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                Device/Test
              </th>

              <th className="min-w-[200px] whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                Manufacturer
              </th>

              <th className="min-w-[190px] whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                Approval/Clearance Year*
              </th>

              <th className="min-w-[200px] whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                Regulatory Body
              </th>

              <th className="min-w-[150px] whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                Country/Region
              </th>

              <th className="min-w-[220px] whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                Device Type
              </th>

              <th className="min-w-[350px] px-4 py-3 text-left font-semibold text-slate-700">
                Primary Use
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                NAFLD/MASLD
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                NASH/MASH
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                Fibrosis
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700">
                Cirrhosis
              </th>
            </tr>
          </thead>

          <tbody>
            {medicalDevices.length === 0 ? (
              <tr>
                <td
                  colSpan={11}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No medical devices found.
                </td>
              </tr>
            ) : (
              medicalDevices.map((device) => (
                <tr
                  key={device.id}
                  onClick={() =>
                    navigate(
                      `/medical-devices/${device.id}`
                    )
                  }
                  className="cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-50"
                >
                  {/* Device/Test */}
                  <td className="px-4 py-3 align-top font-medium text-slate-800">
                    {device.device_test || "—"}
                  </td>

                  {/* Manufacturer */}
                  <td className="px-4 py-3 align-top text-slate-700">
                    {device.manufacturer || "—"}
                  </td>

                  {/* Approval/Clearance Year */}
                  <td className="px-4 py-3 align-top text-slate-700">
                    {device.approval_clearance_year || "—"}
                  </td>

                  {/* Regulatory Body */}
                  <td className="px-4 py-3 align-top text-slate-700">
                    {device.regulatory_body || "—"}
                  </td>

                  {/* Country/Region */}
                  <td className="px-4 py-3 align-top text-slate-700">
                    {device.country_region || "—"}
                  </td>

                  {/* Device Type */}
                  <td className="px-4 py-3 align-top text-slate-700">
                    {device.device_type || "—"}
                  </td>

                  {/* Primary Use */}
                  <td className="px-4 py-3 align-top leading-6 text-slate-700">
                    {device.primary_use || "—"}
                  </td>

                  {/* NAFLD/MASLD */}
                  <td className="px-4 py-3 align-top">
                    {device.nafld_masld || "—"}
                  </td>

                  {/* NASH/MASH */}
                  <td className="px-4 py-3 align-top">
                    {device.nash_mash || "—"}
                  </td>

                  {/* Fibrosis */}
                  <td className="px-4 py-3 align-top">
                    {device.fibrosis || "—"}
                  </td>

                  {/* Cirrhosis */}
                  <td className="px-4 py-3 align-top">
                    {device.cirrhosis || "—"}
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