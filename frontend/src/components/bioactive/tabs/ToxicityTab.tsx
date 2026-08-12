import ToxicitySection from "../sections/ToxicitySection";
import type { BioactiveProfile } from "../../../services/bioactiveProfileService";

type Props = {
  profile: BioactiveProfile;
};

export default function ToxicityTab({ profile }: Props) {
  return <ToxicitySection toxicity={profile.toxicity} />;
}