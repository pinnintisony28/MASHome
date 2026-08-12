import Molecule3D from "../sections/Molecule3D";
import type { BioactiveProfile } from "../../../services/bioactiveProfileService";

type Props = {
  profile: BioactiveProfile;
};

export default function Molecule3DTab({ profile }: Props) {
  return (
    <Molecule3D
      bioactiveId={profile.overview.bioactive_id}
    />
  );
}