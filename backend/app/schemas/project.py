from pydantic import BaseModel

class ProjectCreate(BaseModel):
    title: str
    description: str
    image_url: str
    github_url: str
    live_url: str
    tech_stack: str

class ProjectResponse(ProjectCreate):
    id: int

    class Config:
        from_attributes = True