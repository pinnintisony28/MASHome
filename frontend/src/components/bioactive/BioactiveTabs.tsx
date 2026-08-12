import { useState } from "react";
import {
  BookOpen,
  Leaf,
  FlaskConical,
  ShieldAlert,
  Image,
  Cuboid,
} from "lucide-react";

import ADMESection from "../bioactive/sections/ADMESection";
import ToxicitySection from "../bioactive/sections/ToxicitySection";
import Molecule2D from "../bioactive/sections/Molecule2D";
import Molecule3D from "../bioactive/sections/Molecule3D";

import type { BioactiveProfile } from "../../services/bioactiveProfileService";

type Props = {
  profile: BioactiveProfile;
};

const tabs = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "plants", label: "Plants", icon: Leaf },
  { id: "adme", label: "ADME", icon: FlaskConical },
  { id: "toxicity", label: "Toxicity", icon: ShieldAlert },
  { id: "2d", label: "2D", icon: Image },
  { id: "3d", label: "3D", icon: Cuboid },
];

export default function BioactiveTabs({ profile }: Props) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="mt-8">
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold">Overview</h2>

            <div className="grid grid-cols-2 gap-6">
              <Info title="Bioactive">
                {profile.overview.bioactive_name}
              </Info>

              <Info title="Formula">
                {profile.overview.molecular_formula}
              </Info>

              <Info title="Weight">
                {profile.overview.molecular_weight}
              </Info>

              <Info title="SMILES">
                {profile.overview.smiles}
              </Info>
            </div>
          </div>
        )}

        {activeTab === "plants" && (
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold">
              Source Plantsss
            </h2>

            <div className="space-y-2">
              {profile.overview.plants.map((plant) => (
                <div
                  key={plant.id}
                  className="rounded-lg border p-3"
                >
                  {plant.plant_name}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "adme" && (
          <ADMESection adme={profile.adme!} />
        )}

        {activeTab === "toxicity" && (
          <ToxicitySection toxicity={profile.toxicity} />
        )}

        {activeTab === "2d" && (
          <Molecule2D smiles={profile.overview.smiles} />
        )}

        {activeTab === "3d" && (
          <Molecule3D
            bioactiveId={profile.overview.bioactive_id}
          />
        )}
      </div>
    </div>
  );
}

type InfoProps = {
  title: string;
  children: React.ReactNode;
};

function Info({ title, children }: InfoProps) {
  return (
    <div>
      <p className="text-sm text-slate-500">{title}</p>

      <p className="mt-1 font-medium text-slate-800">
        {children || "—"}
      </p>
    </div>
  );
}