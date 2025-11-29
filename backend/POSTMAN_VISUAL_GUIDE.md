# 📸 Postman Visual Testing Guide

## 🎯 Step-by-Step Screenshots Guide

### Step 1: Import Collection

```
┌─────────────────────────────────────────────────────────────┐
│  Postman → Import Button (Top Left)                         │
│                                                              │
│  [Import]  [New]  [Runner]                                  │
│     ↑                                                        │
│  Click Here                                                  │
│                                                              │
│  Then select: Sahayak_AI_Postman_Collection.json           │
└─────────────────────────────────────────────────────────────┘
```

**Result**: Collection appears in left sidebar with 9 requests

---

### Step 2: View Collection Structure

```
Collections
└── 📁 Sahayak AI - Complete Workflow
    ├── 1. Fetch Schemes (Exa → Groq → DB)        ← Start here!
    ├── 2. Get All Schemes
    ├── 3. Get Single Scheme by ID
    ├── 4. Chat - Farmer Query (Hindi)
    ├── 5. Chat - Student Query (Hindi)
    ├── 6. Chat - Startup Query (English)
    ├── 7. Chat - General Query
    ├── 8. Chat - Eligibility Check
    └── 9. Get Scheme Explanation (Hindi)
```

---

### Step 3: Set Environment Variables

```
┌─────────────────────────────────────────────────────────────┐
│  Click Collection → Variables Tab                           │
│                                                              │
│  VARIABLE        INITIAL VALUE           CURRENT VALUE      │
│  ─────────────────────────────────────────────────────────  │
│  base_url        http://localhost:8000  http://localhost:8000│
│  scheme_id       (empty)                (paste ID here)     │
│                                                              │
│  [Save]                                                      │
└─────────────────────────────────────────────────────────────┘
```

---

### Step 4: Request 1 - Fetch Schemes

```
┌─────────────────────────────────────────────────────────────┐
│  POST    {{base_url}}/schemes/fetch                         │
│  ──────────────────────────────────────────────────────────  │
│  Headers    Body    Params    Tests                         │
│                                                              │
│  Content-Type: application/json                             │
│                                                              │
│  [Send] ← Click                                             │
│                                                              │
│  ⏳ Wait 30-60 seconds for processing...                    │
└─────────────────────────────────────────────────────────────┘
```

**Expected Response Body**:
```json
{
  "message": "Schemes fetched and stored successfully",
  "details": {
    "total_scraped": 10,
    "new_schemes_added": 5,
    "schemes": [
      {
        "id": "674a1b2c3d4e5f6g7h8i9j0k",  ← Copy this!
        "title": "Pradhan Mantri Kisan Samman Nidhi",
        "url": "https://pmkisan.gov.in/",
        "category": "agriculture"
      }
    ]
  }
}
```

**Status**: `200 OK` ✅

---

### Step 5: Request 2 - Get All Schemes

```
┌─────────────────────────────────────────────────────────────┐
│  GET     {{base_url}}/schemes                               │
│  ──────────────────────────────────────────────────────────  │
│  [Send]                                                      │
│                                                              │
│  Response (Pretty | Raw | Preview)                          │
│  ──────────────────────────────────────────────────────────  │
│  [                                                           │
│    {                                                         │
│      "id": "674a1b2c3d4e5f6g7h8i9j0k",                      │
│      "name": "Pradhan Mantri Kisan Samman Nidhi",           │
│      "category": "agriculture",                             │
│      "eligibility": [                                       │
│        "Small and marginal farmer families",                │
│        "Combined land holding up to 2 hectares"             │
│      ],                                                      │
│      "benefits": [                                          │
│        "Rs 6,000 per year",                                 │
│        "Direct benefit transfer"                            │
│      ]                                                       │
│    }                                                         │
│  ]                                                           │
└─────────────────────────────────────────────────────────────┘
```

**Status**: `200 OK` ✅

**Notice**: All fields are structured (not raw text!)

---

### Step 6: Request 4 - Chat (Farmer Query)

```
┌─────────────────────────────────────────────────────────────┐
│  POST    {{base_url}}/chat                                  │
│  ──────────────────────────────────────────────────────────  │
│  Body: raw | JSON                                           │
│  {                                                           │
│    "message": "मैं एक किसान हूं और मेरे पास 1.5 हेक्टेयर    │
│                जमीन है। मेरे लिए कौन सी योजना है?",          │
│    "user_id": "test_user_farmer_123"                        │
│  }                                                           │
│                                                              │
│  [Send]                                                      │
└─────────────────────────────────────────────────────────────┘
```

**Expected Response**:
```json
{
  "response": "आपके लिए PM-KISAN (प्रधानमंत्री किसान सम्मान निधि) योजना उपयुक्त है।\n\n**पात्रता**: आप इस योजना के लिए पात्र हैं क्योंकि:\n- आप एक किसान हैं\n- आपके पास 1.5 हेक्टेयर जमीन है (योजना 2 हेक्टेयर तक की जमीन वाले किसानों के लिए है)\n\n**लाभ**:\n- साल में ₹6,000 की आर्थिक सहायता\n- यह राशि तीन किस्तों में मिलेगी\n\n**आवश्यक दस्तावेज**:\n- आधार कार्ड\n- बैंक खाता विवरण\n\n**आवेदन कैसे करें**:\n1. अपने नजदीकी CSC पर जाएं\n2. या PM-KISAN की वेबसाइट पर आवेदन करें",
  "schemes_count": 15,
  "data_source": "processed_schemes_database"
}
```

**Status**: `200 OK` ✅

---

### Step 7: Test Different Queries

**Modify the message field to test different scenarios:**

#### Test 1: Student Query
```json
{
  "message": "मैं एक छात्र हूं। छात्रवृत्ति चाहिए।"
}
```

#### Test 2: Business Query (English)
```json
{
  "message": "I want to start a business. What schemes are available?"
}
```

#### Test 3: Age-based Query
```json
{
  "message": "मैं 60 साल का हूं। पेंशन योजना बताओ।"
}
```

#### Test 4: Document Query
```json
{
  "message": "PM-KISAN के लिए कौन से दस्तावेज चाहिए?"
}
```

---

### Step 8: View Response in Different Formats

```
┌─────────────────────────────────────────────────────────────┐
│  Response Options:                                           │
│                                                              │
│  [Pretty]  [Raw]  [Preview]                                 │
│     ↑       ↑       ↑                                       │
│     │       │       └─ HTML preview (if applicable)         │
│     │       └───────── Raw JSON                             │
│     └───────────────── Formatted JSON (easiest to read)     │
└─────────────────────────────────────────────────────────────┘
```

**Choose "Pretty" for best readability!**

---

## 🎨 Color Coding in Postman

```
🟢 GET    - Retrieve data (no changes)
🟠 POST   - Create/trigger actions
🔵 PUT    - Update data
🔴 DELETE - Remove data
```

**Your Collection**:
- 🟠 POST `/schemes/fetch` - Triggers scraping
- 🟢 GET `/schemes` - View all
- 🟢 GET `/schemes/{id}` - View one
- 🟠 POST `/chat` - Chat with bot
- 🟠 POST `/scheme-info/{id}` - Get explanation

---

## 📋 Quick Testing Checklist UI

```
Testing Progress:
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  [ ] 1. Import collection                                   │
│  [ ] 2. Start backend server                                │
│  [ ] 3. Run "Fetch Schemes" (wait for completion)          │
│  [ ] 4. Copy scheme_id from response                        │
│  [ ] 5. Update collection variable                          │
│  [ ] 6. Test "Get All Schemes"                              │
│  [ ] 7. Test "Get Single Scheme"                            │
│  [ ] 8. Test "Chat - Farmer Query"                          │
│  [ ] 9. Test "Chat - Startup Query"                         │
│  [ ] 10. Test custom chat queries                           │
│                                                              │
│  All Done! ✅                                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 What to Look For

### ✅ Successful Request
```
Status: 200 OK
Time: 1234 ms
Size: 5.67 KB

Body:
{
  "response": "...",  ← Has data
  "schemes_count": 15  ← Count > 0
}
```

### ❌ Failed Request
```
Status: 500 Internal Server Error
Time: 234 ms

Body:
{
  "detail": "Groq API key not configured"  ← Error message
}
```

---

## 🎯 Response Status Meanings

```
┌──────┬────────────────────────────────────────────────┐
│ Code │ Meaning                                         │
├──────┼────────────────────────────────────────────────┤
│ 200  │ ✅ Success! Everything worked                  │
│ 400  │ ⚠️  Bad request (check your body/params)       │
│ 404  │ ❌ Not found (invalid scheme_id)               │
│ 422  │ ⚠️  Validation error (missing required field)  │
│ 500  │ ❌ Server error (check backend logs)           │
└──────┴────────────────────────────────────────────────┘
```

---

## 🧪 Advanced: Running Collection Tests

### Option 1: Collection Runner

```
┌─────────────────────────────────────────────────────────────┐
│  1. Click collection (Sahayak AI)                           │
│  2. Click "Run" button                                      │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Collection Runner                                     │  │
│  │                                                       │  │
│  │ [✓] 1. Fetch Schemes                                 │  │
│  │ [✓] 2. Get All Schemes                               │  │
│  │ [✓] 4. Chat - Farmer Query                           │  │
│  │ [✓] 6. Chat - Startup Query                          │  │
│  │                                                       │  │
│  │ [Run Sahayak AI] ← Click to run all selected        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Option 2: Command Line (Newman)

```bash
# Install Newman
npm install -g newman

# Run collection
newman run Sahayak_AI_Postman_Collection.json

# With environment
newman run Sahayak_AI_Postman_Collection.json \
  --env-var "base_url=http://localhost:8000"
```

---

## 📊 Understanding Response Times

```
Typical Response Times:

POST /schemes/fetch    → 30-60 seconds  (Exa + Groq processing)
GET  /schemes          → 100-300 ms     (Database query)
GET  /schemes/{id}     → 50-150 ms      (Single document)
POST /chat             → 2-5 seconds    (Groq AI processing)
POST /scheme-info/{id} → 1-3 seconds    (Groq explanation)
```

**If slower**: Check your internet, API keys, or backend performance

---

## 🎨 Customizing Postman

### Dark Mode
```
Settings (⚙️) → Themes → Dark
```

### Font Size
```
Settings (⚙️) → Editor → Font Size → 14px
```

### Auto-save
```
Settings (⚙️) → Data → Auto-save → ON
```

---

## 🐛 Common Issues & Fixes

### Issue 1: Request not sending
```
Problem: Button shows "Send" but nothing happens
Fix: Check if backend is running (should see logs in terminal)
```

### Issue 2: Variables not working
```
Problem: {{base_url}} shows as-is in URL
Fix: Make sure variable is defined in Collection Variables
     Click collection → Variables → Set base_url
```

### Issue 3: 404 on scheme_id
```
Problem: GET /schemes/{scheme_id} returns 404
Fix: 1. Run "Get All Schemes" first
     2. Copy a valid ID from response
     3. Update scheme_id in Collection Variables
```

### Issue 4: Empty schemes_count
```
Problem: Chat returns schemes_count: 0
Fix: Run "Fetch Schemes" first to populate database
```

---

## 💡 Pro Tips

1. **Save Responses**: Click "Save Response" to create examples
2. **Use Console**: View → Show Postman Console to see requests
3. **Duplicate Requests**: Right-click → Duplicate for variations
4. **Organize**: Create folders for different test scenarios
5. **Share**: Export and share collection with team

---

## 📹 Video Tutorial Structure

**If creating a video, follow this flow:**

```
00:00 - Introduction
00:30 - Import collection into Postman
01:00 - Set environment variables
02:00 - Start backend server
03:00 - Run "Fetch Schemes" request
04:30 - View response (explain fields)
05:00 - Run "Get All Schemes"
06:00 - Test chat with farmer query
07:00 - Test chat with English query
08:00 - Customize queries
09:00 - Troubleshooting tips
10:00 - Conclusion
```

---

**Ready to Test!** 🚀

Remember: 
1. Start backend first
2. Run "Fetch Schemes" before anything else
3. Copy scheme IDs for later use
4. Experiment with different chat queries!
