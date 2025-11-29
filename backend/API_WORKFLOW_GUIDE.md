# Sahayak AI - API Workflow Documentation

## 🚀 Complete API Guide

This guide provides step-by-step instructions for using the Sahayak AI APIs with the new data processing workflow.

---

## Base URL

```
http://localhost:8000
```

For production:
```
https://your-domain.com
```

---

## 📋 Table of Contents

1. [Fetch Schemes (Exa → Groq → Database)](#1-fetch-schemes)
2. [Get All Schemes](#2-get-all-schemes)
3. [Get Single Scheme](#3-get-single-scheme)
4. [Chat with AI Bot](#4-chat-with-ai-bot)
5. [Get Scheme Explanation](#5-get-scheme-explanation)

---

## 1. Fetch Schemes

**Trigger the complete data pipeline: Exa scrapes → Groq processes → Store in database**

### Endpoint
```
POST /schemes/fetch
```

### Request URL
```
http://localhost:8000/schemes/fetch
```

### Request Headers
```json
{
  "Content-Type": "application/json"
}
```

### Request Body
```
No body required
```

### cURL Example
```bash
curl -X POST http://localhost:8000/schemes/fetch \
  -H "Content-Type: application/json"
```

### Expected Response (Success)

**Status Code:** `200 OK`

```json
{
  "message": "Schemes fetched and stored successfully",
  "details": {
    "total_scraped": 10,
    "new_schemes_added": 5,
    "schemes": [
      {
        "id": "674a1b2c3d4e5f6g7h8i9j0k",
        "title": "Pradhan Mantri Kisan Samman Nidhi",
        "url": "https://pmkisan.gov.in/",
        "category": "agriculture"
      },
      {
        "id": "674a1b2c3d4e5f6g7h8i9j0l",
        "title": "Startup India Seed Fund Scheme",
        "url": "https://www.startupindia.gov.in/",
        "category": "business"
      },
      {
        "id": "674a1b2c3d4e5f6g7h8i9j0m",
        "title": "Atal Pension Yojana",
        "url": "https://npscra.nsdl.co.in/",
        "category": "pension"
      },
      {
        "id": "674a1b2c3d4e5f6g7h8i9j0n",
        "title": "PM Scholarship Scheme",
        "url": "https://scholarships.gov.in/",
        "category": "education"
      },
      {
        "id": "674a1b2c3d4e5f6g7h8i9j0o",
        "title": "Pradhan Mantri Awas Yojana",
        "url": "https://pmaymis.gov.in/",
        "category": "housing"
      }
    ]
  }
}
```

### What Happens Behind the Scenes

```
Step 1: Exa scrapes 10 government scheme websites
        ↓
Step 2: For each scheme, raw data sent to Groq
        ↓
Step 3: Groq extracts structured JSON (name, category, eligibility, etc.)
        ↓
Step 4: Both raw_data and processed_data stored in MongoDB
        ↓
Step 5: Users notified via in-app + WhatsApp
        ↓
Step 6: Response returned with statistics
```

### Possible Errors

**Status Code:** `500 Internal Server Error`

```json
{
  "detail": "Exa API key not configured"
}
```

```json
{
  "detail": "Groq API processing failed"
}
```

---

## 2. Get All Schemes

**Retrieve all processed schemes from the database**

### Endpoint
```
GET /schemes
```

### Request URL
```
http://localhost:8000/schemes
```

### Request Headers
```json
{
  "Content-Type": "application/json"
}
```

### Request Body
```
No body required
```

### cURL Example
```bash
curl -X GET http://localhost:8000/schemes \
  -H "Content-Type: application/json"
```

### Expected Response (Success)

**Status Code:** `200 OK`

```json
[
  {
    "id": "674a1b2c3d4e5f6g7h8i9j0k",
    "name": "Pradhan Mantri Kisan Samman Nidhi",
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
    "ageRange": null,
    "incomeLimit": "Land holding up to 2 hectares",
    "applicationProcess": "Register through Common Service Centers (CSCs) or official PM-KISAN portal. Provide Aadhaar, bank details, and land ownership proof.",
    "officialWebsite": "https://pmkisan.gov.in/",
    "source_url": "https://pmkisan.gov.in/",
    "is_new": true,
    "created_at": "2025-11-29T10:30:00.000Z",
    "processed_at": "2025-11-29T10:30:05.000Z"
  },
  {
    "id": "674a1b2c3d4e5f6g7h8i9j0l",
    "name": "Startup India Seed Fund Scheme",
    "category": "business",
    "shortDescription": "Provides financial assistance to startups for proof of concept, prototype development, product trials, market entry and commercialization.",
    "eligibility": [
      "DPIIT recognized startups",
      "Incorporated not more than 2 years ago",
      "Working towards innovation, development of new products",
      "Should not have received more than Rs 10 lakh from government"
    ],
    "benefits": [
      "Up to Rs 20 lakh as grant",
      "Up to Rs 50 lakh as debt/convertible debentures",
      "Mentorship support",
      "Networking opportunities"
    ],
    "requiredDocuments": [
      "Certificate of Incorporation",
      "DPIIT Recognition Number",
      "Business Plan",
      "Financial Projections",
      "Pitch Deck"
    ],
    "eligibleRoles": ["self_employed", "other"],
    "tags": [
      "startup",
      "business",
      "seed funding",
      "entrepreneurship",
      "innovation"
    ],
    "ageRange": null,
    "incomeLimit": null,
    "applicationProcess": "Apply online through Startup India portal. Submit business plan, pitch deck and required documents for evaluation.",
    "officialWebsite": "https://www.startupindia.gov.in/",
    "source_url": "https://www.startupindia.gov.in/content/sih/en/government-schemes/seedfund.html",
    "is_new": true,
    "created_at": "2025-11-29T10:30:10.000Z",
    "processed_at": "2025-11-29T10:30:15.000Z"
  }
]
```

### Response Fields Explanation

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique scheme identifier |
| `name` | string | Official scheme name |
| `category` | string | One of: agriculture, business, pension, education, housing, general |
| `shortDescription` | string | Brief 2-3 sentence description |
| `eligibility` | array | List of eligibility criteria |
| `benefits` | array | List of scheme benefits |
| `requiredDocuments` | array | Documents needed for application |
| `eligibleRoles` | array | Applicable user roles |
| `tags` | array | Search tags |
| `ageRange` | string/null | Age criteria if applicable |
| `incomeLimit` | string/null | Income limit if applicable |
| `applicationProcess` | string | How to apply |
| `officialWebsite` | string | Official scheme website |
| `source_url` | string | Source where data was scraped |
| `is_new` | boolean | Whether scheme is new |
| `created_at` | datetime | When scheme was added |
| `processed_at` | datetime | When data was processed by Groq |

---

## 3. Get Single Scheme

**Retrieve detailed information about a specific scheme**

### Endpoint
```
GET /schemes/{scheme_id}
```

### Request URL
```
http://localhost:8000/schemes/674a1b2c3d4e5f6g7h8i9j0k
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scheme_id` | string | Yes | MongoDB ObjectId of the scheme |

### Request Headers
```json
{
  "Content-Type": "application/json"
}
```

### cURL Example
```bash
curl -X GET http://localhost:8000/schemes/674a1b2c3d4e5f6g7h8i9j0k \
  -H "Content-Type: application/json"
```

### Expected Response (Success)

**Status Code:** `200 OK`

```json
{
  "id": "674a1b2c3d4e5f6g7h8i9j0k",
  "name": "Pradhan Mantri Kisan Samman Nidhi",
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
  "ageRange": null,
  "incomeLimit": "Land holding up to 2 hectares",
  "applicationProcess": "Register through Common Service Centers (CSCs) or official PM-KISAN portal. Provide Aadhaar, bank details, and land ownership proof.",
  "officialWebsite": "https://pmkisan.gov.in/",
  "source_url": "https://pmkisan.gov.in/",
  "is_new": true,
  "created_at": "2025-11-29T10:30:00.000Z",
  "processed_at": "2025-11-29T10:30:05.000Z"
}
```

### Expected Response (Not Found)

**Status Code:** `404 Not Found`

```json
{
  "detail": "Scheme not found"
}
```

---

## 4. Chat with AI Bot

**Ask questions and get intelligent answers based on processed scheme data**

### Endpoint
```
POST /chat
```

### Request URL
```
http://localhost:8000/chat
```

### Request Headers
```json
{
  "Content-Type": "application/json"
}
```

### Request Body

```json
{
  "message": "मैं एक किसान हूं और मेरे पास 1.5 हेक्टेयर जमीन है। मेरे लिए कौन सी योजना है?",
  "user_id": "optional_user_id_123"
}
```

### Request Body Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | string | Yes | User's question (Hindi or English) |
| `user_id` | string | No | Optional user identifier for tracking |

### cURL Example

**Example 1: Farmer Query (Hindi)**
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "मैं एक किसान हूं और मेरे पास 1.5 हेक्टेयर जमीन है। मेरे लिए कौन सी योजना है?",
    "user_id": "user_123"
  }'
```

**Example 2: Student Query (Hindi)**
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "मैं एक छात्र हूं। मुझे छात्रवृत्ति चाहिए।"
  }'
```

**Example 3: Startup Query (English)**
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I want to start a business. What schemes are available for startups?"
  }'
```

**Example 4: General Query**
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "सभी योजनाओं की सूची बताओ"
  }'
```

### Expected Response (Success)

**Status Code:** `200 OK`

**Example Response 1: Farmer Query**
```json
{
  "response": "आपके लिए PM-KISAN (प्रधानमंत्री किसान सम्मान निधि) योजना उपयुक्त है।\n\n**योजना का नाम**: प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)\n\n**पात्रता**: आप इस योजना के लिए पात्र हैं क्योंकि:\n- आप एक किसान हैं\n- आपके पास 1.5 हेक्टेयर जमीन है (योजना 2 हेक्टेयर तक की जमीन वाले किसानों के लिए है)\n\n**लाभ**:\n- साल में ₹6,000 की आर्थिक सहायता\n- यह राशि तीन किस्तों में मिलेगी (हर किस्त ₹2,000 की)\n- सीधे आपके बैंक खाते में ट्रांसफर होगी\n\n**आवश्यक दस्तावेज**:\n- आधार कार्ड\n- बैंक खाता विवरण (आधार से लिंक)\n- जमीन के स्वामित्व के दस्तावेज\n- पासपोर्ट साइज फोटो\n\n**आवेदन कैसे करें**:\n1. अपने नजदीकी Common Service Center (CSC) पर जाएं\n2. या PM-KISAN की आधिकारिक वेबसाइट https://pmkisan.gov.in/ पर ऑनलाइन आवेदन करें\n3. अपने सभी दस्तावेज साथ रखें\n\nक्या आप आवेदन प्रक्रिया के बारे में और जानकारी चाहते हैं?",
  "schemes_count": 15,
  "data_source": "processed_schemes_database"
}
```

**Example Response 2: Startup Query (English)**
```json
{
  "response": "For startups, you have the following schemes available:\n\n**1. Startup India Seed Fund Scheme**\n\nEligibility:\n- DPIIT recognized startups\n- Incorporated not more than 2 years ago\n- Working on innovation and new product development\n- Should not have received more than Rs 10 lakh from government\n\nBenefits:\n- Up to Rs 20 lakh as grant\n- Up to Rs 50 lakh as debt/convertible debentures\n- Mentorship and networking support\n\nHow to Apply:\n1. Get DPIIT recognition first\n2. Visit Startup India portal (https://www.startupindia.gov.in/)\n3. Submit business plan and pitch deck\n4. Undergo evaluation process\n\nRequired Documents:\n- Certificate of Incorporation\n- DPIIT Recognition Number\n- Business Plan\n- Financial Projections\n- Pitch Deck\n\nWould you like more information about the application process?",
  "schemes_count": 15,
  "data_source": "processed_schemes_database"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `response` | string | AI-generated answer based on scheme data |
| `schemes_count` | integer | Total number of schemes in database |
| `data_source` | string | Always "processed_schemes_database" |

### How It Works

```
1. User sends query
   ↓
2. Backend fetches all processed schemes from MongoDB
   ↓
3. Schemes data + user query sent to Groq AI
   ↓
4. Groq analyzes:
   - User's profile (farmer, student, etc.)
   - User's requirements (land size, age, income, etc.)
   - Available schemes and their eligibility
   ↓
5. Groq generates personalized answer in Hindi/English
   ↓
6. Response returned to user
```

### Expected Response (No Schemes Available)

**Status Code:** `200 OK`

```json
{
  "response": "क्षमा करें, अभी कोई योजना उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।",
  "schemes_count": 0,
  "data_source": "processed_schemes_database"
}
```

---

## 5. Get Scheme Explanation

**Get a detailed explanation of a specific scheme in Hindi**

### Endpoint
```
POST /scheme-info/{scheme_id}
```

### Request URL
```
http://localhost:8000/scheme-info/674a1b2c3d4e5f6g7h8i9j0k
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scheme_id` | string | Yes | MongoDB ObjectId of the scheme |

### Request Headers
```json
{
  "Content-Type": "application/json"
}
```

### Request Body
```
No body required
```

### cURL Example
```bash
curl -X POST http://localhost:8000/scheme-info/674a1b2c3d4e5f6g7h8i9j0k \
  -H "Content-Type: application/json"
```

### Expected Response (Success)

**Status Code:** `200 OK`

```json
{
  "explanation": "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN) भारत सरकार की एक महत्वपूर्ण योजना है जो छोटे और सीमांत किसानों को आर्थिक सहायता प्रदान करती है।\n\nइस योजना के तहत:\n- पात्र किसान परिवारों को हर साल ₹6,000 की वित्तीय सहायता मिलती है\n- यह राशि तीन बराबर किस्तों में दी जाती है - हर चार महीने में ₹2,000\n- पैसा सीधे किसानों के बैंक खाते में ट्रांसफर किया जाता है\n\nयह योजना किसानों को कृषि से संबंधित खर्चों, बीज खरीदने, उर्वरक और अन्य इनपुट्स के लिए वित्तीय सहायता प्रदान करती है। इससे किसानों की आय में वृद्धि होती है और उन्हें आर्थिक सुरक्षा मिलती है।"
}
```

### Expected Response (Not Found)

**Status Code:** `404 Not Found`

```json
{
  "detail": "Scheme not found"
}
```

---

## 🔄 Complete Workflow Example

### Step 1: Fetch Schemes (One Time Setup)

```bash
# Trigger Exa scraping and Groq processing
curl -X POST http://localhost:8000/schemes/fetch

# Response: 5 new schemes added
```

### Step 2: View All Available Schemes

```bash
# Get all schemes
curl -X GET http://localhost:8000/schemes

# Response: List of 15 schemes with full details
```

### Step 3: User Interacts with Chat Bot

```bash
# User asks about farmer schemes
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "मैं किसान हूं"}'

# Bot responds with PM-KISAN details
```

### Step 4: Get Specific Scheme Details

```bash
# Get detailed info about PM-KISAN
curl -X GET http://localhost:8000/schemes/674a1b2c3d4e5f6g7h8i9j0k

# Response: Complete scheme information
```

### Step 5: Get Hindi Explanation

```bash
# Get simple Hindi explanation
curl -X POST http://localhost:8000/scheme-info/674a1b2c3d4e5f6g7h8i9j0k

# Response: Detailed explanation in Hindi
```

---

## 🧪 Testing with Postman

### Collection Setup

1. **Create New Collection**: "Sahayak AI"
2. **Set Base URL Variable**: `{{base_url}}` = `http://localhost:8000`

### Import Endpoints

#### 1. Fetch Schemes
- Method: POST
- URL: `{{base_url}}/schemes/fetch`
- Headers: `Content-Type: application/json`

#### 2. Get All Schemes
- Method: GET
- URL: `{{base_url}}/schemes`
- Headers: `Content-Type: application/json`

#### 3. Get Single Scheme
- Method: GET
- URL: `{{base_url}}/schemes/{{scheme_id}}`
- Headers: `Content-Type: application/json`
- Variables: `scheme_id` (set in environment)

#### 4. Chat
- Method: POST
- URL: `{{base_url}}/chat`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "message": "मैं किसान हूं",
  "user_id": "test_user_123"
}
```

#### 5. Scheme Explanation
- Method: POST
- URL: `{{base_url}}/scheme-info/{{scheme_id}}`
- Headers: `Content-Type: application/json`

---

## 🔐 Authentication (Future)

Currently, these endpoints are **open** (no authentication required).

For production, you should add:
- JWT token authentication
- API key for `/schemes/fetch`
- Rate limiting
- User-specific chat history

Example with auth:
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"message": "योजनाएं बताओ"}'
```

---

## ⚡ Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/schemes/fetch` | 10 requests | 1 hour |
| `/chat` | 100 requests | 1 hour |
| `/schemes` | 1000 requests | 1 hour |
| `/schemes/{id}` | 1000 requests | 1 hour |

---

## 🐛 Error Codes

| Status Code | Meaning | Example |
|-------------|---------|---------|
| 200 | Success | Request completed successfully |
| 400 | Bad Request | Invalid request body |
| 404 | Not Found | Scheme not found |
| 422 | Validation Error | Missing required fields |
| 500 | Server Error | Database connection failed |
| 503 | Service Unavailable | Groq API down |

### Error Response Format

```json
{
  "detail": "Error message here"
}
```

---

## 📊 Data Processing Pipeline

```
POST /schemes/fetch
        ↓
┌───────────────────┐
│  Exa Scrapes Data │
│  (10 schemes)     │
└────────┬──────────┘
         ↓
┌───────────────────┐
│  For each scheme: │
│  ↓                │
│  Groq Processes   │
│  ↓                │
│  MongoDB Stores   │
└────────┬──────────┘
         ↓
┌───────────────────┐
│  Users Notified   │
│  (WhatsApp + App) │
└───────────────────┘
```

When user calls `POST /chat`:
```
User Query
    ↓
Fetch Schemes from DB
    ↓
Send to Groq (query + schemes)
    ↓
Groq Analyzes & Responds
    ↓
Return Answer to User
```

---

## 📝 Notes

1. **First Time Setup**: Run `POST /schemes/fetch` to populate the database
2. **Chat Requires Data**: `/chat` endpoint needs schemes in database to work
3. **Language Detection**: Bot automatically detects Hindi/English in user queries
4. **Scheme Updates**: Run `/schemes/fetch` weekly to get new schemes
5. **Data Quality**: Check `raw_data` and `processed_data` fields in MongoDB for debugging

---

## 🎯 Quick Start

```bash
# 1. Start backend
cd backend
uvicorn app.main:app --reload

# 2. Fetch schemes (do this once)
curl -X POST http://localhost:8000/schemes/fetch

# 3. Test chat
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "योजनाएं बताओ"}'

# 4. Done! ✅
```

---

**Documentation Version**: 1.0  
**Last Updated**: November 29, 2025  
**API Version**: v1
