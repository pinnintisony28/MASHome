
import httpx
from datetime import date

EUROPE_PMC_URL = "https://www.ebi.ac.uk/europepmc/webservices/rest/search"


async def search_publications(
    query: str = "MASLD",
    page: int = 1,
    page_size: int = 10,
):
    query = query.strip()

    if not query:
        raise ValueError("Search query cannot be empty.")

    if page < 1:
        raise ValueError("Page must be at least 1.")

    if not 1 <= page_size <= 25:
        raise ValueError("Page size must be between 1 and 25.")

    params = {
    "query": f"({query}) AND FIRST_PDATE:[* TO {date.today().isoformat()}]",
    "format": "json",
    "sort": "FIRST_PDATE_D desc",
    "page": page,
    "pageSize": page_size,
    "resultType": "core",
}

    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.get(EUROPE_PMC_URL, params=params)
        response.raise_for_status()
        data = response.json()

    results = []

    for item in data.get("resultList", {}).get("result", []):
        results.append({
            "id": item.get("id"),
            "source": item.get("source"),
            "title": item.get("title"),
            "author_string": item.get("authorString"),
            "journal": item.get("journalTitle"),
            "publication_date": item.get("firstPublicationDate"),
            "doi": item.get("doi"),
            "pmid": item.get("pmid"),
            "abstract": item.get("abstractText"),
            "is_open_access": item.get("isOpenAccess") == "Y",
            "article_url": (
                f"https://europepmc.org/article/{item['source']}/{item['id']}"
                if item.get("source") and item.get("id")
                else None
            ),
        })

    return {
        "query": query,
        "page": page,
        "page_size": page_size,
        "total_results": data.get("hitCount", 0),
        "results": results,
    }
