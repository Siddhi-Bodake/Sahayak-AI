from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Scheme(BaseModel):
    id: Optional[str]
    title: str
    category: Optional[str]
    description: Optional[str]
    eligibility: Optional[str]
    benefits: Optional[str]
    application_process: Optional[str]
    source_url: Optional[str]
    is_new: bool = True
    created_at: datetime = datetime.utcnow()