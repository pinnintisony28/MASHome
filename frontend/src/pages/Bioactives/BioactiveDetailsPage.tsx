import { useState } from "react";
import { useParams } from "react-router-dom";

import useBioactiveDetails from "../../hooks/useBioactiveDetails";

import BioactiveHeader from "../../components/bioactive/BioactiveHeader";
import BioactiveSidebar from "../../components/bioactive/layout/BioactiveSidebar";
import BioactiveContent from "../../components/bioactive/layout/BioactiveContent";

export default function BioactiveDetailsPage() {
  const { bioactiveId } = useParams();

  const id = Number(bioactiveId);

  const { profile, loading, error } = useBioactiveDetails(id);

  const [activeTab, setActiveTab] = useState<
    "overview" | "plants" | "adme" | "toxicity" | "2d" | "3d"
  >("overview");

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div className="p-8">Bioactive not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <BioactiveHeader bioactive={profile.overview} />

      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-6">
        <BioactiveSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="flex-1">
          <BioactiveContent
            activeTab={activeTab}
            profile={profile}
          />
        </div>
      </div>
    </div>
  );
}