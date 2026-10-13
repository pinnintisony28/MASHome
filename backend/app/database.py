from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = (
    f"mysql+pymysql://{os.getenv('DB_USER')}:"
    f"{os.getenv('DB_PASSWORD')}@"
    f"{os.getenv('DB_HOST')}:"
    f"{os.getenv('DB_PORT')}/"
    f"{os.getenv('DB_NAME')}"
)

engine = create_engine(DATABASE_URL)
from sqlalchemy import text

try:
    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT DATABASE(), COUNT(*) FROM clinical_trials")
        )
        print("DATABASE CHECK:", result.fetchone())
except Exception as error:
    print("DATABASE CHECK FAILED:", error)

Base = declarative_base()

print("✅ Database Connected Successfully!")

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# FastAPI Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()