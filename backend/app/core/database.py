from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client = AsyncIOMotorClient(settings.mongo_uri)
database = client.sahayak_ai

# Collections
users_collection = database.users
schemes_collection = database.schemes
notifications_collection = database.notifications