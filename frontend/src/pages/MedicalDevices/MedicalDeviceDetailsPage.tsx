import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Stethoscope,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import MedicalDeviceService from "../../services/medicalDeviceService";

import type { MedicalDevice } from "../../types/medicalDevice";

export default function MedicalDeviceDetailsPage() {
  const { deviceId } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] =
    useState<MedicalDevice | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadDevice() {
      try {
        setLoading(true);
        setError("");

        const data =
          await MedicalDeviceService.getById(
            Number(deviceId)
          );

        setDevice(data);
      } catch (err) {
        console.error(err);

        setError(
          "Failed to load medical device details."
        );
      } finally {
        setLoading(false);
      }
    }

    if (deviceId) {
      loadDevice();
    }
  }, [deviceId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-sm text-slate-500">
          Loading medical device details...
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
            navigate("/medical-devices")
          }
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Medical Devices
        </button>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-sm text-slate-500">
          Medical device not found.
        </p>

        <button
          onClick={() =>
            navigate("/medical-devices")
          }
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Medical Devices
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
            navigate("/medical-devices")
          }
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
        >
          <ArrowLeft size={17} />
          Back to Medical Devices
        </button>

        {/* Header */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <Stethoscope
                size={23}
                className="text-emerald-600"
              />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Medical Device
              </p>

              <h1
                className="mt-1 text-2xl font-semibold text-slate-900"
                style={{
                  fontFamily: "Roboto Slab",
                }}
              >
                {device.device_test ||
                  "Medical Device Details"}
              </h1>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Medical Device Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete information available for
              this medical device.
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">

            <Detail
              label="Device/Test"
              value={
                device.device_test || "—"
              }
            />

            <Detail
              label="Manufacturer"
              value={
                device.manufacturer || "—"
              }
            />

            <Detail
              label="Approval/Clearance Year*"
              value={
                device.approval_clearance_year ||
                "—"
              }
            />

            <Detail
              label="Regulatory Body"
              value={
                device.regulatory_body || "—"
              }
            />

            <Detail
              label="Country/Region"
              value={
                device.country_region || "—"
              }
            />

            <Detail
              label="Device Type"
              value={
                device.device_type || "—"
              }
            />

            <div className="md:col-span-2">
              <Detail
                label="Primary Use"
                value={
                  device.primary_use || "—"
                }
              />
            </div>

            <Detail
              label="NAFLD/MASLD"
              value={
                device.nafld_masld || "—"
              }
            />

            <Detail
              label="NASH/MASH"
              value={
                device.nash_mash || "—"
              }
            />

            <Detail
              label="Fibrosis"
              value={
                device.fibrosis || "—"
              }
            />

            <Detail
              label="Cirrhosis"
              value={
                device.cirrhosis || "—"
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