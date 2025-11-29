# Sahayak AI - Data Processing Workflow

## Overview
This document explains how Sahayak AI processes government scheme data using Exa for scraping and Groq for AI processing.

## Complete Workflow

### 1. Data Scraping (Exa)
**File**: `app/services/exa_service.py`

- Exa scrapes government financial scheme data from the web **once**
- Search query: "government financial schemes India eligibility benefits application"
- Retrieves: Title, Full text content, URL
- Number of results: 10 schemes per fetch

```python
results = exa.search_and_contents(
    "government financial schemes India eligibility benefits application",
    num_results=10,
    text=True
)
```

### 2. Data Processing (Groq AI)
**File**: `app/services/groq_service.py` - `process_scheme_data()`

Raw scraped data is sent to Groq API which extracts and structures it into proper JSON:

**Extracted Fields:**
- `name`: Full scheme name
- `category`: agriculture | business | pension | education | housing | general
- `shortDescription`: Clear 2-3 sentence description
- `eligibility`: Array of eligibility criteria
- `benefits`: Array of benefits
- `requiredDocuments`: Array of required documents
- `eligibleRoles`: farmer | student | self_employed | salaried | unemployed | other
- `tags`: Relevant search tags
- `ageRange`: Age criteria (if applicable)
- `incomeLimit`: Income limit (if applicable)
- `applicationProcess`: How to apply
- `officialWebsite`: Official website URL

**Key Features:**
- Uses temperature 0.3 for consistent structured output
- Removes markdown code blocks from response
- Has fallback structure for error cases
- Validates and sets defaults for all fields

### 3. Data Storage (MongoDB)
**File**: `app/services/exa_service.py`

Each scheme is stored with:
- **Structured fields**: All processed data fields
- **raw_data**: Original scraped data (for reference)
- **processed_data**: Complete JSON from Groq (for audit)
- **timestamps**: created_at, processed_at

```javascript
{
  "name": "Pradhan Mantri Kisan Samman Nidhi",
  "category": "agriculture",
  "shortDescription": "Financial support to farmers...",
  "eligibility": ["Small and marginal farmers", "..."],
  "benefits": ["Rs 6000 per year", "..."],
  "requiredDocuments": ["Aadhaar card", "..."],
  "eligibleRoles": ["farmer"],
  "tags": ["agriculture", "direct benefit transfer"],
  "ageRange": null,
  "incomeLimit": "2 hectares land ownership",
  "applicationProcess": "Apply through CSC or online portal",
  "officialWebsite": "https://pmkisan.gov.in/",
  "source_url": "https://example.com/pmkisan",
  "raw_data": { ... },
  "processed_data": { ... },
  "created_at": "2025-11-29T10:30:00",
  "processed_at": "2025-11-29T10:30:05"
}
```

### 4. User Interaction (Chat Bot)
**File**: `app/routes/ai_routes.py` - `/chat` endpoint

When users ask questions:

1. **Fetch processed schemes** from database
2. **Send to Groq** with user query + scheme data
3. **Groq analyzes** structured data and generates accurate answers
4. **Return response** in Hindi (or English if requested)

**File**: `app/services/groq_service.py` - `answer_user_query()`

The bot:
- Uses comprehensive scheme context
- Provides accurate eligibility information
- Suggests relevant schemes based on user profile
- Guides step-by-step on how to apply
- Explains required documents and benefits

## API Endpoints

### Fetch New Schemes
```
POST /schemes/fetch
```
Triggers the complete workflow: Exa → Groq → Database → Notifications

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

### Chat with AI
```
POST /chat
```
**Request:**
```json
{
  "message": "मैं एक किसान हूं, मेरे लिए कौन सी योजना है?",
  "user_id": "optional_user_id"
}
```

**Response:**
```json
{
  "response": "आपके लिए ये योजनाएं उपलब्ध हैं...",
  "schemes_count": 15,
  "data_source": "processed_schemes_database"
}
```

### Get Scheme Details
```
GET /schemes/{scheme_id}
```
Returns complete scheme information

### Get All Schemes
```
GET /schemes
```
Returns all available schemes

## Data Flow Diagram

```
┌─────────┐
│   Exa   │  Scrapes web data once
└────┬────┘
     │ Raw data (title, description, url)
     ▼
┌─────────┐
│  Groq   │  Processes into structured JSON
└────┬────┘
     │ Structured JSON
     ▼
┌─────────┐
│ MongoDB │  Stores both raw & processed data
└────┬────┘
     │
     ├──────────────┐
     ▼              ▼
┌─────────┐   ┌──────────┐
│  Chat   │   │  Notify  │
│  Bot    │   │  Users   │
└─────────┘   └──────────┘
```

## Key Improvements

### 1. **One-time Scraping**
- Exa scrapes data only once per scheme
- Checks for duplicates using `source_url`
- No redundant API calls

### 2. **Proper JSON Structure**
- Groq extracts comprehensive structured data
- All fields are properly typed and validated
- Fallback handling for missing data

### 3. **Data Persistence**
- Stores both raw and processed data
- Audit trail with timestamps
- Easy to track data quality

### 4. **Intelligent Answers**
- Bot uses structured data for accurate responses
- Context-aware recommendations
- Step-by-step guidance

## Environment Variables Required

```env
EXA_API_KEY=your_exa_api_key
GROQ_API_KEY=your_groq_api_key
MONGODB_URL=your_mongodb_connection_string
```

## Running the Workflow

1. **Start the backend server:**
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. **Trigger scheme fetching:**
   ```bash
   curl -X POST http://localhost:8000/schemes/fetch
   ```

3. **Chat with the bot:**
   ```bash
   curl -X POST http://localhost:8000/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "किसान योजनाएं बताओ"}'
   ```

## Monitoring & Debugging

- Check console logs during scheme fetching
- Review `raw_data` and `processed_data` fields in MongoDB
- Monitor Groq API responses for quality
- Track scheme counts and categories

## Future Enhancements

1. **Scheduled Updates**: Add cron job to fetch new schemes weekly
2. **Data Validation**: Add more robust validation for processed data
3. **Cache Layer**: Cache frequently accessed schemes
4. **Analytics**: Track which schemes users ask about most
5. **Multi-language**: Support for regional languages
6. **User Preferences**: Personalized scheme recommendations

## Support

For issues or questions, check:
- API logs in terminal
- MongoDB collections for data integrity
- Groq API documentation for processing improvements
