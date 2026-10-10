import { useEffect, useState } from "react";
import {
  Search,
  ExternalLink,
  BookOpen,
  LoaderCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Unlock,
} from "lucide-react";
import publicationService, {
  type Publication,
} from "../services/publicationService";

export default function Publications() {
  const [query, setQuery] = useState("MASLD");
  const [searchQuery, setSearchQuery] = useState("MASLD");
  const [publications, setPublications] = useState<Publication[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPublications() {
      setLoading(true);
      setError("");

      try {
        const data = await publicationService.search(searchQuery, page, 10);

        if (!cancelled) {
          setPublications(data.results);
          setTotalResults(data.total_results);
        }
      } catch {
        if (!cancelled) {
          setError(
            "Unable to load publications. Check that the backend is running.",
          );
          setPublications([]);
          setTotalResults(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadPublications();

    return () => {
      cancelled = true;
    };
  }, [searchQuery, page]);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setPage(1);
    setSearchQuery(trimmedQuery);
  }

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="pub-root min-h-screen bg-slate-50">
      {/* Fonts + small bits of CSS that Tailwind utilities can't express */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,300..800&family=Roboto+Serif:opsz,wght@8..144,500..800&display=swap');

        .pub-root { font-family: 'Roboto Flex', 'Roboto', system-ui, sans-serif; }
        .pub-serif { font-family: 'Roboto Serif', Georgia, serif; }

        .pub-hero-glow {
          background:
            radial-gradient(60rem 28rem at 85% -10%, rgba(16, 185, 129, 0.35), transparent 60%),
            radial-gradient(40rem 22rem at -5% 110%, rgba(52, 211, 153, 0.18), transparent 60%);
        }

        .pub-hero-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(to bottom, black 0%, transparent 90%);
          -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 90%);
        }

        .pub-card details[open] .pub-chevron { transform: rotate(180deg); }
        .pub-card summary::-webkit-details-marker { display: none; }
        .pub-card summary { list-style: none; }

        @keyframes pub-rise {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pub-card { animation: pub-rise 0.35s ease-out both; }

        @media (prefers-reduced-motion: reduce) {
          .pub-card { animation: none; }
        }
      `}</style>

      {/* Hero */}
      <header className="relative overflow-hidden bg-emerald-950">
        <div className="pub-hero-glow absolute inset-0" />
        <div className="pub-hero-grid absolute inset-0" />

        <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-14 sm:px-8 sm:pb-28 sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-sm font-medium text-emerald-200">
            <BookOpen size={15} />
            Research Library
          </span>

          <h1 className="pub-serif mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
            Publications
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-emerald-100/80 sm:text-lg">
            Explore scientific publications related to MASLD, liver diseases,
            genes, biomarkers, drugs, and clinical research.
          </p>
        </div>
      </header>

      <div className="relative mx-auto max-w-5xl px-4 pb-16 sm:px-8">
        {/* Search bar overlapping the hero */}
        <form
          onSubmit={handleSearch}
          className="-mt-9 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-emerald-950/10 sm:flex-row sm:items-center"
        >
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700"
            />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search MASLD, liver disease, PNPLA3..."
              className="w-full rounded-xl bg-transparent py-3.5 pl-12 pr-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:bg-emerald-50/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Search size={18} />
            Search
          </button>
        </form>

        {/* Result summary */}
        {!loading && !error && (
          <div className="mb-6 mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <p className="text-sm text-slate-600">
              <span className="pub-serif text-lg font-bold text-emerald-800">
                {totalResults.toLocaleString()}
              </span>{" "}
              results for{" "}
              <span className="font-semibold text-slate-900">
                {searchQuery}
              </span>
            </p>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
              Source: Europe PMC
            </span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-8 flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-emerald-200 bg-white text-emerald-700">
            <LoaderCircle size={28} className="animate-spin" />
            <span className="font-medium">Loading publications...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && publications.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <BookOpen className="text-emerald-700" size={26} />
            </div>
            <p className="pub-serif text-lg font-bold text-slate-900">
              No publications found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try another search term.
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && !error && publications.length > 0 && (
          <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {publications.map((publication) => (
              <article
                key={`${publication.source}-${publication.id}`}
                className="pub-card group grid gap-4 p-5 transition-colors duration-200 hover:bg-emerald-50/40 sm:p-6 md:grid-cols-[13rem_1fr] md:gap-8"
              >
                {/* Left rail: when / where / access */}
                <div className="flex flex-row flex-wrap items-center gap-2 md:flex-col md:items-start md:gap-3 md:border-r md:border-slate-100 md:pr-6">
                  {publication.publication_date && (
                    <span className="pub-serif text-lg font-bold leading-tight text-emerald-900">
                      {publication.publication_date}
                    </span>
                  )}

                  <span className="text-sm font-medium italic leading-snug text-slate-600">
                    {publication.journal || " "}
                  </span>

                  {publication.is_open_access && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
                      <Unlock size={13} />
                      Open Access
                    </span>
                  )}
                </div>

                {/* Main column */}
                <div className="min-w-0">
                  <h2 className="pub-serif text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                    {publication.article_url ? (
                      <a
                        href={publication.article_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-emerald-800 hover:underline hover:decoration-emerald-300 hover:underline-offset-4"
                      >
                        {publication.title || "Untitled publication"}
                      </a>
                    ) : (
                      publication.title || "Untitled publication"
                    )}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {publication.author_string || "Authors not available"}
                  </p>

                  {(publication.pmid || publication.doi) && (
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
                      {publication.pmid && <span>PMID: {publication.pmid}</span>}
                      {publication.doi && (
                        <span className="break-all">DOI: {publication.doi}</span>
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                    {publication.abstract && (
                      <details className="w-full order-last">
                        <summary className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-900">
                          Read abstract
                          <ChevronDown
                            size={16}
                            className="pub-chevron transition-transform duration-200"
                          />
                        </summary>
                        <p className="mt-3 whitespace-pre-line rounded-xl border-l-4 border-emerald-500 bg-emerald-50/60 py-3 pl-4 pr-4 text-sm leading-7 text-slate-700">
                          {publication.abstract.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()}
                        </p>
                      </details>
                    )}

                    {publication.article_url && (
                      <a
                        href={publication.article_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:underline"
                      >
                        View publication
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900 ring-1 ring-emerald-200">
              Page {page} of {totalPages.toLocaleString()}
            </span>

            <button
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={page >= totalPages}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        <p className="mt-12 text-center text-xs text-slate-500">
          Publication metadata provided by Europe PMC. Availability and access
          rights depend on the individual article.
        </p>
      </div>
    </div>
  );
}