import OverviewTab from "../tabs/OverviewTab";
import PlantsTab from "../tabs/PlantsTab";
import ADMETab from "../tabs/ADMETab";
import ToxicityTab from "../tabs/ToxicityTab";
import Molecule2DTab from "../tabs/Molecule2DTab";
import Molecule3DTab from "../tabs/Molecule3DTab";

import type { BioactiveProfile } from "../../../services/bioactiveProfileService";

type Tab =
  | "overview"
  | "plants"
  | "adme"
  | "toxicity"
  | "2d"
  | "3d";

type Props = {
  activeTab: Tab;
  profile: BioactiveProfile;
};

export default function BioactiveContent({
  activeTab,
  profile,
}: Props) {
    
  switch (activeTab) {
   
  case "overview":
    return <OverviewTab profile={profile} />;

  case "plants":
    return <PlantsTab profile={profile} />;

  case "adme":
    return <ADMETab profile={profile} />;

  case "toxicity":
    return <ToxicityTab profile={profile} />;

  case "2d":
    return <Molecule2DTab profile={profile} />;

  case "3d":
    return <Molecule3DTab profile={profile} />;

  default:
    return null;
}

    
}


function Info({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-medium">{value || "—"}</p>
    </div>
  );
}
