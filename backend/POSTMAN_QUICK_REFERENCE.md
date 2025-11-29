# 🎯 Postman Quick Reference Card

## ⚡ 3-Minute Quick Start

```bash
# 1. Start Backend
cd backend && uvicorn app.main:app --reload

# 2. Import Collection
Postman → Import → Sahayak_AI_Postman_Collection.json

# 3. Run First Request
POST /schemes/fetch → Send → Wait 60 sec

# 4. Test Chat
POST /chat → Send → Get answer!
```

---

## 📋 All 9 Requests at a Glance

| # | Request | Method | Endpoint | Purpose | Time |
|---|---------|--------|----------|---------|------|
| 1 | Fetch Schemes | POST | `/schemes/fetch` | Exa→Groq→DB | 30-60s |
| 2 | Get All Schemes | GET | `/schemes` | List all | <1s |
| 3 | Get One Scheme | GET | `/schemes/{id}` | Single scheme | <1s |
| 4 | Chat Farmer | POST | `/chat` | Hindi farmer query | 2-5s |
| 5 | Chat Student | POST | `/chat` | Hindi student query | 2-5s |
| 6 | Chat Startup | POST | `/chat` | English business query | 2-5s |
| 7 | Chat General | POST | `/chat` | List all schemes | 2-5s |
| 8 | Chat Eligibility | POST | `/chat` | Age/status check | 2-5s |
| 9 | Explanation | POST | `/scheme-info/{id}` | Hindi explanation | 1-3s |

---

## 🔧 Collection Variables

Set in: **Collection → Variables tab**

| Variable | Example Value | Used In |
|----------|--------------|---------|
| `base_url` | `http://localhost:8000` | All requests |
| `scheme_id` | `674a1b2c3d4e5f6g7h8i9j0k` | Requests 3, 9 |

---

## 📝 Request Bodies Cheat Sheet

### Farmer Query
```json
{"message": "मैं किसान हूं। मेरे पास 1.5 हेक्टेयर जमीन है।"}
```

### Student Query
```json
{"message": "मैं छात्र हूं। छात्रवृत्ति चाहिए।"}
```

### Business Query
```json
{"message": "I want to start a business. What schemes?"}
```

### Age Query
```json
{"message": "मैं 25 साल का हूं, बेरोजगार हूं।"}
```

### Document Query
```json
{"message": "PM-KISAN के लिए कौन से दस्तावेज चाहिए?"}
```

### General List
```json
{"message": "सभी योजनाओं की सूची बताओ"}
```

---

## ✅ Expected Status Codes

| Status | Meaning | Action |
|--------|---------|--------|
| 200 OK | ✅ Success | Continue |
| 404 Not Found | ❌ Invalid ID | Check scheme_id |
| 500 Error | ❌ Server issue | Check backend logs |

---

## 🎯 Testing Order

```
1. Fetch Schemes (REQUIRED FIRST!)
   ↓
2. Get All Schemes (verify data)
   ↓
3. Copy a scheme ID
   ↓
4. Set scheme_id variable
   ↓
5. Test Get Single Scheme
   ↓
6. Test Chat requests (any order)
   ↓
7. Test Explanation
```

---

## 🔍 Key Response Fields

### Fetch Response
```json
{
  "details": {
    "total_scraped": 10,        ← Exa results
    "new_schemes_added": 5,     ← Added to DB
    "schemes": [...]            ← New schemes
  }
}
```

### Scheme Object
```json
{
  "id": "...",
  "name": "Scheme name",
  "category": "agriculture|business|pension|education|housing|general",
  "eligibility": [...],
  "benefits": [...],
  "requiredDocuments": [...],
  "applicationProcess": "How to apply",
  "officialWebsite": "URL"
}
```

### Chat Response
```json
{
  "response": "AI answer",
  "schemes_count": 15,
  "data_source": "processed_schemes_database"
}
```

---

## 🐛 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Connection refused | Start backend: `uvicorn app.main:app --reload` |
| schemes_count is 0 | Run Request 1 first |
| 404 on scheme_id | Update variable with valid ID |
| Slow response | Normal for Groq processing (2-5s) |
| Empty response | Check backend logs |

---

## 💡 Pro Tips

- ✅ Always run **Request 1** first
- ✅ Use **Pretty** view for responses
- ✅ **Save responses** for comparison
- ✅ Check **Console** for debugging
- ✅ Duplicate requests to test variations

---

## 📊 Response Time Guide

```
Normal:
POST /schemes/fetch → 30-60 seconds
POST /chat         → 2-5 seconds
GET  /schemes      → <1 second

Too Slow:
POST /chat → >10 seconds ← Check API keys
GET /schemes → >5 seconds ← Check MongoDB
```

---

## 🎨 Example Conversations

### Conversation 1: Farmer
```
Q: "मैं किसान हूं। मेरे लिए कौन सी योजना है?"
A: PM-KISAN details (eligibility, benefits, docs)

Q: "आवेदन कैसे करें?"
A: Step-by-step application process

Q: "कौन से दस्तावेज चाहिए?"
A: Aadhaar, bank details, land documents
```

### Conversation 2: Student
```
Q: "मुझे छात्रवृत्ति चाहिए"
A: Education schemes list

Q: "क्या मुझे मिल सकती है?"
A: Eligibility check based on profile
```

---

## 📂 File Locations

```
backend/
├── Sahayak_AI_Postman_Collection.json  ← Import this
├── POSTMAN_TESTING_GUIDE.md            ← Detailed guide
├── POSTMAN_VISUAL_GUIDE.md             ← Visual guide
├── API_WORKFLOW_GUIDE.md               ← API docs
└── POSTMAN_QUICK_REFERENCE.md          ← This file
```

---

## 🚀 Complete Test Flow (2 Minutes)

```bash
# Terminal 1: Start Backend
cd backend
uvicorn app.main:app --reload

# Postman:
1. Import collection                  (10 sec)
2. POST /schemes/fetch                (60 sec)
3. POST /chat (farmer query)          (5 sec)
4. POST /chat (student query)         (5 sec)
5. GET /schemes                       (1 sec)

Total: ~90 seconds ✅
```

---

## 🎯 Success Checklist

- [ ] Collection imported
- [ ] Backend running (port 8000)
- [ ] Request 1 returned 5+ schemes
- [ ] Chat returns Hindi answer
- [ ] English query works
- [ ] scheme_id variable set
- [ ] Single scheme retrieval works
- [ ] Explanation returns Hindi text

**All checked? You're ready to go! 🎉**

---

## 📞 Quick Help

**Backend not responding?**
```bash
lsof -i :8000  # Check if port is in use
pkill -f uvicorn  # Kill old process
uvicorn app.main:app --reload  # Restart
```

**Need scheme IDs?**
```bash
# Run in Postman:
GET /schemes

# Copy any "id" field from response
```

**Want to test custom query?**
```json
// Modify message in any chat request:
{
  "message": "Your custom question here"
}
```

---

**Keep this reference handy while testing!** 📌
