
import type { BioactiveProfile } from "../../../services/bioactiveProfileService";
import {
  FlaskConical,
  Weight,
  Dna,
  Fingerprint,
} from "lucide-react";

type Props = {
  profile: BioactiveProfile;
};

export default function OverviewTab({ profile }: Props) {
  const bioactive = profile.overview;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-800">
          Overview
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          General information about this bioactive molecule.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <InfoCard
          icon={<Fingerprint size={16} />}
          title="Bioactive Name"
          value={bioactive.bioactive_name}
        />

        <InfoCard
          icon={<FlaskConical size={16} />}
          title="Molecular Formula"
          value={bioactive.molecular_formula}
        />

        <InfoCard
          icon={<Weight size={16} />}
          title="Molecular Weight"
          value={bioactive.molecular_weight}
        />

        <InfoCard
          icon={<Dna size={16} />}
          title="SMILES"
          value={bioactive.smiles}
        />
      </div>
    </div>
  );
}

type CardProps = {
  title: string;
  value: any;
  icon: React.ReactNode;
};

function InfoCard({ title, value, icon }: CardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center gap-2">
        <div className="rounded-lg bg-emerald-100 p-1.5 text-emerald-700">
          {icon}
        </div>

        <h3 className="text-xs font-semibold text-slate-600">
          {title}
        </h3>
      </div>

      <p className="break-words text-sm font-bold text-slate-800">
        {value || "N/A"}
      </p>
    </div>
  );
}
