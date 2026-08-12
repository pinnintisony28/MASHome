import { ChevronDown } from "lucide-react";

type Props = {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
};

export default function OtherTherapyFilter({
  categories,
  selectedCategory,
  onChange,
}: Props) {
  return (
 <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-4 shadow-sm">      <label
        htmlFor="therapy-category"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Select Therapy
      </label>

      <div className="relative">
        <select
          id="therapy-category"
          value={selectedCategory}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="
            w-full appearance-none
            rounded-xl
            border border-slate-200
            bg-white
            px-4 py-3 pr-10
            text-sm text-slate-700
            outline-none
            transition
            focus:border-emerald-400
            focus:ring-2
            focus:ring-emerald-100
          "
        >
          <option value="">
            All Other Therapies
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />
      </div>
    </div>
  );
}