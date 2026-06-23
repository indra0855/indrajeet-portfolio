from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from app.core.database import Base

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True)

    name = Column(String(100))
    email = Column(String(100))
    subject = Column(String(255))
    message = Column(Text)