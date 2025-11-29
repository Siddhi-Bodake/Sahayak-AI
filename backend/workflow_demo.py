"""
Test Script for Sahayak AI Workflow
This demonstrates the complete data flow: Exa → Groq → Database → Chat
"""

import asyncio
import json

# Mock data to demonstrate workflow
mock_exa_result = {
    "title": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    "description": """The Pradhan Mantri Kisan Samman Nidhi is a government scheme in India 
    that provides income support to farmer families. Under this scheme, eligible farmers 
    receive Rs 6,000 per year in three equal installments. The scheme aims to supplement 
    the financial needs of farmers for procuring various inputs and ensuring proper crop health.
    
    Eligibility: Small and marginal farmer families having combined land holding up to 2 hectares.
    Benefits: Rs 6,000 per year in three installments of Rs 2,000 each.
    Documents Required: Aadhaar card, Bank account details, Land ownership documents.
    How to Apply: Farmers can register through Common Service Centers (CSCs) or the official portal.
    """,
    "url": "https://pmkisan.gov.in/"
}

# Expected Groq processing output
expected_groq_output = {
    "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    "category": "agriculture",
    "shortDescription": "Income support scheme providing Rs 6,000 per year to small and marginal farmer families to supplement their financial needs for agriculture inputs and crop health.",
    "eligibility": [
        "Small and marginal farmer families",
        "Combined land holding up to 2 hectares",
        "Must be Indian citizen",
        "Valid bank account linked with Aadhaar"
    ],
    "benefits": [
        "Rs 6,000 per year",
        "Paid in three equal installments of Rs 2,000 each",
        "Direct benefit transfer to bank account",
        "No need to visit government offices"
    ],
    "requiredDocuments": [
        "Aadhaar card",
        "Bank account details",
        "Land ownership documents",
        "Passport size photograph"
    ],
    "eligibleRoles": ["farmer"],
    "tags": [
        "agriculture",
        "farmer support",
        "direct benefit transfer",
        "income support",
        "PM-KISAN"
    ],
    "ageRange": None,
    "incomeLimit": "Land holding up to 2 hectares",
    "applicationProcess": "Register through Common Service Centers (CSCs) or official PM-KISAN portal. Provide Aadhaar, bank details, and land ownership proof.",
    "officialWebsite": "https://pmkisan.gov.in/"
}

# Expected database schema
expected_database_entry = {
    "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    "category": "agriculture",
    "shortDescription": "Income support scheme providing Rs 6,000 per year to small and marginal farmer families to supplement their financial needs for agriculture inputs and crop health.",
    "eligibility": [
        "Small and marginal farmer families",
        "Combined land holding up to 2 hectares",
        "Must be Indian citizen",
        "Valid bank account linked with Aadhaar"
    ],
    "benefits": [
        "Rs 6,000 per year",
        "Paid in three equal installments of Rs 2,000 each",
        "Direct benefit transfer to bank account",
        "No need to visit government offices"
    ],
    "requiredDocuments": [
        "Aadhaar card",
        "Bank account details",
        "Land ownership documents",
        "Passport size photograph"
    ],
    "eligibleRoles": ["farmer"],
    "tags": [
        "agriculture",
        "farmer support",
        "direct benefit transfer",
        "income support",
        "PM-KISAN"
    ],
    "ageRange": None,
    "incomeLimit": "Land holding up to 2 hectares",
    "applicationProcess": "Register through Common Service Centers (CSCs) or official PM-KISAN portal. Provide Aadhaar, bank details, and land ownership proof.",
    "officialWebsite": "https://pmkisan.gov.in/",
    "source_url": "https://pmkisan.gov.in/",
    # Raw scraped data stored for reference
    "raw_data": mock_exa_result,
    # Processed data from Groq stored for audit
    "processed_data": expected_groq_output,
    "is_new": True,
    "created_at": "2025-11-29T10:30:00Z",
    "processed_at": "2025-11-29T10:30:05Z"
}

# Example chat interaction
example_chat_query = "मैं एक किसान हूं और मेरे पास 1.5 हेक्टेयर जमीन है। मेरे लिए कौन सी योजना है?"

expected_chat_response = """आपके लिए PM-KISAN (प्रधानमंत्री किसान सम्मान निधि) योजना उपयुक्त है।

**योजना का नाम**: प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)

**पात्रता**: आप इस योजना के लिए पात्र हैं क्योंकि:
- आप एक किसान हैं
- आपके पास 1.5 हेक्टेयर जमीन है (योजना 2 हेक्टेयर तक की जमीन वाले किसानों के लिए है)

**लाभ**:
- साल में ₹6,000 की आर्थिक सहायता
- यह राशि तीन किस्तों में मिलेगी (हर किस्त ₹2,000 की)
- सीधे आपके बैंक खाते में ट्रांसफर होगी

**आवश्यक दस्तावेज**:
- आधार कार्ड
- बैंक खाता विवरण (आधार से लिंक)
- जमीन के स्वामित्व के दस्तावेज
- पासपोर्ट साइज फोटो

**आवेदन कैसे करें**:
1. अपने नजदीकी Common Service Center (CSC) पर जाएं
2. या PM-KISAN की आधिकारिक वेबसाइट https://pmkisan.gov.in/ पर ऑनलाइन आवेदन करें
3. अपने सभी दस्तावेज साथ रखें

क्या आप आवेदन प्रक्रिया के बारे में और जानकारी चाहते हैं?"""


def print_workflow():
    """Print the complete workflow demonstration"""
    print("=" * 80)
    print("SAHAYAK AI - DATA PROCESSING WORKFLOW DEMONSTRATION")
    print("=" * 80)
    
    print("\n" + "─" * 80)
    print("STEP 1: EXA SCRAPES DATA")
    print("─" * 80)
    print("\nExa searches: 'government financial schemes India eligibility benefits application'")
    print("\nScraped Data:")
    print(json.dumps(mock_exa_result, indent=2, ensure_ascii=False))
    
    print("\n" + "─" * 80)
    print("STEP 2: GROQ PROCESSES DATA INTO STRUCTURED JSON")
    print("─" * 80)
    print("\nGroq extracts and structures the information:")
    print(json.dumps(expected_groq_output, indent=2, ensure_ascii=False))
    
    print("\n" + "─" * 80)
    print("STEP 3: DATA STORED IN DATABASE")
    print("─" * 80)
    print("\nMongoDB Document (with both raw and processed data):")
    print(json.dumps({k: v for k, v in expected_database_entry.items() 
                     if k not in ['raw_data', 'processed_data']}, 
                    indent=2, ensure_ascii=False))
    print("\n+ raw_data: [Original scraped content]")
    print("+ processed_data: [Groq's structured output]")
    
    print("\n" + "─" * 80)
    print("STEP 4: USER INTERACTS WITH CHAT BOT")
    print("─" * 80)
    print(f"\nUser Query: {example_chat_query}")
    print(f"\nBot Response:\n{expected_chat_response}")
    
    print("\n" + "=" * 80)
    print("WORKFLOW SUMMARY")
    print("=" * 80)
    print("""
    1. ✅ Exa scrapes data ONCE from web
    2. ✅ Groq processes raw data into proper JSON schema
    3. ✅ Both raw and processed data stored in database
    4. ✅ Chat bot uses processed schema to give accurate answers
    5. ✅ Users get proper guidance based on structured data
    """)
    print("=" * 80)


if __name__ == "__main__":
    print_workflow()
