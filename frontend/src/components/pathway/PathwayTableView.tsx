import {
  Database,
  FileText,
  Rows3,
} from "lucide-react";

interface PathwayTableViewProps {
  sectionName: string;
  sectionData: unknown;
}

export default function PathwayTableView({
  sectionName,
  sectionData,
}: PathwayTableViewProps) {
  /*
   * Convert the section data into rows.
   *
   * The backend stores each Excel table as an array
   * of objects. We keep the original column structure.
   */

  const rows = Array.isArray(sectionData)
    ? sectionData
    : [];

  /*
   * Get all column names from all rows.
   *
   * This is safer than checking only the first row
   * because some Excel rows may contain different
   * fields.
   */

  const columns = Array.from(
    new Set(
      rows.flatMap((row) => {
        if (
          typeof row === "object" &&
          row !== null &&
          !Array.isArray(row)
        ) {
          return Object.keys(
            row as Record<string, unknown>
          );
        }

        return [];
      })
    )
  );

  return (
    <div className="space-y-6">

      {/* =====================================================
          TABLE HEADER
      ====================================================== */}

      <div className="flex flex-wrap items-start justify-between gap-4">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
            <Database size={19} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {sectionName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Structured data from the selected
              pathway source table.
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
          <Rows3 size={15} />

          {rows.length}{" "}
          {rows.length === 1
            ? "record"
            : "records"}
        </div>

      </div>

      {/* =====================================================
          EMPTY STATE
      ====================================================== */}

      {rows.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">

          <FileText
            size={30}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-3 text-sm font-semibold text-slate-700">
            No data available
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            This pathway does not contain records
            for this section.
          </p>

        </div>
      )}

      {/* =====================================================
          TABLE
      ====================================================== */}

      {rows.length > 0 && columns.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

          {/* Table toolbar */}

          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <FileText size={15} />
              {columns.length}{" "}
              {columns.length === 1
                ? "column"
                : "columns"}
            </div>

            <div className="text-xs text-slate-400">
              Pathway database
            </div>

          </div>

          {/* Horizontal scrolling */}

          <div className="max-h-[620px] overflow-auto">

            <table className="min-w-full border-collapse">

              {/* =================================================
                  HEADER
              ================================================== */}

              <thead className="sticky top-0 z-10">

                <tr className="border-b border-slate-200 bg-slate-100">

                  <th
                    className="
                      sticky
                      left-0
                      z-20
                      min-w-[60px]
                      border-r
                      border-slate-200
                      bg-slate-100
                      px-4
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-slate-400
                    "
                  >
                    #
                  </th>

                  {columns.map(
                    (column) => (
                      <th
                        key={column}
                        className="
                          min-w-[180px]
                          whitespace-nowrap
                          border-r
                          border-slate-200
                          px-4
                          py-3
                          text-left
                          text-xs
                          font-semibold
                          uppercase
                          tracking-wide
                          text-slate-500
                          last:border-r-0
                        "
                      >
                        {column}
                      </th>
                    )
                  )}

                </tr>

              </thead>

              {/* =================================================
                  BODY
              ================================================== */}

              <tbody>

                {rows.map(
                  (row,rowIndex) => {

                    const rowData =
                      typeof row ===
                        "object" &&
                      row !== null &&
                      !Array.isArray(row)
                        ? (row as Record<
                            string,
                            unknown
                          >)
                        : null;

                    return (
                      <tr
                        key={rowIndex}
                        className="
                          border-b
                          border-slate-100
                          transition
                          hover:bg-teal-50/40
                          last:border-b-0
                        "
                      >

                        {/* Row number */}

                        <td
                          className="
                            sticky
                            left-0
                            z-[1]
                            border-r
                            border-slate-100
                            bg-white
                            px-4
                            py-3
                            text-xs
                            font-medium
                            text-slate-400
                          "
                        >
                          {rowIndex + 1}
                        </td>

                        {columns.map(
                          (column) => {

                            const value =
                              rowData
                                ? rowData[
                                    column
                                  ]
                                : row;

                            return (
                              <td
                                key={column}
                                className="
                                  min-w-[180px]
                                  max-w-[420px]
                                  border-r
                                  border-slate-100
                                  px-4
                                  py-3
                                  align-top
                                  text-sm
                                  leading-6
                                  text-slate-700
                                  last:border-r-0
                                "
                              >
                                <TableCellValue
                                  value={
                                    value
                                  }
                                />
                              </td>
                            );
                          }
                        )}

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

          {/* Footer */}

          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
            Showing {rows.length}{" "}
            {rows.length === 1
              ? "record"
              : "records"}
          </div>

        </div>
      )}

      {/* Non-array data */}

      {rows.length === 0 &&
        !Array.isArray(sectionData) && (
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <pre className="overflow-auto text-sm text-slate-700">
              {JSON.stringify(
                sectionData,
                null,
                2
              )}
            </pre>
          </div>
        )}

    </div>
  );
}


/* =========================================================
   TABLE CELL
========================================================= */

function TableCellValue({
  value,
}: {
  value: unknown;
}) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return (
      <span className="text-slate-300">
        —
      </span>
    );
  }

  if (typeof value === "boolean") {
    return (
      <span
        className={`
          inline-flex
          rounded-full
          px-2
          py-0.5
          text-xs
          font-medium
          ${
            value
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }
        `}
      >
        {value ? "Yes" : "No"}
      </span>
    );
  }

  if (
    typeof value === "object"
  ) {
    return (
      <span className="whitespace-pre-wrap">
        {JSON.stringify(value)}
      </span>
    );
  }

  return (
    <span className="whitespace-pre-wrap">
      {String(value)}
    </span>
  );
}