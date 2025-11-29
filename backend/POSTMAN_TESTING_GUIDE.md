# 🚀 Postman Testing Guide for Sahayak AI

## Quick Start

### Step 1: Import Collection

1. **Open Postman**
2. Click **Import** button (top left)
3. Select **File** tab
4. Choose `Sahayak_AI_Postman_Collection.json`
5. Click **Import**

✅ You should now see "Sahayak AI - Complete Workflow" collection with 9 requests!

---

## Step 2: Start Backend Server

```bash
cd /Users/siddhii/Desktop/Sahayak-AI/backend
uvicorn app.main:app --reload
```

Wait for:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

---

## Step 3: Test the Complete Workflow

### 🔵 Request 1: Fetch Schemes (MUST RUN FIRST!)

**Purpose**: Triggers Exa → Groq → Database pipeline

**Steps**:
1. Select **"1. Fetch Schemes (Exa → Groq → DB)"**
2. Click **Send**
3. Wait 30-60 seconds (it's processing multiple schemes)

**Expected Response**:
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
      }
    ]
  }
}
```

**What Happened**:
- ✅ Exa scraped 10 government schemes
- ✅ Each was processed by Groq into structured JSON
- ✅ All stored in MongoDB with raw_data + processed_data
- ✅ 5 new schemes were added

**Copy a scheme ID** from the response for later use!

---

### 🔵 Request 2: Get All Schemes

**Purpose**: View all processed schemes in database

**Steps**:
1. Select **"2. Get All Schemes"**
2. Click **Send**

**Expected Response**:
```json
[
  {
    "id": "674a1b2c3d4e5f6g7h8i9j0k",
    "name": "Pradhan Mantri Kisan Samman Nidhi",
    "category": "agriculture",
    "shortDescription": "Income support scheme...",
    "eligibility": ["Small farmers", "Up to 2 hectares"],
    "benefits": ["Rs 6,000 per year", "Direct transfer"],
    "requiredDocuments": ["Aadhaar", "Bank details"],
    "eligibleRoles": ["farmer"],
    "tags": ["agriculture", "PM-KISAN"],
    "applicationProcess": "Register through CSCs...",
    "officialWebsite": "https://pmkisan.gov.in/"
  }
]
```

**Notice**: All fields are properly structured (thanks to Groq processing)!

---

### 🔵 Request 3: Get Single Scheme by ID

**Purpose**: Get details of one specific scheme

**Steps**:
1. Copy an `id` from Request 2 response
2. In Postman, go to **Collection Variables** (click collection → Variables tab)
3. Set `scheme_id` value to the copied ID
4. Select **"3. Get Single Scheme by ID"**
5. Click **Send**

**Expected Response**: Same as one scheme from Request 2

**If you get 404**: The ID is invalid or scheme doesn't exist

---

### 🔵 Request 4: Chat - Farmer Query (Hindi)

**Purpose**: Test chatbot with farmer query in Hindi

**Steps**:
1. Select **"4. Chat - Farmer Query (Hindi)"**
2. Click **Send**

**Request Body** (already set):
```json
{
  "message": "मैं एक किसान हूं और मेरे पास 1.5 हेक्टेयर जमीन है। मेरे लिए कौन सी योजना है?",
  "user_id": "test_user_farmer_123"
}
```

**Expected Response**:
```json
{
  "response": "आपके लिए PM-KISAN योजना उपयुक्त है।\n\n**पात्रता**: आप पात्र हैं...\n\n**लाभ**:\n- साल में ₹6,000\n- तीन किस्तों में\n\n**आवश्यक दस्तावेज**:\n- आधार कार्ड\n- बैंक खाता\n\n**आवेदन**: CSC या https://pmkisan.gov.in/",
  "schemes_count": 15,
  "data_source": "processed_schemes_database"
}
```

**What Happened**:
- ✅ Bot fetched all schemes from database
- ✅ Sent user query + schemes to Groq
- ✅ Groq analyzed: user is farmer with 1.5 hectares
- ✅ Matched with PM-KISAN (eligible up to 2 hectares)
- ✅ Returned detailed answer in Hindi

---

### 🔵 Request 5: Chat - Student Query (Hindi)

**Purpose**: Test chatbot with student query

**Steps**:
1. Select **"5. Chat - Student Query (Hindi)"**
2. Click **Send**

**Request Body**:
```json
{
  "message": "मैं एक छात्र हूं। मुझे छात्रवृत्ति चाहिए। कौन सी योजना है?",
  "user_id": "test_user_student_456"
}
```

**Expected Response**: Education category schemes with scholarship details

---

### 🔵 Request 6: Chat - Startup Query (English)

**Purpose**: Test English language support

**Steps**:
1. Select **"6. Chat - Startup Query (English)"**
2. Click **Send**

**Request Body**:
```json
{
  "message": "I want to start a business. What schemes are available for startups in India?",
  "user_id": "test_user_entrepreneur_789"
}
```

**Expected Response**: Business schemes in English (Startup India, MUDRA, etc.)

**What Happened**:
- ✅ Bot detected English language
- ✅ Found business category schemes
- ✅ Responded in English

---

### 🔵 Request 7: Chat - General Query

**Purpose**: List all schemes

**Steps**:
1. Select **"7. Chat - General Query"**
2. Click **Send**

**Request Body**:
```json
{
  "message": "सभी उपलब्ध योजनाओं की सूची बताओ"
}
```

**Expected Response**: Overview of all schemes grouped by category

---

### 🔵 Request 8: Chat - Eligibility Check

**Purpose**: Test with age and employment status

**Steps**:
1. Select **"8. Chat - Eligibility Check"**
2. Click **Send**

**Request Body**:
```json
{
  "message": "मैं 25 साल का हूं, बेरोजगार हूं। मेरे लिए कौन सी योजना है?"
}
```

**Expected Response**: Schemes for unemployed youth with age matching

---

### 🔵 Request 9: Get Scheme Explanation (Hindi)

**Purpose**: Get simple Hindi explanation of a scheme

**Steps**:
1. Make sure `scheme_id` is set in Collection Variables
2. Select **"9. Get Scheme Explanation (Hindi)"**
3. Click **Send**

**Expected Response**:
```json
{
  "explanation": "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN) भारत सरकार की एक महत्वपूर्ण योजना है...\n\nइस योजना के तहत:\n- पात्र किसान परिवारों को हर साल ₹6,000 की वित्तीय सहायता मिलती है\n- यह राशि तीन बराबर किस्तों में दी जाती है..."
}
```

---

## 🎯 Testing Checklist

- [ ] Backend server running on port 8000
- [ ] Postman collection imported
- [ ] Request 1 executed successfully (schemes fetched)
- [ ] Request 2 shows schemes in database
- [ ] Request 3 retrieves single scheme
- [ ] Request 4 (Farmer Hindi) gets proper response
- [ ] Request 5 (Student Hindi) works
- [ ] Request 6 (Startup English) works
- [ ] Request 7 (General) lists schemes
- [ ] Request 8 (Eligibility) matches criteria
- [ ] Request 9 (Explanation) returns Hindi text

---

## 🔧 Customizing Requests

### Change Chat Message

1. Select any chat request (4-8)
2. Go to **Body** tab
3. Modify the `message` field
4. Click **Send**

**Example Custom Queries**:
```json
{"message": "मुझे घर खरीदना है। कौन सी योजना है?"}
{"message": "पेंशन योजना के बारे में बताओ"}
{"message": "What documents do I need for PM-KISAN?"}
{"message": "मैं 60 साल का हूं। मेरे लिए कौन सी योजना है?"}
```

### Test Different User IDs

Change `user_id` in request body:
```json
{
  "message": "Your query here",
  "user_id": "custom_user_xyz"
}
```

---

## 📊 Understanding Responses

### Fetch Schemes Response

```json
{
  "message": "Success message",
  "details": {
    "total_scraped": 10,      // Exa found 10 results
    "new_schemes_added": 5,   // 5 were new (not in DB)
    "schemes": [...]          // Array of new schemes
  }
}
```

### Chat Response

```json
{
  "response": "AI answer in Hindi/English",
  "schemes_count": 15,                        // Total schemes in DB
  "data_source": "processed_schemes_database" // Uses structured data
}
```

### Scheme Object Structure

```json
{
  "id": "Unique ID",
  "name": "Scheme name",
  "category": "agriculture|business|pension|education|housing|general",
  "shortDescription": "Brief description",
  "eligibility": ["Criterion 1", "Criterion 2"],
  "benefits": ["Benefit 1", "Benefit 2"],
  "requiredDocuments": ["Doc 1", "Doc 2"],
  "eligibleRoles": ["farmer", "student", etc.],
  "tags": ["tag1", "tag2"],
  "ageRange": "Age criteria or null",
  "incomeLimit": "Income limit or null",
  "applicationProcess": "How to apply",
  "officialWebsite": "Official URL",
  "source_url": "Where Exa scraped from",
  "created_at": "Timestamp",
  "processed_at": "Timestamp"
}
```

---

## 🐛 Troubleshooting

### Error: Connection Refused
**Problem**: Backend not running
**Solution**: 
```bash
cd backend
uvicorn app.main:app --reload
```

### Error: Schemes count is 0
**Problem**: Database is empty
**Solution**: Run Request 1 (Fetch Schemes) first

### Error: 404 Scheme not found
**Problem**: Invalid scheme_id
**Solution**: 
1. Run Request 2 to get valid IDs
2. Update `scheme_id` in Collection Variables

### Error: Groq API failed
**Problem**: GROQ_API_KEY not configured
**Solution**: 
```bash
# In backend/.env
GROQ_API_KEY=your_actual_api_key
```

### Error: Exa API failed
**Problem**: EXA_API_KEY not configured
**Solution**:
```bash
# In backend/.env
EXA_API_KEY=your_actual_api_key
```

### Response is in wrong language
**Problem**: Bot language detection
**Solution**: Be explicit in your query:
```json
{"message": "Please answer in English: what schemes are available?"}
```

---

## 🎨 Postman Tips

### Save Responses
1. Click **Save Response** after each request
2. Create examples for different scenarios
3. Compare responses over time

### Use Tests Tab
Add test scripts to validate responses:

```javascript
// Test for successful response
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test for schemes count
pm.test("Response has schemes", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.schemes_count).to.be.above(0);
});
```

### Create Environment
1. Click **Environments** → **Create Environment**
2. Name it "Sahayak AI - Local"
3. Add variables:
   - `base_url`: `http://localhost:8000`
   - `scheme_id`: (copy from responses)
   - `user_id`: `test_user_123`

### Run Collection
1. Click collection → **Run**
2. Select all requests
3. Click **Run Sahayak AI**
4. Watch all tests execute in sequence!

---

## 📈 Monitoring Workflow

### Check Console Logs

While running requests, watch backend console for:

```
Step 1: Scraping data with Exa...
Step 2: Processing scheme with Groq: PM-KISAN
Step 3: Storing scheme in database: PM-KISAN
✓ Successfully processed and stored: PM-KISAN
```

### Verify in MongoDB

```bash
# Connect to MongoDB
mongosh

# Use your database
use sahayak_ai

# Check schemes
db.schemes.find().pretty()

# Count schemes
db.schemes.countDocuments()

# Check a scheme's raw_data and processed_data
db.schemes.findOne({}, {raw_data: 1, processed_data: 1})
```

---

## 🎯 Success Indicators

✅ Request 1: Returns 5-10 new schemes  
✅ Request 2: Shows array with full scheme objects  
✅ Request 4: Hindi response with scheme details  
✅ Request 6: English response for business schemes  
✅ Backend console shows processing steps  
✅ MongoDB has schemes with `processed_data` field  

---

## 🚀 Next Steps

1. **Test with real queries**: Try your own questions
2. **Verify data quality**: Check if Groq extracted fields correctly
3. **Test edge cases**: Very long queries, mixed language, etc.
4. **Monitor performance**: Note response times
5. **Check MongoDB**: Verify raw_data vs processed_data

---

## 📞 Support

If you encounter issues:

1. Check backend logs in terminal
2. Verify environment variables (.env file)
3. Confirm MongoDB is running
4. Test individual API endpoints
5. Review `API_WORKFLOW_GUIDE.md` for details

---

**Happy Testing! 🎉**

Remember: Always run **Request 1 (Fetch Schemes)** first to populate the database!
