import os
import re
import json
import pandas as pd

from app.database import SessionLocal
from app.models.pathway import Pathway


# ============================================================
# FILE LOCATION
# ============================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
             os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)
)

FILE_PATH = os.path.join(
    BASE_DIR,
    "datasets",
    "Pathways.xlsx"
)


# ============================================================
# CONFIGURATION
# ============================================================

SKIP_SHEETS = {
    "Sheet1"
}


MASTER_FIELDS = {
    "Pathway_ID",
    "Pathway_Name",
    "Category",
    "Super_Category",
    "Disease",
    "Disease_Stages",
    "Cellular Location",
    "Primary Function",
    "Major Cell Types",
    "Clinical Importance",
    "Druggable",
    "Pathway Status",
    "Canonical Databases",
}


# ============================================================
# HELPERS
# ============================================================

def clean_value(value):
    """
    Convert Excel values into clean JSON/database values.
    """

    if pd.isna(value):
        return None

    if isinstance(value, float):
        if value.is_integer():
            return int(value)

    value = str(value).strip()

    if not value:
        return None

    return value


def normalize_field_name(value):
    """
    Normalize Excel field names so that different sheets
    can still be mapped to the same database columns.
    """

    if value is None:
        return None

    value = str(value).strip()

    mapping = {
        "Cellular Location": "cellular_location",
        "Primary Function": "primary_function",
        "Major Cell Types": "major_cell_types",
        "Clinical Importance": "clinical_importance",
        "Pathway_ID": "pathway_id",
        "Pathway_Name": "pathway_name",
        "Category": "category",
        "Super_Category": "super_category",
        "Disease": "disease",
        "Disease_Stages": "disease_stages",
        "Druggable": "druggable",
        "Pathway Status": "pathway_status",
        "Canonical Databases": "canonical_databases",
    }

    return mapping.get(
        value,
        value
    )


def parse_boolean(value):
    """
    Convert Yes/No Excel values into Python booleans.
    """

    if value is None:
        return None

    value = str(value).strip().lower()

    if value in {
        "yes",
        "true",
        "1",
        "y"
    }:
        return True

    if value in {
        "no",
        "false",
        "0",
        "n"
    }:
        return False

    return None


def make_fallback_pathway_id(
    sheet_name,
    sheet_index
):
    """
    Some sheets do not contain a Pathway_ID.
    Generate a stable internal ID instead of failing.
    """

    safe_name = re.sub(
        r"[^A-Za-z0-9]+",
        "_",
        sheet_name
    ).strip("_")

    return f"AUTO_{sheet_index:03d}_{safe_name}"


# ============================================================
# SECTION DETECTION
# ============================================================

def is_section_heading(value):
    """
    Detect numbered sections:

    1. Pathway Master Table
    2. Disease Initiation Table
    ...
    18. Novel Database Fields
    """

    if value is None:
        return False

    value = str(value).strip()

    return bool(
        re.match(
            r"^\d+\.\s+",
            value
        )
    )


def detect_sections(df):
    """
    Split a worksheet into logical sections.

    Returns:

    {
        "1. Pathway Master Table": dataframe,
        "2. Disease Initiation Table": dataframe,
        ...
    }
    """

    sections = []

    current_section = None
    current_rows = []

    for _, row in df.iterrows():

        first_value = clean_value(
            row.iloc[0]
        )

        if is_section_heading(
            first_value
        ):

            if current_section is not None:
                sections.append(
                    (
                        current_section,
                        current_rows
                    )
                )

            current_section = first_value
            current_rows = []

        else:

            if current_section is not None:
                current_rows.append(
                    row.tolist()
                )

    if current_section is not None:
        sections.append(
            (
                current_section,
                current_rows
            )
        )

    return sections


# ============================================================
# SPECIAL SECTION DETECTION
# ============================================================

def detect_insulin_sections(df):
    """
    Insulin Resistance uses a different layout.

    Example:

    Pathway Master Table
    Field
    Value

    Disease Initiation Table
    Trigger
    Mechanism
    Effect

    Signaling Cascade Table
    Order
    Molecule
    Type
    Function

    etc.
    """

    known_sections = {
        "Pathway Master Table",
        "Disease Initiation Table",
        "Signaling Cascade Table",
        "Major Gene Table",
        "Protein Table",
        "Organelle Table",
        "Cellular Events Table",
        "Biomarker Table",
        "Therapeutic Target Table",
    }

    sections = []

    current_section = None
    current_rows = []

    for _, row in df.iterrows():

        first_value = clean_value(
            row.iloc[0]
        )

        if first_value in known_sections:

            if current_section is not None:
                sections.append(
                    (
                        current_section,
                        current_rows
                    )
                )

            current_section = first_value
            current_rows = []

        else:

            if current_section is not None:
                current_rows.append(
                    row.tolist()
                )

    if current_section is not None:
        sections.append(
            (
                current_section,
                current_rows
            )
        )

    return sections


# ============================================================
# SECTION → JSON
# ============================================================

def rows_to_json(rows):
    """
    Convert a list of Excel rows into a list of dictionaries.

    Example:

    Header:
    Trigger | Molecular Event | Outcome

    Data:
    Obesity | Insulin resistance | Lipid accumulation

    becomes:

    [
        {
            "Trigger": "Obesity",
            "Molecular Event": "Insulin resistance",
            "Outcome": "Lipid accumulation"
        }
    ]
    """

    if not rows:
        return []

    cleaned_rows = []

    for row in rows:

        cleaned = [
            clean_value(value)
            for value in row
        ]

        if any(
            value is not None
            for value in cleaned
        ):
            cleaned_rows.append(
                cleaned
            )

    if not cleaned_rows:
        return []

    # Find the first useful row as header
    header_index = 0

    headers = cleaned_rows[
        header_index
    ]

    headers = [
        (
            str(header).strip()
            if header is not None
            else f"column_{index + 1}"
        )
        for index, header
        in enumerate(headers)
    ]

    data_rows = cleaned_rows[
        header_index + 1:
    ]

    result = []

    for row in data_rows:

        item = {}

        for index, header in enumerate(
            headers
        ):

            if index >= len(row):
                value = None
            else:
                value = row[index]

            if (
                value is not None
            ):
                item[header] = value

        if item:
            result.append(
                item
            )

    return result


# ============================================================
# MASTER TABLE EXTRACTION
# ============================================================

def extract_master_data(
    df,
    sheet_name
):
    """
    Extract common pathway information.

    Handles both:

    A) Vertical layout:

    Field | Value
    Pathway_ID | MP002
    Pathway_Name | ...
    
    B) Wide layout:

    Field
    Value

    where the actual master fields are spread
    horizontally.
    """

    master = {}

    # --------------------------------------------------------
    # Find "Pathway Master Table"
    # --------------------------------------------------------

    master_start = None

    for index in range(
        len(df)
    ):

        value = clean_value(
            df.iloc[index, 0]
        )

        if value and (
            "Pathway Master Table"
            in value
        ):

            master_start = index
            break

    # --------------------------------------------------------
    # If no master table exists,
    # return empty data.
    # --------------------------------------------------------

    if master_start is None:
        return master

    # --------------------------------------------------------
    # Find next section
    # --------------------------------------------------------

    master_end = len(df)

    for index in range(
        master_start + 1,
        len(df)
    ):

        value = clean_value(
            df.iloc[index, 0]
        )

        if is_section_heading(
            value
        ):
            master_end = index
            break

    master_df = df.iloc[
        master_start + 1:
        master_end
    ]

    # --------------------------------------------------------
    # Find Field row
    # --------------------------------------------------------

    field_row_index = None

    for index in range(
        len(master_df)
    ):

        first = clean_value(
            master_df.iloc[
                index, 0
            ]
        )

        if first == "Field":
            field_row_index = index
            break

    if field_row_index is None:
        return master

    # --------------------------------------------------------
    # Determine format
    # --------------------------------------------------------

    field_row = master_df.iloc[
        field_row_index
    ].tolist()

    next_row = None

    if (
        field_row_index + 1
        < len(master_df)
    ):
        next_row = master_df.iloc[
            field_row_index + 1
        ].tolist()

    # --------------------------------------------------------
    # STANDARD FORMAT
    #
    # Field | Value
    # Pathway_ID | MP002
    # Pathway_Name | ...
    # --------------------------------------------------------

    if (
        len(field_row) >= 2
        and str(
            field_row[1]
        ).strip().lower()
        == "value"
    ):

        for row in master_df.iloc[
            field_row_index + 1:
        ].itertuples(
            index=False,
            name=None
        ):

            if len(row) < 2:
                continue

            field = clean_value(
                row[0]
            )

            value = clean_value(
                row[1]
            )

            if (
                field
                and field
                != "Value"
            ):
                master[field] = value

    # --------------------------------------------------------
    # WIDE FORMAT
    #
    # Field | Pathway_ID | Pathway_Name | ...
    #
    # Value | MP001 | Insulin ...
    # --------------------------------------------------------

    else:

        headers = [
            clean_value(x)
            for x in field_row
        ]

        value_row = None

        for index in range(
            field_row_index + 1,
            len(master_df)
        ):

            candidate = [
                clean_value(x)
                for x in master_df.iloc[
                    index
                ].tolist()
            ]

            if (
                candidate
                and candidate[0]
                == "Value"
            ):
                value_row = candidate
                break

        if value_row:

            for index, field in enumerate(
                headers
            ):

                if (
                    field is None
                    or field == "Field"
                ):
                    continue

                if index >= len(
                    value_row
                ):
                    continue

                value = value_row[
                    index
                ]

                if value is not None:
                    master[field] = value

    return master


# ============================================================
# COMPLETE SHEET DATA
# ============================================================

def extract_complete_sheet_data(
    df,
    sheet_name
):
    """
    Preserve every section from the
    Excel sheet in JSON.

    Nothing is discarded.
    """

    # Special layout
    if sheet_name == "Insulin Resistance":
        sections = (
            detect_insulin_sections(
                df
            )
        )

    else:
        sections = detect_sections(
            df
        )

    result = {}

    for section_name, rows in sections:

        result[
            section_name
        ] = rows_to_json(
            rows
        )

    return result


# ============================================================
# IMPORT ONE SHEET
# ============================================================

def import_sheet(
    db,
    sheet_name,
    sheet_index
):

    print(
        f"\nReading sheet: {sheet_name}"
    )

    df = pd.read_excel(
        FILE_PATH,
        sheet_name=sheet_name,
        header=None
    )

    print(
        f"Rows: {len(df)}"
    )

    # --------------------------------------------------------
    # Master information
    # --------------------------------------------------------

    master = extract_master_data(
        df,
        sheet_name
    )

    pathway_id = master.get(
        "Pathway_ID"
    )

    pathway_name = master.get(
        "Pathway_Name"
    )

    category = master.get(
        "Category"
    )

    super_category = master.get(
        "Super_Category"
    )

    disease = master.get(
        "Disease"
    )

    disease_stages = master.get(
        "Disease_Stages"
    )

    cellular_location = master.get(
        "Cellular Location"
    )

    primary_function = master.get(
        "Primary Function"
    )

    major_cell_types = master.get(
        "Major Cell Types"
    )

    clinical_importance = master.get(
        "Clinical Importance"
    )

    druggable = parse_boolean(
        master.get(
            "Druggable"
        )
    )

    pathway_status = master.get(
        "Pathway Status"
    )

    canonical_databases = master.get(
        "Canonical Databases"
    )

    # --------------------------------------------------------
    # Missing ID protection
    # --------------------------------------------------------

    if not pathway_id:
        pathway_id = make_fallback_pathway_id(
            sheet_name,
            sheet_index
        )

        print(
            f"⚠️ Missing Pathway_ID. "
            f"Generated: {pathway_id}"
        )

    # --------------------------------------------------------
    # Missing name protection
    # --------------------------------------------------------

    if not pathway_name:
        pathway_name = sheet_name

        print(
            f"⚠️ Missing Pathway_Name. "
            f"Using sheet name: {pathway_name}"
        )

    # --------------------------------------------------------
    # Complete raw section data
    # --------------------------------------------------------

    complete_data = (
        extract_complete_sheet_data(
            df,
            sheet_name
        )
    )

    # Add source information
    complete_data[
        "_metadata"
    ] = {
        "source_sheet": sheet_name,
        "source_file": os.path.basename(
            FILE_PATH
        ),
    }

    # --------------------------------------------------------
    # Create database record
    # --------------------------------------------------------

    pathway = Pathway(
        pathway_id=str(
            pathway_id
        ),

        pathway_name=str(
            pathway_name
        ),

        category=(
            str(category)
            if category
            else None
        ),

        super_category=(
            str(super_category)
            if super_category
            else None
        ),

        disease=(
            str(disease)
            if disease
            else None
        ),

        disease_stages=(
            str(disease_stages)
            if disease_stages
            else None
        ),

        cellular_location=(
            str(cellular_location)
            if cellular_location
            else None
        ),

        major_cell_types=(
            str(major_cell_types)
            if major_cell_types
            else None
        ),

        primary_function=(
            str(primary_function)
            if primary_function
            else None
        ),

        clinical_importance=(
            str(clinical_importance)
            if clinical_importance
            else None
        ),

        druggable=druggable,

        pathway_status=(
            str(pathway_status)
            if pathway_status
            else None
        ),

        canonical_databases=(
            str(canonical_databases)
            if canonical_databases
            else None
        ),

        source_sheet=sheet_name,

        pathway_data=complete_data
    )

    db.add(pathway)

    return pathway


# ============================================================
# MAIN IMPORT
# ============================================================

def main():

    print(
        "=========================================="
    )
    print(
        "        MASHome Pathways Import"
    )
    print(
        "=========================================="
    )

    print(
        f"\nReading file: {FILE_PATH}"
    )

    if not os.path.exists(
        FILE_PATH
    ):
        print(
            "❌ Pathways.xlsx not found!"
        )
        return

    # --------------------------------------------------------
    # Read workbook sheet names
    # --------------------------------------------------------

    excel_file = pd.ExcelFile(
        FILE_PATH
    )

    all_sheets = (
        excel_file.sheet_names
    )

    sheets_to_import = [
        sheet
        for sheet in all_sheets
        if sheet not in SKIP_SHEETS
    ]

    print(
        "\nSheets that will be imported:"
    )

    for sheet in sheets_to_import:
        print(
            f"- {sheet}"
        )

    print(
        f"\nTotal sheets to import: "
        f"{len(sheets_to_import)}"
    )

    # --------------------------------------------------------
    # Database
    # --------------------------------------------------------

    db = SessionLocal()

    try:

        print(
            "\nDeleting existing pathway records..."
        )

        db.query(
            Pathway
        ).delete()

        db.commit()

        print(
            "Old pathway records deleted successfully."
        )

        # ----------------------------------------------------
        # Import
        # ----------------------------------------------------

        successful = 0
        failed = 0

        for sheet_index, sheet_name in enumerate(
            sheets_to_import,
            start=1
        ):

            try:

                import_sheet(
                    db,
                    sheet_name,
                    sheet_index
                )

                successful += 1

                print(
                    f"✅ Imported: "
                    f"{sheet_name}"
                )

            except Exception as error:

                failed += 1

                print(
                    f"❌ Failed: "
                    f"{sheet_name}"
                )

                print(
                    f"   Error: {error}"
                )

        # ----------------------------------------------------
        # Commit everything
        # ----------------------------------------------------

        db.commit()

        print(
            "\n=========================================="
        )

        print(
            f"✅ Successfully imported "
            f"{successful} pathway sheets."
        )

        if failed:
            print(
                f"⚠️ Failed sheets: {failed}"
            )

        print(
            "=========================================="
        )

    except Exception as error:

        db.rollback()

        print(
            "\n❌ Import failed."
        )

        print(
            f"Error: {error}"
        )

    finally:

        db.close()


if __name__ == "__main__":
    main()