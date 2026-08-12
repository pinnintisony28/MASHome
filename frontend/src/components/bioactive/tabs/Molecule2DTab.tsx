import Molecule2D from "../sections/Molecule2D";
import type { BioactiveProfile } from "../../../services/bioactiveProfileService";

type Props = {
  profile: BioactiveProfile;
};

export default function Molecule2DTab({ profile }: Props) {
  return <Molecule2D smiles={profile.overview.smiles} />;
}