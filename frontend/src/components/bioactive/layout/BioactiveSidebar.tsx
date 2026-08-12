import {
  BookOpen,
  Leaf,
  FlaskConical,
  ShieldAlert,
  Image,
  Cuboid,
} from "lucide-react";

type Tab =
  | "overview"
  | "plants"
  | "adme"
  | "toxicity"
  | "2d"
  | "3d";

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

const items = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "plants", label: "Source Plants", icon: Leaf },
  { id: "adme", label: "ADME Profile", icon: FlaskConical },
  { id: "toxicity", label: "Toxicity", icon: ShieldAlert },
  { id: "2d", label: "2D Structure", icon: Image },
  { id: "3d", label: "3D Structure", icon: Cuboid },
] as const;

export default function BioactiveSidebar({
  activeTab,
  onTabChange,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-bold">
        Navigation
      </h2>

      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                activeTab === item.id
                  ? "bg-emerald-600 text-white"
                  : "hover:bg-slate-100"
              }`}
            >
              <Icon size={18} />

              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}