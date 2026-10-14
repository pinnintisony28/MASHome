import { useState } from "react";

import api from "../../services/api";



import {

  ChevronDown,

  Network,

  Loader2,

  AlertCircle,



  Activity,

  FlaskConical,



} from "lucide-react";



import usePathways from "../../hooks/usePathways";

import PathwayTableView from "../../components/pathway/PathwayTableView";



const PATHWAY_IMAGES: Record<string, string> = {
  "Insulin Resistance": "Insulin_Resistance.png",
  "AMPK": "AMPK.png",
  "Apoptosis": "Apoptosis.png",
  "Autophagy": "Autophagy.png",
  "Bile Acid FXR": "Bile_Acid_FXR.png",
  "Carcinogenesis": "Carcinogenesis.png",
  "Cell Cycle Regulation": "Cell_Cycle_Regulation.png",
  "Cholesterol Metabolism": "Cholesterol_Metabolism.png",
  "ChREBP": "ChREBP.png",
  "DNA Damage Response": "DNA_Damage_Response.png",
  "ECM Remodeling": "ECM_Remodeling.png",
  "ER Stress UPR": "ER_Stress_UPR.png",
  "Fatty Acid Oxidation": "Fatty_Acid_Oxidation.png",
  "Ferroptosis": "Ferroptosis.png",
  "Gut Liver Axis": "Gut_Liver_Axis.png",
  "Hippo YAP": "Hippo_YAP.png",
  "Immune Cell Signaling": "Immune_Cell_Signaling.png",
  "JAK STAT": "JAK_STAT.png",
  "KEAP1 NRF2": "KEAP1_NRF2.png",
  "Lipogenesis": "Lipogenesis.png",
  "MAPK JNK": "MAPK_JNK.png",
  "Mitophagy": "Mitophagy.png",
  "Necroptosis": "Necroptosis.png",
  "NF-κB Inflammatory Signaling Pathway": "NF_B.png",
  "NLRP3 Inflammasome": "NLRP3_Inflammasome.png",
  "Notch": "Notch.png",
  "PDGF": "PDGF.png",
  "PI3K–AKT–mTOR Signaling Pathway": "PI3K_AKT_mTOR.png",
  "PPAR": "PPAR.png",
  "Pyroptosis": "Pyroptosis.png",
  "SREBP": "SREBP.png",
  "TGF-β–SMAD Signaling Pathway": "TGF_SMAD.png",
  "TLR4": "TLR4.png",
  "VEGF": "VEGF.png",
  "Wnt Catenin": "Wnt_Catenin.png",
};
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

    useState<string>("");

  const [showPathwayMenu, setShowPathwayMenu] =

    useState(false);
  console.log("Selected pathway image URL:", selectedPathway?.image_url);

  /*console.log("Selected pathway image URL:", selectedPathway?.image_url);

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

    <div className="min-h-screen bg-slate-50"  style={{ fontFamily: "'Roboto Slab', serif" }}>



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

  pathwayTables.length > 0

    ? pathwayTables[0][0]

    : ""

);



                    selectPathway(

                      pathway

                    );



                  }



                }}

                disabled={loading}

                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-60"

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

                    
{(() => {
  const imageFile =
    PATHWAY_IMAGES[selectedPathway.source_sheet] ||
    PATHWAY_IMAGES[selectedPathway.pathway_name];

  const imageUrl = selectedPathway.image_url
    ? selectedPathway.image_url.startsWith("http")
      ? selectedPathway.image_url
      : selectedPathway.image_url.startsWith("/pathway-images/")
        ? selectedPathway.image_url
        : `/pathway-images/${selectedPathway.image_url.replace(/^\/+/, "")}`
    : imageFile
      ? `/pathway-images/${imageFile}`
      : null;

  return imageUrl ? (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
      <img
        src={imageUrl}
        alt={`${selectedPathway.pathway_name} pathway`}
        className="mx-auto block max-h-[700px] w-full object-contain"
        onError={(e) => {
          console.error("Failed to load pathway image:", imageUrl);
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  ) : null;
})()}



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



                      {/* <button

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



                      </button> */}



                      {/* =================================================

                          PATHWAY DETAILS HOVER MENU

                      ================================================== */}



                      <div className="group relative">



                        {/* Main menu item */}



                        <div

                          onClick={() => setShowPathwayMenu(!showPathwayMenu)}

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

                            className={`

                              relative

  mt-1

  z-50

  w-full

  rounded-xl

  border

  border-slate-200

  bg-white

  p-2

  shadow-xl



 ${showPathwayMenu ? "block" : "hidden"}



md:absolute

md:left-full

md:top-0

md:w-72

md:hidden

md:group-hover:block

md:group-focus-within:block

`}

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

                                    onClick={() => {

  setActiveSection(sectionName);

  setShowPathwayMenu(false);

}}

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

    /^\s*\d+[.)\-:\s]+/,

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
