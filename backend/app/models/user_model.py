from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Literal

Language = Literal["en", "hi", "mr"]
Role = Literal["farmer", "student", "self_employed", "salaried", "unemployed", "other"]

class User(BaseModel):
    id: Optional[str]
    name: str
    email: EmailStr
    password: str
    mobileno: str
    role: Role = "other"
    language: Language = "en"
    created_at: datetime = datetime.utcnow()