from math import ceil

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.pathway import Pathway


class PathwayService:

    @staticmethod
    def get_all(
        db: Session,
        page: int = 1,
        limit: int = 25
    ):
        if page < 1:
            page = 1

        if limit < 1:
            limit = 25

        if limit > 100:
            limit = 100

        query = db.query(Pathway)

        total = query.count()

        total_pages = (
            ceil(total / limit)
            if total > 0
            else 0
        )

        offset = (page - 1) * limit

        items = (
            query
            .order_by(Pathway.id)
            .offset(offset)
            .limit(limit)
            .all()
        )

        return {
            "items": items,
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": total_pages
        }

    @staticmethod
    def get_by_id(
        db: Session,
        pathway_id: int
    ):
        return (
            db.query(Pathway)
            .filter(
                Pathway.id == pathway_id
            )
            .first()
        )

    @staticmethod
    def get_by_pathway_id(
        db: Session,
        pathway_id: str
    ):
        return (
            db.query(Pathway)
            .filter(
                Pathway.pathway_id == pathway_id
            )
            .first()
        )

    @staticmethod
    def get_by_name(
        db: Session,
        pathway_name: str
    ):
        return (
            db.query(Pathway)
            .filter(
                Pathway.pathway_name == pathway_name
            )
            .first()
        )

    @staticmethod
    def search(
        db: Session,
        keyword: str
    ):
        keyword = keyword.strip()

        if not keyword:
            return []

        search_pattern = f"%{keyword}%"

        return (
            db.query(Pathway)
            .filter(
                or_(
                    Pathway.pathway_id.ilike(
                        search_pattern
                    ),
                    Pathway.pathway_name.ilike(
                        search_pattern
                    ),
                    Pathway.category.ilike(
                        search_pattern
                    ),
                    Pathway.super_category.ilike(
                        search_pattern
                    ),
                    Pathway.disease.ilike(
                        search_pattern
                    ),
                    Pathway.primary_function.ilike(
                        search_pattern
                    ),
                    Pathway.major_cell_types.ilike(
                        search_pattern
                    )
                )
            )
            .order_by(
                Pathway.pathway_name
            )
            .all()
        )

    @staticmethod
    def get_categories(
        db: Session
    ):
        results = (
            db.query(
                Pathway.category
            )
            .filter(
                Pathway.category.isnot(None)
            )
            .distinct()
            .order_by(
                Pathway.category
            )
            .all()
        )

        return [
            row[0]
            for row in results
            if row[0]
        ]

    @staticmethod
    def get_super_categories(
        db: Session
    ):
        results = (
            db.query(
                Pathway.super_category
            )
            .filter(
                Pathway.super_category.isnot(None)
            )
            .distinct()
            .order_by(
                Pathway.super_category
            )
            .all()
        )

        return [
            row[0]
            for row in results
            if row[0]
        ]

    @staticmethod
    def get_by_category(
        db: Session,
        category: str
    ):
        return (
            db.query(Pathway)
            .filter(
                Pathway.category == category
            )
            .order_by(
                Pathway.pathway_name
            )
            .all()
        )