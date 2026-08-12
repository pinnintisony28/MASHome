import { Search, X } from "lucide-react";
import { useState } from "react";

type Props = {
  onSearch: (keyword: string) => void;
  onClear: () => void;
};

export default function AssociatedDiseaseSearch({
  onSearch,
  onClear,
}: Props) {
  const [keyword, setKeyword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(keyword);
  }

  function handleClear() {
    setKeyword("");
    onClear();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
        <Search
          size={20}
          className="ml-3 text-slate-400"
        />

        <input
          type="text"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          placeholder="Search associated diseases..."
          className="flex-1 bg-transparent px-2 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />

        {keyword && (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}

        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Search
        </button>
      </div>
    </form>
  );
}