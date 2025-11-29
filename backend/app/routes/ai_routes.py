from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.services.gemini_service import get_scheme_explanation_gemini as get_scheme_explanation, answer_user_query_gemini as answer_user_query
from app.core.database import schemes_collection, chat_history_collection
from app.routes.auth_routes import get_current_user
from app.services.cache_service import scheme_cache
from bson import ObjectId
from datetime import datetime
from typing import Optional
import asyncio

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

async def get_schemes_from_cache():
    """
    Get schemes from cache or database.
    Uses in-memory cache to avoid repeated DB queries.
    Cache expires after 30 minutes.
    """
    # Try to get from cache first
    cached_schemes = await scheme_cache.get()

    if cached_schemes is not None:
        return cached_schemes

    # Cache miss or expired - fetch from database
    schemes = await schemes_collection.find().to_list(1000)
    print(schemes)
    
    # Convert ObjectId to string for processing
    for scheme in schemes:
        scheme["id"] = str(scheme["_id"])
        if "_id" in scheme:
            del scheme["_id"]
    
    # Update cache
    await scheme_cache.set(schemes)
    
    return schemes

@router.post("/scheme-info/{scheme_id}")
async def scheme_info(scheme_id: str):
    """Get detailed explanation of a specific scheme"""
    scheme = await schemes_collection.find_one({"_id": ObjectId(scheme_id)})
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    explanation = await get_scheme_explanation(scheme)
    return {"explanation": explanation}

@router.post("/chat")
async def chat_with_ai(
    request: ChatRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Protected chat endpoint with authentication.
    Uses cached scheme data for faster responses.
    
    Workflow:
    1. Authenticate user via JWT token
    2. Get schemes from cache (or DB if cache expired)
    3. Send schemes data + user query to Groq
    4. Save chat history for the authenticated user
    5. Return AI response
    """
    user_id = str(current_user["_id"])
    
    # Get schemes from cache (much faster!)
    schemes = await get_schemes_from_cache()
    
    if not schemes:
        return {
            "response": "I apologize, but no schemes are currently available. Please try again later.",
            "schemes_count": 0
        }
    
    # Use the dedicated answer_user_query function from groq_service
    # This function uses the processed scheme data to provide accurate answers
    response = await answer_user_query(request.message, schemes)
    
    # Save chat history for authenticated user (async, don't wait)
    async def save_chat_history():
        try:
            await chat_history_collection.insert_one({
                "user_id": user_id,
                "message": request.message,
                "response": response,
                "timestamp": datetime.utcnow()
            })
        except Exception as e:
            print(f"Error saving chat history: {str(e)}")

    asyncio.create_task(save_chat_history())
    
    return {
        "response": response,
        "schemes_count": len(schemes),
        "data_source": "processed_schemes_database",
        "cached": await scheme_cache.get() is not None,
        "user": {
            "name": current_user.get("name"),
            "role": current_user.get("role")
        }
    }

@router.post("/chat/public")
async def chat_public(request: ChatRequest):
    """
    Public chat endpoint (no authentication required).
    Uses cached scheme data for faster responses.
    Use this for testing or public-facing chatbot.
    """
    # Get schemes from cache (much faster!)
    schemes = await get_schemes_from_cache()
    
    if not schemes:
        return {
            "response": "I apologize, but no schemes are currently available. Please try again later.",
            "schemes_count": 0
        }
    
    # Get AI response
    response = await answer_user_query(request.message, schemes)
    
    return {
        "response": response,
        "schemes_count": len(schemes),
        "data_source": "processed_schemes_database",
        "cached": await scheme_cache.get() is not None
    }

@router.get("/cache/stats")
async def get_cache_stats():
    """Get cache statistics"""
    return scheme_cache.get_stats()

@router.post("/cache/clear")
async def clear_cache():
    """Clear the scheme cache (requires new fetch from DB)"""
    await scheme_cache.clear()
    return {"message": "Cache cleared successfully"}
