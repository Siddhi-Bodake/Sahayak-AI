from pydantic import BaseModel
from typing import Optional, Literal

CoachingCategory = Literal["saving", "investment", "budgeting", "debt", "planning"]
Priority = Literal["high", "medium", "low"]

class CoachingTip(BaseModel):
    id: Optional[str]
    title: str
    description: str
    category: CoachingCategory
    priority: Priority