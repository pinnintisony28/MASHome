import { ShieldAlert } from "lucide-react";
import type { BioactiveToxicity } from "../../../types/bioactive";

// type Toxicity = {
//   category?: string;
//   endpoint?: string;
//   prediction?: string;
//   probability?: number;
//   predicted_ld50?: string;
//   predicted_toxicity_class?: string;
// };

type Props = {
  toxicity: BioactiveToxicity[];
};

export default function ToxicitySection({ toxicity }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="text-red-500" size={18} />
        <h3
          className="text-sm font-semibold text-slate-700"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Toxicity Profile
        </h3>
      </div>

      <div className="space-y-3">
        {toxicity.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 p-3 bg-slate-50"
          >
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Info label="Category" value={item.category} />
              <Info label="Endpoint" value={item.endpoint} />
              <Info label="Prediction" value={item.prediction} />
              <Info
  label="Probability"
  value={
    item.probability !== undefined
      ? `${(item.probability * 100).toFixed(0)}%`
      : "—"
  }
/>
              <Info label="LD50" value={item.predicted_ld50} />
              <Info
                label="Toxicity Class"
                value={item.predicted_toxicity_class}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-700">
        {value ?? "—"}
      </p>
    </div>
  );
}