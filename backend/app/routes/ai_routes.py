from fastapi import APIRouter, HTTPException
from app.services.groq_service import get_scheme_explanation
from app.core.database import schemes_collection
from bson import ObjectId

router = APIRouter()

@router.post("/ai/scheme-info/{scheme_id}")
async def scheme_info(scheme_id: str):
    scheme = await schemes_collection.find_one({"_id": ObjectId(scheme_id)})
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    
    explanation = await get_scheme_explanation(scheme)
    return {"explanation": explanation}