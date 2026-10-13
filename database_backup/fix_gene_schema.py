import getpass
import pymysql

HOST = "hayabusa.proxy.rlwy.net"
PORT = 36545
USER = "root"
DATABASE = "railway"

def main():
    password = getpass.getpass("Enter Railway MySQL password: ")

    connection = pymysql.connect(
        host=HOST,
        port=PORT,
        user=USER,
        password=password,
        database=DATABASE,
        connect_timeout=15,
        autocommit=True,
    )

    try:
        columns_to_add = {
            "mane_select": "TEXT NULL",
            "canonical_transcript": "VARCHAR(100) NULL",
            "status": "VARCHAR(100) NULL",
        }

        with connection.cursor() as cursor:
            cursor.execute("SHOW COLUMNS FROM genes")
            existing_columns = {
                row[0] for row in cursor.fetchall()
            }

            print("Existing columns:", len(existing_columns))

            for column, definition in columns_to_add.items():
                if column in existing_columns:
                    print(f"Already exists: {column}")
                    continue

                sql = (
                    f"ALTER TABLE genes "
                    f"ADD COLUMN `{column}` {definition}"
                )
                cursor.execute(sql)
                print(f"Added successfully: {column}")

            cursor.execute("SHOW COLUMNS FROM genes")
            final_columns = [row[0] for row in cursor.fetchall()]
            print("\nFinal column count:", len(final_columns))
            print("Columns:", ", ".join(final_columns))

            cursor.execute("SELECT COUNT(*) FROM genes")
            print("Gene records:", cursor.fetchone()[0])

    finally:
        connection.close()

if __name__ == "__main__":
    main()