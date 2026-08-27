import { useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  Database,
  FlaskConical,
  Image,
  Layers,
  Search,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import useBiomarkers from "../../hooks/useBiomarkers";
import BiomarkerSearch from "../../components/biomarker/BiomarkerSearch";
import BiomarkerTable from "../../components/biomarker/BiomarkerTable";
import BiomarkerDetails from "../../components/biomarker/BiomarkerDetails";
import BiomarkerWelcome from "../../components/biomarker/BiomarkerWelcome";

type CategoryKey =
  | "all"
  | "Blood & Serum Biomarkers"
  | "Imaging-Based Biomarkers"
  | "Overall";

export default function Biomarkers() {
  const {
    biomarkers,
    selectedBiomarker,
    loading,
    detailsLoading,
    error,
    hasSearched,
    searchBiomarkers,
    selectBiomarker,
    clearSearch,
    clearSelection,
  } = useBiomarkers();

  const [activeCategory, setActiveCategory] =
    useState<CategoryKey>("all");

  /*
   * ---------------------------------------------------------
   * CATEGORY CONFIGURATION
   * ---------------------------------------------------------
   */

  const categories: {
    key: CategoryKey;
    label: string;
    icon: React.ElementType;
  }[] = [
    {
      key: "all",
      label: "All Biomarkers",
      icon: Layers,
    },
    {
      key: "Blood & Serum Biomarkers",
      label: "Blood & Serum",
      icon: Activity,
    },
    {
      key: "Imaging-Based Biomarkers",
      label: "Imaging-Based",
      icon: Image,
    },
    {
      key: "Overall",
      label: "Overall",
      icon: Database,
    },
  ];

  /*
   * ---------------------------------------------------------
   * FILTER RESULTS
   * ---------------------------------------------------------
   */

  const filteredBiomarkers = useMemo(() => {
    if (activeCategory === "all") {
      return biomarkers;
    }

    return biomarkers.filter(
      (biomarker) =>
        biomarker.category === activeCategory
    );
  }, [biomarkers, activeCategory]);

  /*
   * ---------------------------------------------------------
   * CATEGORY COUNT
   * ---------------------------------------------------------
   */

  const getCategoryCount = (
    category: CategoryKey
  ) => {
    if (category === "all") {
      return biomarkers.length;
    }

    return biomarkers.filter(
      (biomarker) =>
        biomarker.category === category
    ).length;
  };

  /*
   * ---------------------------------------------------------
   * CATEGORY CHANGE
   * ---------------------------------------------------------
   */

  const handleCategoryChange = (
    category: CategoryKey
  ) => {
    setActiveCategory(category);
    clearSelection();
  };

  /*
   * ---------------------------------------------------------
   * BACK TO RESULTS
   * ---------------------------------------------------------
   */

  const handleBackToResults = () => {
    clearSelection();
  };

  /*
   * =========================================================
   * DETAILS VIEW
   * =========================================================
   */

  if (selectedBiomarker) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          x: 15,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="min-h-screen bg-slate-50"
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-6">

            <button
              type="button"
              onClick={handleBackToResults}
              className="
                group
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                text-slate-600
                transition-all
                hover:bg-teal-50
                hover:text-teal-700
              "
            >
              <ArrowLeft
                size={17}
                className="transition-transform group-hover:-translate-x-1"
              />

              <span>
                Back to{" "}
                {activeCategory === "all"
                  ? "Biomarkers"
                  : activeCategory ===
                    "Blood & Serum Biomarkers"
                  ? "Blood & Serum"
                  : activeCategory ===
                    "Imaging-Based Biomarkers"
                  ? "Imaging-Based"
                  : "Overall"}
              </span>
            </button>

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-sm">
                <Activity size={23} />
              </div>

              <div>

                <h1
                  className="text-2xl font-bold text-slate-900"
                  style={{
                    fontFamily: "Roboto Slab",
                  }}
                >
                  Biomarker Details
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Detailed information about the
                  selected biomarker.
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* =================================================
            DETAILS CONTENT
        ================================================== */}

        <main className="mx-auto max-w-5xl px-6 py-8">

          {detailsLoading ? (
            <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-24 shadow-sm">

              <div className="flex flex-col items-center gap-4">

                <div className="h-11 w-11 animate-spin rounded-full border-4 border-teal-100 border-t-teal-600" />

                <p className="text-sm text-slate-500">
                  Loading biomarker details...
                </p>

              </div>

            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <BiomarkerDetails
                biomarker={selectedBiomarker}
              />

            </div>
          )}

        </main>

      </motion.div>
    );
  }

  /*
   * =========================================================
   * RESULTS / MAIN VIEW
   * =========================================================
   */

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-slate-50"
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">

          <div className="flex items-start justify-between gap-6">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-sm">
                <Activity size={23} />
              </div>

              <div>

                <h1
                  className="text-2xl font-bold text-slate-900"
                  style={{
                    fontFamily: "Roboto Slab",
                  }}
                >
                  Biomarkers
                </h1>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                  Explore disease biomarkers associated
                  with MASLD, including blood, serum,
                  imaging-based, and overall biomarker
                  information.
                </p>

              </div>

            </div>

            <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 sm:flex">

              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

              <span className="text-xs font-medium text-emerald-700">
                Database
              </span>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* ERROR */}

        {error && (
          <motion.div
            initial={{
              opacity: 0,
              y: -5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
          >
            <AlertCircle size={18} />

            <span>{error}</span>
          </motion.div>
        )}

        {/* =================================================
            SEARCH
        ================================================== */}

        <div className="mb-7">

          <div className="mb-2 flex items-center gap-2">

            <Search
              size={16}
              className="text-teal-600"
            />

            <h2 className="text-sm font-semibold text-slate-800">
              Search Biomarkers
            </h2>

          </div>

          <BiomarkerSearch
            onSearch={(keyword) => {
              setActiveCategory("all");
              searchBiomarkers(keyword);
            }}
            onClear={() => {
              setActiveCategory("all");
              clearSearch();
              clearSelection();
            }}
          />

        </div>

        {/* =================================================
            LOADING
        ================================================== */}

        {loading && (
          <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 shadow-sm">

            <div className="flex flex-col items-center gap-4">

              <div className="relative">

                <div className="h-11 w-11 animate-spin rounded-full border-4 border-teal-100 border-t-teal-600" />

                <div className="absolute inset-0 flex items-center justify-center">

                  <Activity
                    size={15}
                    className="text-teal-600"
                  />

                </div>

              </div>

              <p className="text-sm text-slate-500">
                Loading biomarkers...
              </p>

            </div>

          </div>
        )}

        {/* =================================================
            WELCOME
        ================================================== */}

        {!loading &&
          !error &&
          !hasSearched && (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
            >
              <BiomarkerWelcome
                onQuickSearch={
                  searchBiomarkers
                }
              />
            </motion.div>
          )}

        {/* =================================================
            RESULTS
        ================================================== */}

        {!loading &&
          !error &&
          hasSearched && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
              }}
            >

              {/* RESULTS HEADER */}

              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                <div>

                  <h2 className="text-lg font-semibold text-slate-900">
                    Biomarker Results
                  </h2>

                  <div className="mt-1 flex items-center gap-2">

                    <span className="text-xs text-slate-500">
                      {
                        filteredBiomarkers.length
                      }{" "}
                      biomarker
                      {filteredBiomarkers.length !==
                      1
                        ? "s"
                        : ""}{" "}
                      found
                    </span>

                    <span className="text-slate-300">
                      •
                    </span>

                    <span className="flex items-center gap-1 text-xs text-teal-600">

                      <Sparkles
                        size={11}
                      />

                      Ready to explore

                    </span>

                  </div>

                </div>

              </div>

              {/* =================================================
                  SIDEBAR + TABLE
              ================================================== */}

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="grid min-h-[620px] md:grid-cols-[230px_1fr]">

                  {/* SIDEBAR */}

                  <aside className="border-b border-slate-200 bg-slate-50 md:border-b-0 md:border-r">

                    <div className="p-3">

                      <div className="mb-3 px-3 py-2">

                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Biomarker Types
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                          Filter results
                        </div>

                      </div>

                      <nav className="space-y-1">

                        {categories.map(
                          (category) => {
                            const Icon =
                              category.icon;

                            const active =
                              activeCategory ===
                              category.key;

                            const count =
                              getCategoryCount(
                                category.key
                              );

                            return (
                              <button
                                key={
                                  category.key
                                }
                                type="button"
                                onClick={() =>
                                  handleCategoryChange(
                                    category.key
                                  )
                                }
                                className={`
                                  group
                                  flex
                                  w-full
                                  items-center
                                  justify-between
                                  rounded-lg
                                  px-3
                                  py-2.5
                                  text-left
                                  transition-all
                                  duration-200
                                  ${
                                    active
                                      ? "bg-teal-600 text-white shadow-sm"
                                      : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                                  }
                                `}
                              >

                                <span className="flex items-center gap-3">

                                  <Icon
                                    size={17}
                                    className={
                                      active
                                        ? "text-white"
                                        : "text-slate-400 transition-colors group-hover:text-teal-600"
                                    }
                                  />

                                  <span className="text-sm font-medium">
                                    {
                                      category.label
                                    }
                                  </span>

                                </span>

                                <span
                                  className={`
                                    min-w-[28px]
                                    rounded-full
                                    px-2
                                    py-0.5
                                    text-center
                                    text-[11px]
                                    font-semibold
                                    ${
                                      active
                                        ? "bg-white/20 text-white"
                                        : "bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-700"
                                    }
                                  `}
                                >
                                  {count}
                                </span>

                              </button>
                            );
                          }
                        )}

                      </nav>

                    </div>

                  </aside>

                  {/* TABLE */}

                  <section className="min-w-0 bg-white">

                    <div className="border-b border-slate-100 px-5 py-4 md:px-6">

                      <div className="flex items-center justify-between gap-3">

                        <div>

                          <h3 className="text-sm font-semibold text-slate-900">
                            {
                              activeCategory ===
                              "all"
                                ? "All Biomarkers"
                                : activeCategory
                            }
                          </h3>

                          <p className="mt-1 text-xs text-slate-400">
                            Select a biomarker to
                            view its details.
                          </p>

                        </div>

                        <div className="hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 sm:flex">

                          <Database
                            size={14}
                            className="text-slate-400"
                          />

                          <span className="text-xs font-medium text-slate-500">
                            {
                              filteredBiomarkers.length
                            }{" "}
                            records
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="h-[540px] overflow-y-auto p-4">

                      {filteredBiomarkers.length >
                      0 ? (
                        <BiomarkerTable
                          biomarkers={
                            filteredBiomarkers
                          }
                          selectedId={
                            selectedBiomarker?.id
                          }
                          onSelect={
                            selectBiomarker
                          }
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">

                          <div className="max-w-sm text-center">

                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                              <Search
                                size={21}
                              />
                            </div>

                            <h3 className="text-sm font-semibold text-slate-800">
                              No biomarkers found
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              There are no
                              biomarkers in this
                              category for the
                              current search.
                            </p>

                          </div>

                        </div>
                      )}

                    </div>

                  </section>

                </div>

              </div>

            </motion.div>
          )}

      </main>

    </motion.div>
  );
}