from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectResponse

router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"]
)

@router.get("/", response_model=List[ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    try:
        return db.query(Project).order_by(Project.id).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch projects: {str(e)}")

@router.get("", response_model=List[ProjectResponse])
def get_projects_root(db: Session = Depends(get_db)):
    """Alias for get_projects to handle requests without trailing slash."""
    return get_projects(db)

@router.post("/", response_model=ProjectResponse)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    try:
        db_project = Project(
            title=project.title,
            description=project.description,
            image_url=project.image_url,
            github_url=project.github_url,
            live_url=project.live_url,
            tech_stack=project.tech_stack
        )
        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        return db_project
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create project: {str(e)}")

def seed_projects(db: Session):
    """
    Seeds initial project data, syncing database records with code settings.
    """
    try:
        # Delete existing projects to update to the new subset
        db.query(Project).delete()
        db.commit()
            
        initial_projects = [
            Project(
                title="Enterprise Document Intelligence System",
                description="An enterprise-grade AI system capable of processing invoices, resumes, contracts, and reports using OCR and Multi-Agent AI workflows. Solved automated manual document processing, reduced information extraction times, and improved overall document understanding.",
                image_url="/images/document_intelligence.png",
                github_url="https://github.com/indra0855/indrajeet-portfolio",
                live_url="#demo-document-intelligence",
                tech_stack="Python,FastAPI,LangGraph,LangChain,OCR,PostgreSQL,Ollama,RAG,Docker"
            ),
            Project(
                title="AI-Powered Skin Cancer Detection",
                description="A deep learning computer vision application that identifies skin cancer lesions and classifies their types (e.g. Melanoma, Basal Cell Carcinoma) with high accuracy using MobileNetV2. Includes preventive recommendations.",
                image_url="/images/skin_cancer.png",
                github_url="https://github.com/indra0855/indrajeet-portfolio",
                live_url="#demo-skin-cancer",
                tech_stack="Python,TensorFlow,OpenCV,Flask,Deep Learning"
            ),
            Project(
                title="Smart Garbage Detection System",
                description="An AI-based waste management solution that uses Python, OpenCV, TensorFlow/PyTorch, CNN/YOLO, and Flask/FastAPI to automatically detect and classify different types of garbage from images or live video feeds. The system improves waste segregation, enhances recycling efficiency, and promotes cleaner environments through intelligent and automated waste monitoring.",
                image_url="/images/garbage_detection.png",
                github_url="https://github.com/indra0855/indrajeet-portfolio",
                live_url="#demo-garbage-detection",
                tech_stack="Python,OpenCV,TensorFlow,PyTorch,CNN,YOLO,Flask,FastAPI"
            )
        ]
        
        db.add_all(initial_projects)
        db.commit()
        print("Successfully seeded initial project data.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding project data: {str(e)}")
