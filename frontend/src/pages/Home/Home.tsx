

import Hero from "../../components/home/Hero";
// import BrowseDatabase from "../../components/home/BrowseDatabase";
// import FeatureSection from "../../components/home/FeatureSection";
import ResearchWorkflow from "../../components/home/ResearchWorkflow";
import MentorSection from "../../components/home/MentorSection";
import AboutSection from "../../components/home/AboutSection";
// import RecentUpdates from "../../components/home/RecentUpdates";
import Footer from "../../components/home/Footer";
export default function Home() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10 space-y-24">
        <Hero />


        {/* <FeatureSection /> */}

        <ResearchWorkflow />

        <MentorSection
  mentorName="Meesala Satyavani"
  designation="Research Scholar"
  department="Department of Pharmacy"
  institution="Anurag School of Pharmacy, Anurag University, Hyderabad"
  photo="/assets/mam.jpeg"
/>

        <AboutSection />

        {/* <RecentUpdates /> */}
      </div>

      <Footer />
    </div>
  );
}