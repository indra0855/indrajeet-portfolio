from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.contact import Contact
from app.schemas.contact import ContactCreate
from app.services.email_service import send_contact_email

router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)

@router.post("/")
def create_contact(
    contact: ContactCreate, 
    background_tasks: BackgroundTasks, 
    db: Session = Depends(get_db)
):
    try:
        # Save submission to database
        db_contact = Contact(
            name=contact.name,
            email=contact.email,
            subject=contact.subject,
            message=contact.message
        )
        db.add(db_contact)
        db.commit()
        db.refresh(db_contact)
        
        # Dispatch notification email in background
        background_tasks.add_task(
            send_contact_email,
            contact.name,
            contact.email,
            contact.subject,
            contact.message
        )
        
        return {
            "status": "success",
            "message": "Contact submitted successfully",
            "id": db_contact.id
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to process contact submission: {str(e)}")