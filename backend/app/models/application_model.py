from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Literal

Role = Literal["farmer", "student", "self_employed", "salaried", "unemployed", "other"]
ApplicationStatus = Literal["draft", "submitted", "approved", "rejected"]

class ApplicationDraft(BaseModel):
    id: Optional[str]
    schemeId: str
    schemeName: str
    applicantName: str
    applicantRole: Role
    income: str
    address: str
    aadharNumber: str
    phoneNumber: str
    bankAccountNumber: str
    ifscCode: str
    createdAt: datetime = datetime.utcnow()
    status: ApplicationStatus = "draft"