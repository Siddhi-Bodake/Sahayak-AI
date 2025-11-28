import httpx
from app.core.config import settings

async def send_whatsapp_notification(phone_number: str, message: str):
    url = "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages"  # Replace with actual
    headers = {
        "Authorization": f"Bearer {settings.whatsapp_token}",
        "Content-Type": "application/json"
    }
    data = {
        "messaging_product": "whatsapp",
        "to": phone_number,
        "type": "text",
        "text": {"body": message}
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=data)
        return response.json()