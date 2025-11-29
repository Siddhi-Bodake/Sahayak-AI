from exa_py import Exa
from app.core.config import settings
from app.core.database import schemes_collection, users_collection, notifications_collection
from app.services.whatsapp_service import send_whatsapp_notification
from app.services.gemini_service import process_scheme_data_gemini as process_scheme_data
from datetime import datetime

async def fetch_and_store_schemes():
    """
    Workflow:
    1. Exa scrapes data once
    2. Raw data is sent to Groq for processing
    3. Groq returns structured JSON
    4. Both raw and processed data are stored in schemas collection
    5. Users are notified about new schemes
    """
    exa = Exa(api_key=settings.exa_api_key)
    
    # Step 1: Exa scrapes government scheme data
    print("Step 1: Scraping data with Exa...")
    results = exa.search_and_contents(
        "government financial schemes India eligibility benefits application",
        num_results=10,
        text=True  # Get full text content
    )

    new_schemes = []
    for item in results.results:
        # Check if scheme already exists
        existing = await schemes_collection.find_one({"source_url": item.url})
        if existing:
            print(f"Scheme already exists: {item.title}")
            continue

        # Step 2: Prepare raw scraped data
        raw_data = {
            "title": item.title,
            "description": getattr(item, 'text', getattr(item, 'summary', '')),
            "url": item.url,
            "scraped_at": datetime.utcnow().isoformat()
        }
        
        print(f"Step 2: Processing scheme with Groq: {item.title}")
        # Step 3: Send to Groq for structured processing
        structured_data = await process_scheme_data(raw_data)
        
        # Step 4: Store both raw and processed data in schema
        scheme = {
            "name": structured_data.get("name", item.title),
            "category": structured_data.get("category", "general"),
            "shortDescription": structured_data.get("shortDescription", ""),
            "eligibility": structured_data.get("eligibility", []),
            "benefits": structured_data.get("benefits", []),
            "requiredDocuments": structured_data.get("requiredDocuments", []),
            "eligibleRoles": structured_data.get("eligibleRoles", ["other"]),
            "tags": structured_data.get("tags", []),
            "ageRange": structured_data.get("ageRange"),
            "incomeLimit": structured_data.get("incomeLimit"),
            "applicationProcess": structured_data.get("applicationProcess", ""),
            "officialWebsite": structured_data.get("officialWebsite", item.url),
            "source_url": item.url,
            # Store raw scraped data for reference
            "raw_data": raw_data,
            # Store the processed JSON from Groq
            "processed_data": structured_data,
            "is_new": True,
            "created_at": datetime.utcnow(),
            "processed_at": datetime.utcnow()
        }
        
        print(f"Step 3: Storing scheme in database: {scheme['name']}")
        result = await schemes_collection.insert_one(scheme)
        new_schemes.append({
            "id": str(result.inserted_id),
            "title": scheme["name"],
            "url": scheme["source_url"],
            "category": scheme["category"]
        })
        
        print(f"✓ Successfully processed and stored: {scheme['name']}")

    # Step 5: Notify users about new schemes
    if new_schemes:
        print(f"\nStep 4: Notifying users about {len(new_schemes)} new schemes...")
        users = await users_collection.find().to_list(100)
        for user in users:
            for scheme in new_schemes:
                await notifications_collection.insert_one({
                    "user_id": str(user["_id"]),
                    "message": f"New {scheme['category']} scheme: {scheme['title']} - Learn more: {scheme['url']}",
                    "type": "scheme_update",
                    "scheme_id": scheme["id"],
                    "created_at": datetime.utcnow(),
                    "is_read": False
                })
                # Send WhatsApp notification
                await send_whatsapp_notification(
                    user["mobileno"],
                    f"🎯 नई योजना: {scheme['title']}\nश्रेणी: {scheme['category']}\nविवरण देखें: {scheme['url']}"
                )
        print(f"✓ Notifications sent to {len(users)} users")
    
    return {
        "total_scraped": len(results.results),
        "new_schemes_added": len(new_schemes),
        "schemes": new_schemes
    }