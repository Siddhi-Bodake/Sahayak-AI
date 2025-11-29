from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from app.models.user_model import User, Language, Role
from app.core.database import users_collection
from app.core.security import get_password_hash, verify_password, create_access_token, verify_token
from pydantic import BaseModel
from datetime import timedelta
from bson import ObjectId

router = APIRouter()

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    mobileno: str
    role: Role = "other"
    language: Language = "en"

class UserLogin(BaseModel):
    email: str
    password: str

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/register")
async def register(user: UserCreate):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password
    result = await users_collection.insert_one(user_dict)
    return {"message": "User registered successfully"}

@router.post("/login")
async def login(user: UserLogin):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": str(db_user["_id"])}, expires_delta=timedelta(hours=1))
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    # Remove password from response
    user_info = {k: v for k, v in current_user.items() if k != "password"}
    user_info["id"] = str(user_info["_id"])
    del user_info["_id"]
    return user_info