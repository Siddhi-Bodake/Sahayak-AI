from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Literal, Dict, Any

SchemeCategory = Literal["agriculture", "business", "pension", "education", "housing", "general"]
Role = Literal["farmer", "student", "self_employed", "salaried", "unemployed", "other"]

class Scheme(BaseModel):
    id: Optional[str] = None
    name: str
    category: SchemeCategory = "general"
    shortDescription: str
    eligibility: List[str] = []
    benefits: List[str] = []
    requiredDocuments: List[str] = []
    eligibleRoles: List[Role] = []
    tags: List[str] = []
    ageRange: Optional[str] = None
    incomeLimit: Optional[str] = None
    applicationProcess: Optional[str] = None
    officialWebsite: Optional[str] = None
    source_url: Optional[str] = None
    # Store raw scraped data for reference
    raw_data: Optional[Dict[str, Any]] = None
    # Store the processed JSON from Groq
    processed_data: Optional[Dict[str, Any]] = None
    is_new: bool = True
    created_at: datetime = datetime.utcnow()
    processed_at: Optional[datetime] = None