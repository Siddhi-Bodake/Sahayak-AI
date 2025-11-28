from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from app.services.exa_service import fetch_and_store_schemes

scheduler = AsyncIOScheduler()

def start_scheduler():
    scheduler.add_job(fetch_and_store_schemes, IntervalTrigger(hours=6))
    scheduler.start()