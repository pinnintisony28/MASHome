import { Search, X } from "lucide-react";
import { useState } from "react";

type Props = {
  onSearch: (keyword: string) => void;
  onClear: () => void;
};

export default function OtherTherapySearch({
  onSearch,
  onClear,
}: Props) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    onSearch(keyword.trim());
  };

  const handleClear = () => {
    setKeyword("");
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2"
    >
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          placeholder="Search other therapies..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        />

        {keyword && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}
      </div>

      <button
        type="submit"
        className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
      >
        Search
      </button>
    </form>
  );
}