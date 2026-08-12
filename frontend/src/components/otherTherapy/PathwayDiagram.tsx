import { useMemo } from "react";

type Props = {
  pathwayData: string | null;
};

type ParsedDiagram = {
  pathway: string;
  actionTitle: string | null;
  actions: string[];
  outcomeTitle: string | null;
  outcomes: string[];
};

type RawLine = {
  text: string;
  originalIndex: number;
};

function parsePathwayData(
  pathwayData: string
): {
  originalText: string;
} | null {
  try {
    const data = JSON.parse(pathwayData);

    if (
      data &&
      typeof data.original_text === "string"
    ) {
      return {
        originalText: data.original_text,
      };
    }

    return null;
  } catch (error) {
    console.error(
      "Failed to parse pathway_data:",
      error
    );

    return null;
  }
}

/*
 * Detect an outcome heading.
 *
 * Examples:
 * Outcome
 * Outcome (experimental models):
 * Outcome:
 * Potential Outcome
 */
function isOutcomeHeading(
  text: string
): boolean {
  const value = text
    .trim()
    .toLowerCase();

  return (
    value.startsWith("outcome") ||
    value.startsWith("potential outcome")
  );
}

/*
 * Detect an action item.
 *
 * Examples:
 * ✓ ↓ ROS
 * ✓ Activates NRF2–ARE
 * ✓ Inhibits NF-κB
 */
function isActionLine(
  text: string
): boolean {
  return text.trim().startsWith("✓");
}

/*
 * Detect diagram-only lines.
 *
 * We do NOT remove these from the pathway.
 * They are only used when determining whether
 * a line is blank/structural.
 */
function isOnlySeparator(
  text: string
): boolean {
  const compact = text
    .replace(/\s/g, "");

  if (!compact) {
    return true;
  }

  return /^[─━═_-]+$/.test(
    compact
  );
}

/*
 * Extract the action text while keeping
 * the actual source wording.
 */
function cleanAction(
  text: string
): string {
  return text
    .trim()
    .replace(/^✓\s*/, "")
    .trim();
}

/*
 * Remove the action marker from a title
 * if one exists.
 */
function cleanActionTitle(
  text: string
): string {
  return text
    .trim()
    .replace(
      /[-─━═]+$/g,
      ""
    )
    .trim();
}

function parseDiagram(
  originalText: string
): ParsedDiagram {
  const rawLines: RawLine[] =
    originalText
      .replace(/\r/g, "")
      .split("\n")
      .map((text, index) => ({
        text,
        originalIndex: index,
      }));

  /*
   * Find the first action line.
   *
   * This works even if the source sheet
   * doesn't contain "proposed actions".
   */
  const firstActionIndex =
    rawLines.findIndex((line) =>
      isActionLine(line.text)
    );

  /*
   * Find outcome heading.
   */
  const outcomeIndex =
    rawLines.findIndex((line) =>
      isOutcomeHeading(line.text)
    );

  /*
   * Determine where the pathway ends.
   *
   * If there are actions, pathway ends
   * immediately before the action block.
   *
   * Otherwise, if there is an outcome,
   * pathway ends before the outcome.
   */
  let pathwayEnd =
    rawLines.length;

  if (
    firstActionIndex !== -1
  ) {
    pathwayEnd = firstActionIndex;
  } else if (
    outcomeIndex !== -1
  ) {
    pathwayEnd = outcomeIndex;
  }

  /*
   * Build pathway exactly from the source.
   *
   * We deliberately DON'T remove:
   *
   * │
   * ▼
   * ├────────►
   *
   * because these characters represent the
   * actual source diagram.
   */
  const pathwayLines =
    rawLines
      .slice(0, pathwayEnd)
      .map((line) => line.text)
      .join("\n")
      .trim();

  /*
   * Find action title.
   *
   * Usually this is the line immediately
   * before the first ✓ line.
   *
   * Example:
   *
   * Phyllanthus niruri phytochemicals
   * ✓ Activates NRF2–ARE
   */
  let actionTitle:
    | string
    | null = null;

  if (
    firstActionIndex > 0
  ) {
    for (
      let i = firstActionIndex - 1;
      i >= 0;
      i--
    ) {
      const candidate =
        rawLines[i].text.trim();

      if (!candidate) {
        continue;
      }

      if (
        isOnlySeparator(candidate)
      ) {
        continue;
      }

      /*
       * Don't accidentally use an
       * outcome heading as the title.
       */
      if (
        isOutcomeHeading(candidate)
      ) {
        break;
      }

      actionTitle =
        cleanActionTitle(
          candidate
        );

      break;
    }
  }

  /*
   * Extract actions.
   *
   * We collect every consecutive ✓ item.
   */
  const actions: string[] = [];

  if (
    firstActionIndex !== -1
  ) {
    for (
      let i = firstActionIndex;
      i < rawLines.length;
      i++
    ) {
      const text =
        rawLines[i].text.trim();

      if (
        isActionLine(text)
      ) {
        const action =
          cleanAction(text);

        if (action) {
          actions.push(action);
        }

        continue;
      }

      /*
       * Ignore separator/blank lines
       * between action items.
       */
      if (
        !text ||
        isOnlySeparator(text)
      ) {
        continue;
      }

      /*
       * Stop when the outcome section
       * begins.
       */
      if (
        isOutcomeHeading(text)
      ) {
        break;
      }

      /*
       * If another normal text line occurs
       * after actions have started, stop.
       */
      if (actions.length > 0) {
        break;
      }
    }
  }

  /*
   * Extract outcome title and outcomes.
   */
  let outcomeTitle:
    | string
    | null = null;

  const outcomes: string[] = [];

  if (
    outcomeIndex !== -1
  ) {
    outcomeTitle =
      rawLines[
        outcomeIndex
      ].text.trim();

    for (
      let i = outcomeIndex + 1;
      i < rawLines.length;
      i++
    ) {
      const text =
        rawLines[i].text.trim();

      if (!text) {
        continue;
      }

      if (
        isOnlySeparator(text)
      ) {
        continue;
      }

      /*
       * Ignore action lines if any appear
       * after the outcome heading.
       */
      if (
        isActionLine(text)
      ) {
        continue;
      }

      outcomes.push(text);
    }
  }

  return {
    pathway: pathwayLines,
    actionTitle,
    actions,
    outcomeTitle,
    outcomes,
  };
}

export default function PathwayDiagram({
  pathwayData,
}: Props) {
  const diagram = useMemo(() => {
    if (!pathwayData) {
      return null;
    }

    const parsed =
      parsePathwayData(
        pathwayData
      );

    if (!parsed) {
      return null;
    }

    return parseDiagram(
      parsed.originalText
    );
  }, [pathwayData]);

  if (!diagram) {
    return (
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">
          Pathway information is not
          available for this therapy.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* ==============================
          HEADER
      =============================== */}

      <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
        <h2
          className="text-xl font-semibold text-slate-900"
          style={{
            fontFamily:
              "Roboto Slab",
          }}
        >
          Therapy Pathway
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Visual representation of the
          pathway described in the source
          data.
        </p>
      </div>

      <div className="p-6">

        {/* ==============================
            ORIGINAL PATHWAY
        =============================== */}

        {diagram.pathway && (
          <div>
            <div className="mb-5">
              <h3 className="text-base font-semibold text-slate-800">
                Pathway
              </h3>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-8">

              <pre
                className="
                  mx-auto
                  w-fit
                  min-w-full
                  whitespace-pre
                  font-mono
                  text-sm
                  leading-7
                  text-slate-700
                "
              >
                {diagram.pathway}
              </pre>

            </div>
          </div>
        )}

        {/* ==============================
            THERAPY ACTIONS
        =============================== */}

        {diagram.actions.length >
          0 && (
          <div className="mt-10 border-t border-slate-100 pt-8">

            <div className="mb-5">
              <h3 className="text-base font-semibold text-slate-800">
                {diagram.actionTitle ||
                  "Therapy Actions"}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Proposed actions associated
                with the therapy.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {diagram.actions.map(
                (
                  action,
                  index
                ) => (
                  <div
                    key={`${action}-${index}`}
                    className="
                      rounded-xl
                      border
                      border-emerald-200
                      bg-emerald-50
                      px-4
                      py-4
                      transition
                      hover:border-emerald-300
                      hover:shadow-sm
                    "
                  >
                    <div className="flex items-start gap-3">

                      <span
                        className="
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-emerald-100
                          text-sm
                          font-semibold
                          text-emerald-700
                        "
                      >
                        ✓
                      </span>

                      <span className="pt-1 text-sm font-medium leading-5 text-emerald-800">
                        {action}
                      </span>

                    </div>
                  </div>
                )
              )}

            </div>
          </div>
        )}

        {/* ==============================
            OUTCOME
        =============================== */}

        {diagram.outcomes.length >
          0 && (
          <div className="mt-10 border-t border-slate-100 pt-8">

            <div className="mb-5">
              <h3 className="text-base font-semibold text-slate-800">
                {diagram.outcomeTitle ||
                  "Outcome"}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Reported or proposed outcomes
                from the source data.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {diagram.outcomes.map(
                (
                  outcome,
                  index
                ) => (
                  <div
                    key={`${outcome}-${index}`}
                    className="
                      rounded-xl
                      border
                      border-blue-200
                      bg-blue-50
                      px-4
                      py-4
                      text-center
                      transition
                      hover:border-blue-300
                      hover:shadow-sm
                    "
                  >
                    <span className="text-sm font-semibold text-blue-800">
                      {outcome}
                    </span>
                  </div>
                )
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}