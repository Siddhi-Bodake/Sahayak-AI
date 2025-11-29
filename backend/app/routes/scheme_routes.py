from fastapi import APIRouter, HTTPException
from app.models.scheme_model import Scheme
from app.core.database import schemes_collection
from app.services.exa_service import fetch_and_store_schemes
from bson import ObjectId

router = APIRouter()

@router.get("/schemes")
async def get_schemes():
    schemes = await schemes_collection.find().to_list(100)
    # Convert ObjectId to string for JSON serialization
    for scheme in schemes:
        scheme["id"] = str(scheme["_id"])
        del scheme["_id"]
    return schemes

@router.get("/schemes/{scheme_id}")
async def get_scheme(scheme_id: str):
    scheme = await schemes_collection.find_one({"_id": ObjectId(scheme_id)})
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    # Convert ObjectId to string for JSON serialization
    scheme["id"] = str(scheme["_id"])
    del scheme["_id"]
    return scheme

@router.post("/schemes/fetch")
async def fetch_schemes():
    """
    Trigger the scheme fetching workflow:
    1. Exa scrapes data once
    2. Groq processes it into structured JSON
    3. Data is stored in schemas collection
    4. Users are notified
    """
    result = await fetch_and_store_schemes()
    return {
        "message": "Schemes fetched and stored successfully",
        "details": result
    }