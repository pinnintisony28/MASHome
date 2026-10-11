import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PatentService from "../../services/patentService";
import type { Patent } from "../../types/patent";

type Props = {
  onSearch: (keyword: string) => void;
  onClear: () => void;
  onSelect: (patent: Patent) => void;
};

export default function PatentSearch({
  onSearch,
  onClear,
  onSelect,
}: Props) {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<Patent[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const value = keyword.trim();

    if (!value) {
      setSuggestions([]);
      setShowSuggestions(false);
      setSuggestionsLoading(false);
      return;
    }

    let cancelled = false;

    const timer = window.setTimeout(async () => {
      try {
        setSuggestionsLoading(true);

        const results = await PatentService.search(value);

        if (!cancelled) {
          setSuggestions(results.slice(0, 50));
          setShowSuggestions(true);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load patent suggestions:", error);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } finally {
        if (!cancelled) {
          setSuggestionsLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [keyword]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch(keyword.trim());
  }

  function handleClear() {
    setKeyword("");
    setSuggestions([]);
    setShowSuggestions(false);
    onClear();
  }

  function handleSelect(patent: Patent) {
    setKeyword(patent.title || patent.application_number || "");
    setShowSuggestions(false);
    onSelect(patent);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
        <Search size={20} className="ml-3 shrink-0 text-slate-400" />

        <div ref={wrapperRef} className="relative min-w-0 flex-1">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => {
              if (keyword.trim()) setShowSuggestions(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setShowSuggestions(false);
              }
            }}
            placeholder="Search patents by Application ID, Application Number, title, country or IPC..."
            autoComplete="off"
            className="w-full bg-transparent px-2 py-3 text-sm font-normal text-slate-700 outline-none placeholder:text-slate-400"
            style={{ fontFamily: "Roboto Slab" }}
          />

          {showSuggestions && keyword.trim() && (
            <div
              className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg"
              style={{ fontFamily: "Roboto Slab" }}
            >
              {suggestionsLoading ? (
                <p className="px-3 py-3 text-sm font-normal text-slate-500">
                  Loading suggestions...
                </p>
              ) : suggestions.length > 0 ? (
                suggestions.map((patent) => (
                  <button
                    key={patent.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(patent)}
                    className="block w-full border-b border-slate-100 px-3 py-3 text-left transition-colors last:border-b-0 hover:bg-emerald-50"
                  >
                   <p
  className="text-sm font-normal text-slate-800"
  style={{ fontFamily: "Roboto Slab" }}
>
  {patent.title || "Untitled patent"}
</p>

{patent.application_number && (
  <p
    className="mt-1 text-xs font-normal text-slate-500"
    style={{ fontFamily: "Roboto Slab" }}
  >
    Application No: {patent.application_number}
  </p>
)}

<p
  className="mt-1 text-xs font-normal text-slate-500"
  style={{ fontFamily: "Roboto Slab" }}
>
  {[patent.country, patent.ipc].filter(Boolean).join(" · ")}
</p>
                  </button>
                ))
              ) : (
                <p className="px-3 py-3 text-sm font-normal text-slate-500">
                  No matching patents found.
                </p>
              )}
            </div>
          )}
        </div>

        {keyword && (
          <button
            type="button"
            onClick={handleClear}
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}

        <button
          type="submit"
          className="shrink-0 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-normal text-white transition hover:bg-emerald-700"
          style={{ fontFamily: "Roboto Slab" }}
        >
          Search
        </button>
      </div>
    </form>
  );
}