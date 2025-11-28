from fastapi import APIRouter
from app.core.database import notifications_collection

router = APIRouter()

@router.get("/notifications/{user_id}")
async def get_notifications(user_id: str):
    notifications = await notifications_collection.find({"user_id": user_id}).to_list(100)
    return notifications