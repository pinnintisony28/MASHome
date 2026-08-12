import ADMESection from "../sections/ADMESection";
import type { BioactiveProfile } from "../../../services/bioactiveProfileService";

type Props = {
  profile: BioactiveProfile;
};

export default function ADMETab({ profile }: Props) {
  return <ADMESection adme={profile.adme!} />;
}