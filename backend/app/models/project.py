from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from app.core.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255))
    description = Column(Text)

    image_url = Column(String(500))
    github_url = Column(String(500))
    live_url = Column(String(500))

    tech_stack = Column(Text)