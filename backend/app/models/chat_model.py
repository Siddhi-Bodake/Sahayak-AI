from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Literal

Sender = Literal["user", "ai"]

class ChatMessage(BaseModel):
    id: Optional[str]
    sender: Sender
    text: str
    timestamp: datetime = datetime.utcnow()