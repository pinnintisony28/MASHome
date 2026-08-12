import { ExternalLink, Leaf } from "lucide-react";
import type { BioactiveProfile } from "../../../services/bioactiveProfileService";

type Props = {
  profile: BioactiveProfile;
};

export default function PlantsTab({ profile }: Props) {
  const plants = profile.overview.plants || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Source PlantsSd
        </h2>

        <p className="mt-1 text-slate-500">
          Natural plant sources containing this bioactive compound.
        </p>
      </div>

      <div className="grid gap-4">
        {plants.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <Leaf className="mx-auto mb-3 text-slate-400" size={40} />

            <p className="text-slate-500">
              No source plants available.
            </p>
          </div>
        ) : (
          plants.map((plant) => (
            <div
              key={plant.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-emerald-100 p-3">
                  <Leaf
                    className="text-emerald-700"
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {plant.plant_name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Plant Source
                  </p>
                </div>
              </div>

              {plant.plant_url ? (
                <a
                  href={plant.plant_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
                >
                  View
                  <ExternalLink size={16} />
                </a>
              ) : (
                <span className="text-sm text-slate-400">
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