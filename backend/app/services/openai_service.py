import httpx
import json
from app.core.config import settings

async def process_scheme_data(raw_data):
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {settings.openai_api_key}",
        "Content-Type": "application/json"
    }
    prompt = f"""Extract and structure the following government financial scheme information into JSON format with these exact fields:
- name: The scheme name
- category: One of: "agriculture", "business", "pension", "education", "housing", "general"
- shortDescription: Brief 1-2 sentence description
- eligibility: Array of eligibility criteria strings
- benefits: Array of benefit strings
- requiredDocuments: Array of required document names
- eligibleRoles: Array of roles from: "farmer", "student", "self_employed", "salaried", "unemployed", "other"
- tags: Array of relevant tags
- ageRange: Age range if specified (optional)
- incomeLimit: Income limit if specified (optional)

Raw data: {raw_data}

Return only valid JSON, no additional text."""

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.3
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=data)
        result = response.json()

    if "choices" in result and result["choices"]:
        content = result["choices"][0]["message"]["content"]
    else:
        content = result.get("content", result.get("response", ""))

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        # Fallback to basic structure
        return {
            "name": raw_data.get("title", ""),
            "category": "general",
            "shortDescription": raw_data.get("description", ""),
            "eligibility": [],
            "benefits": [],
            "requiredDocuments": [],
            "eligibleRoles": [],
            "tags": []
        }

async def get_scheme_explanation(scheme):
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {settings.openai_api_key}",
        "Content-Type": "application/json"
    }
    prompt = f"Explain this government financial scheme in simple Hindi: {scheme['name']} - {scheme.get('shortDescription', '')}"
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=data)
        result = response.json()

    if "choices" in result and result["choices"]:
        content = result["choices"][0]["message"]["content"]
    else:
        content = result.get("content", result.get("response", "Sorry, I couldn't process your request."))

    return content