import {
  Search,
  Database,
  Network,
  ShieldCheck,
  Microscope,
  BrainCircuit,
  Sparkles,
  ArrowRight,
  Zap,
  Layers,
  GitBranch,
  Award,
  Target,
  Cpu,
} from "lucide-react";

const features = [
  {
    title: "Fast Biomedical Search",
    description:
      "Quickly search across therapeutic targets, drugs, genes, and other biomedical datasets.",
    icon: Search,
    accentIcon: Zap,
    color: "from-cyan-500 to-blue-500",
    iconColor: "#06B6D4",
    bgColor: "from-cyan-50 to-blue-50",
    borderColor: "border-cyan-200",
  },
  {
    title: "Integrated Knowledge Base",
    description:
      "Connect multiple biomedical resources through a single unified research platform.",
    icon: Database,
    accentIcon: Layers,
    color: "from-emerald-500 to-teal-500",
    iconColor: "#10B981",
    bgColor: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
  },
  {
    title: "Cross-Module Relationships",
    description:
      "Navigate seamlessly between targets, drugs, biomarkers, genes, and clinical trials.",
    icon: Network,
    accentIcon: GitBranch,
    color: "from-purple-500 to-indigo-500",
    iconColor: "#8B5CF6",
    bgColor: "from-purple-50 to-indigo-50",
    borderColor: "border-purple-200",
  },
  {
    title: "Curated Research Data",
    description:
      "Reliable datasets collected from trusted biomedical research resources.",
    icon: ShieldCheck,
    accentIcon: Award,
    color: "from-rose-500 to-pink-500",
    iconColor: "#F43F5E",
    bgColor: "from-rose-50 to-pink-50",
    borderColor: "border-rose-200",
  },
  {
    title: "MASLD Research Focus",
    description:
      "Designed specifically to support Metabolic Dysfunction-Associated Steatotic Liver Disease research.",
    icon: Microscope,
    accentIcon: Target,
    color: "from-amber-500 to-orange-500",
    iconColor: "#F59E0B",
    bgColor: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
  },
  {
    title: "Scalable Platform",
    description:
      "Built with FastAPI, React, and MySQL for high performance and future expansion.",
    icon: BrainCircuit,
    accentIcon: Cpu,
    color: "from-violet-500 to-purple-500",
    iconColor: "#8B5CF6",
    bgColor: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200",
  },
];

export default function FeatureSection() {
  return (
    <section className="mt-16 px-4 py-16">
      {/* Minimal Header */}
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2">
          <div className="h-px w-8 bg-slate-300" />
          <span className="text-xs font-medium text-slate-500 tracking-[0.2em] uppercase">
            Features
          </span>
          <div className="h-px w-8 bg-slate-300" />
        </div>

        <h2
          className="text-4xl font-light text-slate-900"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Platform Features
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500 font-light">
          Designed to accelerate biomedical discovery through integrated
          research resources.
        </p>
      </div>

      {/* Clean Grid Layout */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          const AccentIcon = feature.accentIcon;

          return (
            <div
              key={feature.title}
              className={`group rounded-xl border ${feature.borderColor} bg-white p-6 shadow-sm`}
            >
              {/* Icon Section */}
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${feature.bgColor} border ${feature.borderColor}`}
                >
                  <Icon
                    size={22}
                    style={{ color: feature.iconColor }}
                    strokeWidth={1.5}
                  />
                </div>

                <div className="flex-1">
                  <h3
                    className="text-base font-semibold text-slate-800"
                    style={{ fontFamily: "Roboto Slab" }}
                  >
                    {feature.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-slate-500 pl-16">
                {feature.description}
              </p>

              {/* Divider Line */}
              <div className={`mt-4 h-px w-12 bg-gradient-to-r ${feature.color} ml-16`} />

              {/* Action Link */}
              <div className="mt-4 flex items-center gap-2 pl-16">
                <span className="text-xs font-medium text-slate-400">
                  Learn More
                </span>
                <ArrowRight size={14} className="text-slate-300" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Clean Footer Divider */}
      <div className="mt-16 flex items-center justify-center gap-6">
        <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>6 Features</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>Integrated Platform</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>MASLD Focused</span>
        </div>
        <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </section>
  );
}