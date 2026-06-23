from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.routers import projects, contacts
from app.core.database import Base, engine, SessionLocal
from app.routers.projects import seed_projects

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create database tables if they do not exist
    Base.metadata.create_all(bind=engine)
    
    # Seed initial projects
    db = SessionLocal()
    try:
        seed_projects(db)
    finally:
        db.close()
        
    yield

app = FastAPI(
    title="Portfolio API",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(contacts.router)

@app.get("/")
def root():
    return {
        "message": "Portfolio API Running"
    }