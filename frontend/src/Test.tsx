import { Mail, Award, Users } from "lucide-react";

export default function Test() {
  return (
    <div className="p-10 flex gap-6">
      <Mail size={40} color="red" />
      <Award size={40} color="blue" />
      <Users size={40} color="green" />
    </div>
  );
}