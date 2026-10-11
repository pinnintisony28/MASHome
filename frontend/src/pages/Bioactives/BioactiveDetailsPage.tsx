import { useState } from "react";
import { useParams } from "react-router-dom";

import useBioactiveDetails from "../../hooks/useBioactiveDetails";

import BioactiveHeader from "../../components/bioactive/BioactiveHeader";
import BioactiveSidebar from "../../components/bioactive/layout/BioactiveSidebar";
import BioactiveContent from "../../components/bioactive/layout/BioactiveContent";

const font = { fontFamily: "Roboto Slab" };

export default function BioactiveDetailsPage() {
  const { bioactiveId } = useParams();

  const id = Number(bioactiveId);

  const { profile, loading, error } = useBioactiveDetails(id);

  const [activeTab, setActiveTab] = useState<
    "overview" | "plants" | "adme" | "toxicity" | "2d" | "3d"
  >("overview");

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8" style={font}>
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
            <p className="text-sm text-slate-500">Loading bioactive details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8" style={font}>
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8" style={font}>
        <div className="rounded-xl border border-slate-200/60 bg-white px-5 py-10 text-center shadow-sm">
          <p className="text-sm text-slate-500">Bioactive not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={font}>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <BioactiveHeader bioactive={profile.overview} />
        </div>

        {/* Sidebar + Content: stacked on mobile, side by side on large screens */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
          <div className="w-full lg:sticky lg:top-6 lg:w-60 lg:shrink-0">
            <BioactiveSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          <div className="min-w-0 flex-1">
            <BioactiveContent
              activeTab={activeTab}
              profile={profile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}