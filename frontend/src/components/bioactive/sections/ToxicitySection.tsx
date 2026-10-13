
import { ShieldAlert } from "lucide-react";
import type { BioactiveToxicity } from "../../../types/bioactive";

type Props = {
  toxicity: BioactiveToxicity[];
};

export default function ToxicitySection({ toxicity }: Props) {
  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
      style={{ fontFamily: "'Roboto Slab', serif" }}
    >
      <div className="mb-3 flex items-center gap-2">
        <ShieldAlert className="text-red-500" size={16} />

        <h3 className="text-sm font-semibold text-slate-700">
          Toxicity Profile
        </h3>
      </div>

      {toxicity.length === 0 ? (
        <p className="py-4 text-center text-xs text-slate-500">
          No toxicity information available.
        </p>
      ) : (
        <div className="space-y-2">
          {toxicity.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            >
              <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                <Info label="Category" value={item.category} />
                <Info label="Endpoint" value={item.endpoint} />
                <Info label="Prediction" value={item.prediction} />

                <Info
                  label="Probability"
                  value={
                    item.probability !== undefined &&
                    item.probability !== null
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
      )}
    </section>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-medium uppercase text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 break-words text-xs font-medium text-slate-700">
        {value ?? "—"}
      </p>
    </div>
  );
}
