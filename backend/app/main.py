from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth_routes, scheme_routes, ai_routes, notification_routes
from app.utils.scheduler import start_scheduler
from app.core.database import client

app = FastAPI(title="Sahayak AI Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router, prefix="/auth", tags=["auth"])
app.include_router(scheme_routes.router, prefix="", tags=["schemes"])
app.include_router(ai_routes.router, prefix="/ai", tags=["ai"])
app.include_router(notification_routes.router, prefix="", tags=["notifications"])

@app.on_event("startup")
async def startup_event():
    start_scheduler()

@app.on_event("shutdown")
async def shutdown_event():
    client.close()

@app.get("/")
async def root():
    return {"message": "Sahayak AI Backend"}