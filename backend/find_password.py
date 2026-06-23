import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

passwords = ["password", "postgres", "admin", "root", "", "1234", "123456"]

for pw in passwords:
    try:
        conn = psycopg2.connect(
            dbname='postgres', 
            user='postgres', 
            password=pw, 
            host='localhost'
        )
        print(f"SUCCESS: Connected with password '{pw}'")
        conn.close()
        break
    except Exception as e:
        print(f"FAILED: Password '{pw}' failed: {e}")
