import { useState } from "react";

import {
  ChevronDown,
  Network,
  Loader2,
  AlertCircle,
  Info,
  Activity,
  FlaskConical,
  HeartPulse,
  Database,
} from "lucide-react";

import usePathways from "../../hooks/usePathways";
import PathwayTableView from "../../components/pathway/PathwayTableView";

export default function Pathways() {
  const {
    pathways,
    selectedPathway,
    loading,
    detailsLoading,
    error,
    selectPathway,
  } = usePathways();

  const [activeSection, setActiveSection] =
    useState<string>("overview");

  /*
   * Get all individual tables from pathway_data.
   *
   * Object.entries() keeps the same order
   * provided by the backend.
   */
  const pathwayTables =
    selectedPathway?.pathway_data
      ? Object.entries(
          selectedPathway.pathway_data
        ).filter(
          ([key]) => key !== "_metadata"
        )
      : [];

  /* =========================================================
     COMMON VALUE RENDERER
  ========================================================= */

  const renderValue = (
    value: string | null | undefined
  ) => {
    return value || "Not available";
  };

  /* =========================================================
     OVERVIEW
  ========================================================= */

  const renderOverview = () => {
    if (!selectedPathway) {
      return null;
    }

    return (
      <div className="space-y-6">

        {/* Heading */}

        <div>
          <div className="mb-2 inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            {selectedPathway.pathway_id}
          </div>

          <h2
            className="text-2xl font-bold text-slate-900"
            style={{
              fontFamily: "Roboto Slab",
            }}
          >
            {selectedPathway.pathway_name}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Source:{" "}
            {selectedPathway.source_sheet}
          </p>
        </div>

        {/* Basic information */}

        <div className="grid gap-4 sm:grid-cols-2">

          {[
            [
              "Category",
              selectedPathway.category,
            ],
            [
              "Super Category",
              selectedPathway.super_category,
            ],
            [
              "Disease",
              selectedPathway.disease,
            ],
            [
              "Disease Stages",
              selectedPathway.disease_stages,
            ],
            [
              "Cellular Location",
              selectedPathway.cellular_location,
            ],
            [
              "Major Cell Types",
              selectedPathway.major_cell_types,
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {label}
              </div>

              <div className="mt-2 text-sm leading-6 text-slate-700">
                {renderValue(value)}
              </div>
            </div>
          ))}

        </div>

        {/* Clinical + status */}

        <div className="grid gap-4 sm:grid-cols-2">

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Clinical Importance
            </div>

            <p className="mt-2 text-sm leading-7 text-slate-700">
              {renderValue(
                selectedPathway.clinical_importance
              )}
            </p>

          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Pathway Status
            </div>

            <p className="mt-2 text-sm leading-7 text-slate-700">
              {renderValue(
                selectedPathway.pathway_status
              )}
            </p>

          </div>

        </div>

        {/* Primary function */}

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Primary Function
          </div>

          <p className="mt-2 text-sm leading-7 text-slate-700">
            {renderValue(
              selectedPathway.primary_function
            )}
          </p>

        </div>

      </div>
    );
  };

  /* =========================================================
     CLINICAL INFORMATION
  ========================================================= */

  const renderClinical = () => {
    if (!selectedPathway) {
      return null;
    }

    return (
      <div className="space-y-6">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Clinical Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Clinical relevance and disease-related
            information for this pathway.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Clinical Importance
          </div>

          <p className="mt-3 text-sm leading-7 text-slate-700">
            {renderValue(
              selectedPathway.clinical_importance
            )}
          </p>

        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Disease
            </div>

            <p className="mt-3 text-sm leading-7 text-slate-700">
              {renderValue(
                selectedPathway.disease
              )}
            </p>

          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Disease Stages
            </div>

            <p className="mt-3 text-sm leading-7 text-slate-700">
              {renderValue(
                selectedPathway.disease_stages
              )}
            </p>

          </div>

        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Major Cell Types
          </div>

          <p className="mt-3 text-sm leading-7 text-slate-700">
            {renderValue(
              selectedPathway.major_cell_types
            )}
          </p>

        </div>

      </div>
    );
  };

  /* =========================================================
     THERAPEUTIC RELEVANCE
  ========================================================= */

  const renderTherapeutic = () => {
    if (!selectedPathway) {
      return null;
    }

    return (
      <div className="space-y-6">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Therapeutic Relevance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Therapeutic characteristics associated
            with this pathway.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Druggable
            </div>

            <div className="mt-3 text-lg font-semibold text-slate-800">
              {selectedPathway.druggable ===
              null
                ? "Not available"
                : selectedPathway.druggable
                ? "Yes"
                : "No"}
            </div>

          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Pathway Status
            </div>

            <div className="mt-3 text-sm font-medium text-slate-700">
              {renderValue(
                selectedPathway.pathway_status
              )}
            </div>

          </div>

        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Primary Function
          </div>

          <p className="mt-3 text-sm leading-7 text-slate-700">
            {renderValue(
              selectedPathway.primary_function
            )}
          </p>

        </div>

      </div>
    );
  };

  /* =========================================================
     DATABASE INFORMATION
  ========================================================= */

  const renderDatabase = () => {
    if (!selectedPathway) {
      return null;
    }

    return (
      <div className="space-y-6">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Database Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Database identifiers and source information.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Pathway ID
            </div>

            <div className="mt-2 text-sm font-semibold text-slate-700">
              {selectedPathway.pathway_id}
            </div>

          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Source Sheet
            </div>

            <div className="mt-2 text-sm font-semibold text-slate-700">
              {selectedPathway.source_sheet}
            </div>

          </div>

        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Canonical Databases
          </div>

          <p className="mt-3 text-sm leading-7 text-slate-700">
            {renderValue(
              selectedPathway.canonical_databases
            )}
          </p>

        </div>

      </div>
    );
  };

  /* =========================================================
     ACTIVE CONTENT
  ========================================================= */

  const renderActiveContent = () => {

    if (activeSection === "overview") {
      return renderOverview();
    }

    if (activeSection === "clinical") {
      return renderClinical();
    }

    if (activeSection === "therapeutic") {
      return renderTherapeutic();
    }

    if (activeSection === "database") {
      return renderDatabase();
    }

    /*
     * If it is not one of the fixed tabs,
     * it must be one of the actual pathway tables.
     */

    const selectedTable =
      pathwayTables.find(
        ([sectionName]) =>
          sectionName === activeSection
      );

    if (!selectedTable) {
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          No data available for this section.
        </div>
      );
    }

    return (
      <PathwayTableView
        sectionName={selectedTable[0]}
        sectionData={selectedTable[1]}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-sm">
              <Network size={23} />
            </div>

            <div>

              <h1
                className="text-2xl font-bold text-slate-900"
                style={{
                  fontFamily: "Roboto Slab",
                }}
              >
                Pathways
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Explore molecular and cellular pathways
                involved in MASLD.
              </p>

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
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

            <AlertCircle size={18} />

            {error}

          </div>
        )}

        {/* =================================================
            PATHWAY SELECTOR
        ================================================== */}

        <div className="mb-8">

          <div className="max-w-xl">

            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Select Pathway
            </label>

            <div className="relative">

              <select
                value={
                  selectedPathway?.id ?? ""
                }
                onChange={(e) => {

                  const pathwayId =
                    Number(e.target.value);

                  const pathway =
                    pathways.find(
                      (item) =>
                        item.id ===
                        pathwayId
                    );

                  if (pathway) {

                    setActiveSection(
                      "overview"
                    );

                    selectPathway(
                      pathway
                    );

                  }

                }}
                disabled={loading}
                className="
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  pr-10
                  text-sm
                  font-medium
                  text-slate-700
                  shadow-sm
                  outline-none
                  transition
                  focus:border-teal-500
                  focus:ring-2
                  focus:ring-teal-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                <option value="">
                  Select a pathway...
                </option>

                {pathways.map(
                  (pathway) => (
                    <option
                      key={pathway.id}
                      value={pathway.id}
                    >
                      {
                        pathway.pathway_name
                      }
                    </option>
                  )
                )}

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

        </div>

        {/* =================================================
            INITIAL LOADING
        ================================================== */}

        {loading && (
          <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-16">

            <div className="flex items-center gap-3 text-sm text-slate-500">

              <Loader2
                size={20}
                className="animate-spin"
              />

              Loading pathways...

            </div>

          </div>
        )}

        {/* =================================================
            SELECTED PATHWAY
        ================================================== */}

        {selectedPathway &&
          !loading &&
          !detailsLoading && (

            <div className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* =================================================
                  PATHWAY HEADER
              ================================================== */}

              <div className="border-b border-slate-200 px-6 py-5">

                <div className="flex flex-wrap items-center justify-between gap-4">

                  <div>

                    <div className="mb-2 inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                      {
                        selectedPathway.pathway_id
                      }
                    </div>

                    <h2
                      className="text-2xl font-bold text-slate-900"
                      style={{
                        fontFamily:
                          "Roboto Slab",
                      }}
                    >
                      {
                        selectedPathway.pathway_name
                      }
                    </h2>

                  </div>

                  <div className="text-right">

                    <div className="text-xs text-slate-400">
                      Source
                    </div>

                    <div className="mt-1 text-sm font-medium text-slate-700">
                      {
                        selectedPathway.source_sheet
                      }
                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  SIDEBAR + CONTENT
              ================================================== */}

              <div className="grid min-h-[600px] md:grid-cols-[250px_1fr]">

                {/* =================================================
                    LEFT SIDEBAR
                ================================================== */}

                <aside className="border-b border-slate-200 bg-slate-50 md:border-b-0 md:border-r">

                  <div className="p-4">

                    <div className="mb-3 px-2 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Pathway Sections
                    </div>

                    <nav className="space-y-1">

                      {/* =================================================
                          OVERVIEW
                      ================================================== */}

                      <button
                        type="button"
                        onClick={() =>
                          setActiveSection(
                            "overview"
                          )
                        }
                        className={`
                          flex
                          w-full
                          items-center
                          gap-3
                          rounded-lg
                          px-3
                          py-2.5
                          text-left
                          text-sm
                          font-medium
                          transition-all
                          duration-200
                          ${
                            activeSection ===
                            "overview"
                              ? "bg-teal-600 text-white shadow-sm"
                              : "text-slate-600 hover:bg-white hover:text-teal-700 hover:shadow-sm"
                          }
                        `}
                      >

                        <Info size={17} />

                        <span>
                          Overview
                        </span>

                      </button>

                      {/* =================================================
                          PATHWAY DETAILS HOVER MENU
                      ================================================== */}

                      <div className="group relative">

                        {/* Main menu item */}

                        <div
                          className={`
                            flex
                            w-full
                            cursor-pointer
                            items-center
                            justify-between
                            rounded-lg
                            px-3
                            py-2.5
                            text-sm
                            font-medium
                            transition-all
                            duration-200
                            ${
                              pathwayTables.some(
                                ([sectionName]) =>
                                  sectionName ===
                                  activeSection
                              )
                                ? "bg-teal-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-white hover:text-teal-700 hover:shadow-sm"
                            }
                          `}
                        >

                          <div className="flex items-center gap-3">

                            <Activity
                              size={17}
                            />

                            <span>
                              Pathway Details
                            </span>

                          </div>

                          <ChevronDown
                            size={16}
                            className="
                              transition-transform
                              duration-200
                              group-hover:rotate-180
                            "
                          />

                        </div>

                        {/* =================================================
                            HOVER SUBMENU
                        ================================================== */}

                        {pathwayTables.length >
                          0 && (

                          <div
                            className="
                              absolute
                              left-full
                              top-0
                              z-50
                              hidden
                              w-72
                              rounded-xl
                              border
                              border-slate-200
                              bg-white
                              p-2
                              shadow-xl
                              group-hover:block
                            "
                          >

                            <div className="border-b border-slate-100 px-3 py-2">

                              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Pathway Tables
                              </div>

                            </div>

                            {/* Original table order */}

                            <div className="max-h-[420px] overflow-y-auto pt-1">

                              {pathwayTables.map(
                                ([
                                  sectionName,
                                ]) => (

                                  <button
                                    key={
                                      sectionName
                                    }
                                    type="button"
                                    onClick={() =>
                                      setActiveSection(
                                        sectionName
                                      )
                                    }
                                    title={
                                      sectionName
                                    }
                                    className={`
                                      flex
                                      w-full
                                      items-center
                                      rounded-lg
                                      px-3
                                      py-2.5
                                      text-left
                                      text-sm
                                      transition-all
                                      duration-150
                                      ${
                                        activeSection ===
                                        sectionName
                                          ? "bg-teal-50 font-semibold text-teal-700"
                                          : "text-slate-600 hover:bg-slate-50 hover:text-teal-700"
                                      }
                                    `}
                                  >

                                    <span className="truncate">
  {sectionName.replace(
    /^\s*\d+[\.\)\-:\s]+/,
    ""
  )}
</span>

                                  </button>

                                )
                              )}

                            </div>

                          </div>

                        )}

                      </div>

                      {/* =================================================
                          CLINICAL INFORMATION
                      ================================================== */}

                      <button
                        type="button"
                        onClick={() =>
                          setActiveSection(
                            "clinical"
                          )
                        }
                        className={`
                          flex
                          w-full
                          items-center
                          gap-3
                          rounded-lg
                          px-3
                          py-2.5
                          text-left
                          text-sm
                          font-medium
                          transition-all
                          duration-200
                          ${
                            activeSection ===
                            "clinical"
                              ? "bg-teal-600 text-white shadow-sm"
                              : "text-slate-600 hover:bg-white hover:text-teal-700 hover:shadow-sm"
                          }
                        `}
                      >

                        <HeartPulse
                          size={17}
                        />

                        <span>
                          Clinical Information
                        </span>

                      </button>

                      {/* =================================================
                          THERAPEUTIC RELEVANCE
                      ================================================== */}

                      <button
                        type="button"
                        onClick={() =>
                          setActiveSection(
                            "therapeutic"
                          )
                        }
                        className={`
                          flex
                          w-full
                          items-center
                          gap-3
                          rounded-lg
                          px-3
                          py-2.5
                          text-left
                          text-sm
                          font-medium
                          transition-all
                          duration-200
                          ${
                            activeSection ===
                            "therapeutic"
                              ? "bg-teal-600 text-white shadow-sm"
                              : "text-slate-600 hover:bg-white hover:text-teal-700 hover:shadow-sm"
                          }
                        `}
                      >

                        <FlaskConical
                          size={17}
                        />

                        <span>
                          Therapeutic Relevance
                        </span>

                      </button>

                      {/* =================================================
                          DATABASE INFORMATION
                      ================================================== */}

                      <button
                        type="button"
                        onClick={() =>
                          setActiveSection(
                            "database"
                          )
                        }
                        className={`
                          flex
                          w-full
                          items-center
                          gap-3
                          rounded-lg
                          px-3
                          py-2.5
                          text-left
                          text-sm
                          font-medium
                          transition-all
                          duration-200
                          ${
                            activeSection ===
                            "database"
                              ? "bg-teal-600 text-white shadow-sm"
                              : "text-slate-600 hover:bg-white hover:text-teal-700 hover:shadow-sm"
                          }
                        `}
                      >

                        <Database size={17} />

                        <span>
                          Database Information
                        </span>

                      </button>

                    </nav>

                  </div>

                </aside>

                {/* =================================================
                    RIGHT CONTENT
                ================================================== */}

                <section className="min-w-0 bg-white">

                  <div className="p-6 md:p-8">

                    {renderActiveContent()}

                  </div>

                </section>

              </div>

            </div>

          )}

        {/* =================================================
            DETAILS LOADING
        ================================================== */}

        {detailsLoading && (
          <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-20">

            <div className="flex items-center gap-3 text-sm text-slate-500">

              <Loader2
                size={20}
                className="animate-spin"
              />

              Loading pathway details...

            </div>

          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================== */}

        {!selectedPathway &&
          !loading &&
          !detailsLoading && (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">

                <FlaskConical
                  size={26}
                />

              </div>

              <h2 className="text-lg font-semibold text-slate-800">
                Select a pathway
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Choose a pathway from the dropdown
                above to explore its molecular,
                clinical, and therapeutic information.
              </p>

            </div>

          )}

      </main>

    </div>
  );
}