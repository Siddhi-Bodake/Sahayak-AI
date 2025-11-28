import httpx
from app.core.config import settings

async def get_scheme_explanation(scheme):
    url = "https://api.groq.com/openai/v1/chat/completions"  # Assuming Groq API endpoint
    headers = {
        "Authorization": f"Bearer {settings.groq_api_key}",
        "Content-Type": "application/json"
    }
    prompt = f"Explain this government financial scheme in simple Hindi: {scheme['title']} - {scheme.get('description', '')}"
    data = {
        "model": "llama3-8b-8192",
        "messages": [{"role": "user", "content": prompt}]
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=data)
        result = response.json()
    
    return result["choices"][0]["message"]["content"]