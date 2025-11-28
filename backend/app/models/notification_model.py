from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Notification(BaseModel):
    id: Optional[str]
    user_id: str
    message: str
    type: Optional[str] = "scheme_update"
    created_at: datetime = datetime.utcnow()
    is_read: bool = False