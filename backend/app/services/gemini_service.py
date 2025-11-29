import google.generativeai as genai
from app.core.config import settings

# Configure Gemini API
genai.configure(api_key=settings.gemini_api_key)

async def get_scheme_explanation_gemini(scheme):
    """
    Generate a detailed explanation of a government scheme using its name and short description.
    Uses Google Gemini AI instead of Groq.
    """
    # Clean the scheme data (remove MongoDB _id if present)
    if "_id" in scheme:
        del scheme["_id"]

    scheme_name = scheme.get('name', 'Unknown Scheme')
    short_desc = scheme.get('shortDescription', '')

    # If no short description, use the processed_data
    if not short_desc and 'processed_data' in scheme:
        short_desc = scheme['processed_data'].get('shortDescription', '')

    # If still no description, use raw_data
    if not short_desc and 'raw_data' in scheme:
        short_desc = scheme['raw_data'].get('description', '')

    prompt = f"""You are Sahayak AI, an expert on Indian government schemes.

Based on this scheme information, provide a clear and detailed explanation in English:

Scheme Name: {scheme_name}
Description: {short_desc}

Please explain:
1. What this scheme is about
2. Who can benefit from it
3. How it helps people
4. Any important details from the description

Keep the explanation helpful, accurate, and easy to understand."""

    try:
        model = genai.GenerativeModel(settings.gemini_chat_model)
        response = model.generate_content(prompt)

        if response and response.text:
            return response.text.strip()
        else:
            return f"I apologize, but I'm unable to generate an explanation for the {scheme_name} scheme at the moment. Please try again later."
    except Exception as e:
        print(f"Error in get_scheme_explanation_gemini: {str(e)}")
        return f"I apologize, but I'm unable to generate an explanation for the {scheme_name} scheme at the moment. Please try again later."

async def process_scheme_data_gemini(raw_data):
    """
    Process raw scraped data through Gemini to extract structured scheme information.
    This function analyzes the content and creates a proper JSON schema.
    Uses Google Gemini AI instead of Groq.
    """
    prompt = f"""You are an AI assistant that extracts government financial scheme information from web content.

Analyze the following content and extract structured information about the government scheme.

Title: {raw_data.get('title', '')}
Content: {raw_data.get('description', '')}
URL: {raw_data.get('url', '')}

Extract and return ONLY a valid JSON object with these exact fields:
{{
  "name": "Full scheme name",
  "category": "one of: agriculture, business, pension, education, housing, general",
  "shortDescription": "Clear 2-3 sentence description in English",
  "eligibility": ["list of eligibility criteria as separate items"],
  "benefits": ["list of benefits as separate items"],
  "requiredDocuments": ["list of required documents"],
  "eligibleRoles": ["applicable roles from: farmer, student, self_employed, salaried, unemployed, other"],
  "tags": ["relevant tags for searching"],
  "ageRange": "age criteria if mentioned, else null",
  "incomeLimit": "income limit if mentioned, else null",
  "applicationProcess": "Brief description of how to apply",
  "officialWebsite": "Official website URL if available"
}}

IMPORTANT: Return ONLY the JSON object, no markdown code blocks, no additional text."""

    try:
        model = genai.GenerativeModel(settings.gemini_chat_model)
        response = model.generate_content(prompt)

        if response and response.text:
            content = response.text.strip()

            # Remove markdown code blocks if present
            import re
            content = re.sub(r'^```json\s*', '', content)
            content = re.sub(r'^```\s*', '', content)
            content = re.sub(r'\s*```$', '', content)
            content = content.strip()

            try:
                structured_data = json.loads(content)
                # Validate and set defaults
                return {
                    "name": structured_data.get("name", raw_data.get("title", "Unknown Scheme")),
                    "category": structured_data.get("category", "general"),
                    "shortDescription": structured_data.get("shortDescription", raw_data.get("description", "")[:200]),
                    "eligibility": structured_data.get("eligibility", []),
                    "benefits": structured_data.get("benefits", []),
                    "requiredDocuments": structured_data.get("requiredDocuments", []),
                    "eligibleRoles": structured_data.get("eligibleRoles", ["other"]),
                    "tags": structured_data.get("tags", []),
                    "ageRange": structured_data.get("ageRange"),
                    "incomeLimit": structured_data.get("incomeLimit"),
                    "applicationProcess": structured_data.get("applicationProcess", ""),
                    "officialWebsite": structured_data.get("officialWebsite", raw_data.get("url", ""))
                }
            except json.JSONDecodeError as e:
                print(f"JSON decode error: {e}")
                print(f"Content received: {content}")
                # Fallback to basic structure
                return {
                    "name": raw_data.get("title", "Unknown Scheme"),
                    "category": "general",
                    "shortDescription": raw_data.get("description", "")[:200],
                    "eligibility": [],
                    "benefits": [],
                    "requiredDocuments": [],
                    "eligibleRoles": ["other"],
                    "tags": [],
                    "ageRange": None,
                    "incomeLimit": None,
                    "applicationProcess": "",
                    "officialWebsite": raw_data.get("url", "")
                }
        else:
            # Fallback structure
            return {
                "name": raw_data.get("title", "Unknown Scheme"),
                "category": "general",
                "shortDescription": raw_data.get("description", "")[:200],
                "eligibility": [],
                "benefits": [],
                "requiredDocuments": [],
                "eligibleRoles": ["other"],
                "tags": [],
                "ageRange": None,
                "incomeLimit": None,
                "applicationProcess": "",
                "officialWebsite": raw_data.get("url", "")
            }
    except Exception as e:
        print(f"Error in process_scheme_data_gemini: {str(e)}")
        # Fallback structure
        return {
            "name": raw_data.get("title", "Unknown Scheme"),
            "category": "general",
            "shortDescription": raw_data.get("description", "")[:200],
            "eligibility": [],
            "benefits": [],
            "requiredDocuments": [],
            "eligibleRoles": ["other"],
            "tags": [],
            "ageRange": None,
            "incomeLimit": None,
            "applicationProcess": "",
            "officialWebsite": raw_data.get("url", "")
        }

async def answer_user_query_gemini(user_message: str, schemes_data: list):
    """
    Use processed scheme data to answer user queries accurately.
    Uses Google Gemini AI instead of Groq.
    The schemes_data contains properly structured JSON from the database.
    """
    # Limit schemes context to avoid token limits (max 10 schemes at a time)
    limited_schemes = schemes_data[:10] if len(schemes_data) > 10 else schemes_data

    # Create concise context with only name and short description for accurate AI responses
    schemes_context = "\n\n".join([
        f"""Scheme {idx+1}: {s.get('name', 'N/A')}
Description: {s.get('shortDescription', 'N/A')}
---"""
        for idx, s in enumerate(limited_schemes)
    ])

    system_prompt = """You are Sahayak AI, a helpful assistant for Indian government schemes.
Answer in English. Be concise and helpful.
Use the scheme database provided to give accurate information."""

    user_prompt = f"""{system_prompt}

Database ({len(limited_schemes)} schemes):
{schemes_context}

Question: {user_message}

Answer based on the schemes above."""

    try:
        model = genai.GenerativeModel(settings.gemini_chat_model)
        response = model.generate_content(user_prompt)

        if response and response.text:
            return response.text.strip()
        else:
            return "I apologize, but I'm unable to process your question at the moment. Please try again later."
    except Exception as e:
        print(f"Error in answer_user_query_gemini: {str(e)}")
        return f"Error: {str(e)}"