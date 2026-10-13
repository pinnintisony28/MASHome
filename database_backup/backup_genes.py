
import csv
import getpass
import pymysql

HOST = "hayabusa.proxy.rlwy.net"
PORT = 36545
USER = "root"
DATABASE = "railway"

password = getpass.getpass("Enter Railway MySQL password: ").strip()

if not password:
    raise SystemExit("No password entered. Please run the script again.")

print("Password received. Connecting to Railway...")

connection = pymysql.connect(
    host=HOST,
    port=PORT,
    user=USER,
    password=password,
    database=DATABASE,
    connect_timeout=20,
    cursorclass=pymysql.cursors.DictCursor,
)

try:
    with connection.cursor() as cursor:
        cursor.execute("SELECT COUNT(*) AS total FROM genes")
        total = cursor.fetchone()["total"]
        print(f"Railway genes count: {total}")

        cursor.execute("SELECT * FROM genes ORDER BY id")
        columns = [column[0] for column in cursor.description]

        with open("genes_backup.csv", "w", newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerow(columns)

            while True:
                rows = cursor.fetchmany(500)
                if not rows:
                    break
                writer.writerows([row.values() for row in rows])

    print(f"Backup completed. Expected rows: {total}")
    print("Saved to genes_backup.csv")

finally:
    connection.close()
