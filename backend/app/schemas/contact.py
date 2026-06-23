from pydantic import BaseModel
from pydantic import EmailStr

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str