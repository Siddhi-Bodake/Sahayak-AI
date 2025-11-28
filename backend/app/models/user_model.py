from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class User(BaseModel):
    id: Optional[str]
    name: str
    email: EmailStr
    password: str
    mobileno: str
    role: Optional[str] = "user"
    language: Optional[str] = "en"
    created_at: datetime = datetime.utcnow()