import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os
from dotenv import load_dotenv

# Load env variables from backend/.env
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(env_path)

db_url = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost/portfolio")

try:
    # Connect to the default 'postgres' database to check if 'portfolio' exists
    # Extract host, user, password from DATABASE_URL
    # We parse the standard postgresql://user:password@host/dbname url
    url_parts = db_url.replace("postgresql://", "").split("@")
    credentials = url_parts[0].split(":")
    host_db = url_parts[1].split("/")
    
    user = credentials[0]
    password = credentials[1]
    host = host_db[0]
    
    conn = psycopg2.connect(
        dbname='postgres', 
        user=user, 
        password=password, 
        host=host
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    
    cursor.execute("SELECT 1 FROM pg_database WHERE datname='portfolio'")
    exists = cursor.fetchone()
    
    if not exists:
        cursor.execute("CREATE DATABASE portfolio")
        print("Database 'portfolio' created successfully.")
    else:
        print("Database 'portfolio' already exists.")
        
    cursor.close()
    conn.close()
except Exception as e:
    print(f"Error checking/creating database: {e}")
