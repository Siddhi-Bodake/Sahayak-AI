from fastapi import APIRouter, HTTPException
from app.models.scheme_model import Scheme
from app.core.database import schemes_collection
from app.services.exa_service import fetch_and_store_schemes
from bson import ObjectId

router = APIRouter()

@router.get("/schemes")
async def get_schemes():
    schemes = await schemes_collection.find().to_list(100)
    return schemes

@router.get("/schemes/{scheme_id}")
async def get_scheme(scheme_id: str):
    scheme = await schemes_collection.find_one({"_id": ObjectId(scheme_id)})
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return scheme

@router.post("/schemes/fetch")
async def fetch_schemes():
    await fetch_and_store_schemes()
    return {"message": "Schemes fetched and stored"}