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
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Overview
        </h2>

        <p className="text-slate-500 mt-1">
          General information about this bioactive molecule.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <InfoCard
          icon={<Fingerprint size={20} />}
          title="Bioactive Name"
          value={bioactive.bioactive_name}
        />

        <InfoCard
          icon={<FlaskConical size={20} />}
          title="Molecular Formula"
          value={bioactive.molecular_formula}
        />

        <InfoCard
          icon={<Weight size={20} />}
          title="Molecular Weight"
          value={bioactive.molecular_weight}
        />

        <InfoCard
          icon={<Dna size={20} />}
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

function InfoCard({
  title,
  value,
  icon,
}: CardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">

      <div className="flex items-center gap-3 mb-4">

        <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
          {icon}
        </div>

        <h3 className="font-semibold text-slate-600">
          {title}
        </h3>

      </div>

      <p className="break-words text-lg font-bold text-slate-800">
        {value || "N/A"}
      </p>

    </div>
  );
}