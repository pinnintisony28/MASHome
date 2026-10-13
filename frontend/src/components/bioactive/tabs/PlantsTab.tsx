
import { ExternalLink, Leaf } from "lucide-react";
import type { BioactiveProfile } from "../../../services/bioactiveProfileService";

type Props = {
  profile: BioactiveProfile;
};

export default function PlantsTab({ profile }: Props) {
  const plants = profile.overview.plants || [];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-800">
          Source Plants
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Natural plant sources containing this bioactive compound.
        </p>
      </div>

      <div className="grid gap-3">
        {plants.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <Leaf
              className="mx-auto mb-2 text-slate-400"
              size={28}
            />

            <p className="text-xs text-slate-500">
              No source plants available.
            </p>
          </div>
        ) : (
          plants.map((plant) => (
            <div
              key={plant.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="shrink-0 rounded-lg bg-emerald-100 p-2">
                  <Leaf
                    className="text-emerald-700"
                    size={17}
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="break-words text-sm font-semibold text-slate-800">
                    {plant.plant_name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Plant Source
                  </p>
                </div>
              </div>

              {plant.plant_url ? (
                <a
                  href={plant.plant_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs text-white transition hover:bg-emerald-700"
                >
                  View
                  <ExternalLink size={13} />
                </a>
              ) : (
                <span className="shrink-0 text-xs text-slate-400">
                  No Link
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
