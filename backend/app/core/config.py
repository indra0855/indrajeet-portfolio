from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL", "indrajeetkumbhar23121@gmail.com")