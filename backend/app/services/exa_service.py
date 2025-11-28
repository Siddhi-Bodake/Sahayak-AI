from exa_py import Exa
from app.core.config import settings
from app.core.database import schemes_collection, users_collection, notifications_collection
from app.services.whatsapp_service import send_whatsapp_notification
from datetime import datetime

async def fetch_and_store_schemes():
    exa = Exa(api_key=settings.exa_api_key)
    results = exa.search("government financial schemes India", num_results=10)

    new_schemes = []
    for item in results.results:
        existing = await schemes_collection.find_one({"title": item.title})
        if not existing:
            scheme = {
                "title": item.title,
                "description": item.description,
                "source_url": item.url,
                "is_new": True,
                "created_at": datetime.utcnow()
            }
            result = await schemes_collection.insert_one(scheme)
            new_schemes.append(str(result.inserted_id))

    if new_schemes:
        # Get all users
        users = await users_collection.find().to_list(100)
        for user in users:
            await notifications_collection.insert_one({
                "user_id": str(user["_id"]),
                "message": f"New schemes available: {len(new_schemes)}",
                "type": "scheme_update",
                "created_at": datetime.utcnow(),
                "is_read": False
            })
            # Send WhatsApp
            await send_whatsapp_notification(user["mobileno"], f"New schemes available: {len(new_schemes)}")