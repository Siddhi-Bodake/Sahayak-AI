# Sahayak AI - Complete Implementation Guide

## 🎯 Overview

Your Sahayak AI system now has a **proper data pipeline** where:

1. **Exa scrapes data once** ➜ No redundant calls
2. **Groq processes into JSON** ➜ Structured schema
3. **Stored in database** ➜ Both raw & processed
4. **Bot provides answers** ➜ Using structured data

---

## 📊 Complete Data Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                     GOVERNMENT WEBSITES                           │
│  (pmkisan.gov.in, myscheme.gov.in, startupindia.gov.in, etc.)   │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  STEP 1: EXA SCRAPES DATA (ONE TIME)                            │
│  ─────────────────────────────────────────────────────────────  │
│  • Search: "government financial schemes India"                  │
│  • Gets: Title, Full text content, URL                          │
│  • Returns: 10 results per fetch                                │
│                                                                   │
│  Output: {title, description, url}                              │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  STEP 2: GROQ AI PROCESSES DATA                                 │
│  ─────────────────────────────────────────────────────────────  │
│  Input: Raw scraped text                                        │
│                                                                   │
│  Groq extracts:                                                  │
│  ✓ name                    ✓ eligibility                        │
│  ✓ category                ✓ benefits                           │
│  ✓ shortDescription        ✓ requiredDocuments                  │
│  ✓ eligibleRoles           ✓ applicationProcess                 │
│  ✓ tags                    ✓ officialWebsite                    │
│  ✓ ageRange                ✓ incomeLimit                        │
│                                                                   │
│  Output: Structured JSON with all fields                        │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  STEP 3: STORE IN MONGODB                                       │
│  ─────────────────────────────────────────────────────────────  │
│  Document Structure:                                             │
│  {                                                               │
│    // Structured fields from Groq                               │
│    name: "PM-KISAN",                                            │
│    category: "agriculture",                                      │
│    eligibility: [...],                                          │
│    benefits: [...],                                             │
│    // ... all other fields                                      │
│                                                                   │
│    // Original data for reference                               │
│    raw_data: {title, description, url},                         │
│                                                                   │
│    // Groq's output for audit                                   │
│    processed_data: {...},                                       │
│                                                                   │
│    // Timestamps                                                 │
│    created_at: "2025-11-29T10:30:00Z",                          │
│    processed_at: "2025-11-29T10:30:05Z"                         │
│  }                                                               │
└────────────────┬────────────────────────┬───────────────────────┘
                 │                        │
                 ▼                        ▼
┌─────────────────────────┐   ┌──────────────────────────┐
│  STEP 4: CHAT BOT       │   │  STEP 5: NOTIFICATIONS   │
│  ──────────────────────  │   │  ───────────────────────  │
│                          │   │                           │
│  User: "मैं किसान हूं"   │   │  • In-app notifications  │
│                          │   │  • WhatsApp messages     │
│  Bot fetches schemes     │   │  • Targeted to users     │
│  from database ↓         │   │                           │
│                          │   │  Message:                │
│  Sends to Groq:          │   │  "नई योजना: PM-KISAN"    │
│  - User query            │   │                           │
│  - Structured schemes    │   │                           │
│                          │   │                           │
│  Bot: "आपके लिए         │   │                           │
│  PM-KISAN योजना है..."   │   │                           │
└─────────────────────────┘   └──────────────────────────┘
```

---

## 🔧 Implementation Details

### Modified Files

#### 1. `app/services/groq_service.py`

**New Function: `process_scheme_data(raw_data)`**
```python
# Takes raw scraped data
# Returns structured JSON with all fields
# Handles errors gracefully
```

**New Function: `answer_user_query(user_message, schemes_data)`**
```python
# Uses structured scheme data
# Provides context-aware answers
# Responds in Hindi by default
```

#### 2. `app/services/exa_service.py`

**Enhanced: `fetch_and_store_schemes()`**
```python
# 1. Exa scrapes with search_and_contents()
# 2. For each result:
#    - Prepare raw data
#    - Send to Groq for processing
#    - Store both raw & processed
# 3. Notify users
# 4. Return detailed stats
```

#### 3. `app/models/scheme_model.py`

**New Fields:**
- `applicationProcess`: How to apply
- `officialWebsite`: Official URL
- `raw_data`: Original scraped content
- `processed_data`: Groq's output
- `processed_at`: Processing timestamp

#### 4. `app/routes/ai_routes.py`

**Enhanced: `/chat` endpoint**
```python
# Fetches processed schemes from DB
# Uses answer_user_query() function
# Returns response + metadata
```

#### 5. `app/routes/scheme_routes.py`

**Enhanced: `/schemes/fetch` endpoint**
```python
# Returns detailed results:
# - total_scraped
# - new_schemes_added
# - schemes list
```

---

## 🚀 How to Use

### 1. Fetch New Schemes

**Endpoint:** `POST /schemes/fetch`

```bash
curl -X POST http://localhost:8000/schemes/fetch
```

**What happens:**
1. Exa scrapes 10 government schemes
2. Each is processed by Groq
3. Stored in database with full structure
4. Users are notified

**Response:**
```json
{
  "message": "Schemes fetched and stored successfully",
  "details": {
    "total_scraped": 10,
    "new_schemes_added": 5,
    "schemes": [...]
  }
}
```

### 2. Chat with Bot

**Endpoint:** `POST /chat`

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "मैं किसान हूं, मेरे लिए कौन सी योजना है?",
    "user_id": "optional_id"
  }'
```

**What happens:**
1. Fetches all processed schemes from DB
2. Sends to Groq with user query
3. Groq analyzes and provides answer
4. Returns response in Hindi

**Response:**
```json
{
  "response": "आपके लिए PM-KISAN योजना उपयुक्त है...",
  "schemes_count": 15,
  "data_source": "processed_schemes_database"
}
```

### 3. Get All Schemes

**Endpoint:** `GET /schemes`

```bash
curl http://localhost:8000/schemes
```

Returns all schemes with full structured data.

### 4. Get Specific Scheme

**Endpoint:** `GET /schemes/{scheme_id}`

```bash
curl http://localhost:8000/schemes/507f1f77bcf86cd799439011
```

Returns complete details of one scheme.

---

## 📝 Example: PM-KISAN Processing

### Input (from Exa)
```json
{
  "title": "Pradhan Mantri Kisan Samman Nidhi",
  "description": "Income support scheme for farmers...",
  "url": "https://pmkisan.gov.in/"
}
```

### Processing (by Groq)
Groq extracts:
- Name, category, description
- Eligibility criteria (list)
- Benefits (list)
- Required documents (list)
- Application process
- Age/income limits

### Output (in Database)
```json
{
  "name": "PM-KISAN",
  "category": "agriculture",
  "eligibility": ["Small farmers", "Up to 2 hectares"],
  "benefits": ["Rs 6,000/year", "3 installments"],
  "requiredDocuments": ["Aadhaar", "Bank details"],
  "applicationProcess": "Apply via CSC or online",
  "raw_data": {...},
  "processed_data": {...}
}
```

### Usage (in Chat)
User: "मैं किसान हूं"

Bot uses structured data to:
1. Find relevant schemes (PM-KISAN)
2. Check eligibility match
3. Provide clear answer with details
4. Guide on how to apply

---

## ✅ Benefits

| Before | After |
|--------|-------|
| Raw text storage | Structured JSON storage |
| Manual data parsing | Automated AI extraction |
| Basic answers | Context-aware guidance |
| No data audit | Full audit trail |
| Redundant scraping | One-time scraping |

---

## 🧪 Testing

### Run Demo Script
```bash
cd backend
python3 workflow_demo.py
```

### Test API Endpoints
```bash
# 1. Start backend
cd backend
uvicorn app.main:app --reload

# 2. Fetch schemes
curl -X POST http://localhost:8000/schemes/fetch

# 3. Chat
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "योजनाएं बताओ"}'

# 4. Check schemes
curl http://localhost:8000/schemes
```

---

## 📚 Documentation Files

1. **`IMPLEMENTATION_SUMMARY.md`** - What changed and why
2. **`WORKFLOW_DOCUMENTATION.md`** - Complete technical guide
3. **`COMPLETE_GUIDE.md`** - This file (user guide)
4. **`workflow_demo.py`** - Demo script with examples

---

## 🎓 Key Concepts

### Why Store Raw Data?
- Audit trail
- Reprocess if needed
- Compare with processed data
- Debug Groq extraction

### Why Use Groq for Processing?
- Consistent structure
- Better extraction
- Handles varied formats
- Multilingual support

### Why Store Processed Data Separately?
- Track what Groq extracted
- Quality assurance
- A/B testing prompts
- Data lineage

---

## 🔄 Future Enhancements

- [ ] Scheduled daily/weekly scheme fetching
- [ ] Better error handling and retries
- [ ] Data quality scoring
- [ ] Multi-language scheme descriptions
- [ ] Scheme recommendation engine
- [ ] Analytics dashboard

---

## 📞 Support

For issues or questions:
1. Check `WORKFLOW_DOCUMENTATION.md` for details
2. Run `workflow_demo.py` to see examples
3. Review MongoDB data structure
4. Check API logs for errors

---

**Status**: ✅ Fully Implemented  
**Version**: 1.0  
**Date**: November 29, 2025
