# Groq API Error Troubleshooting Guide

## Problem: Chat Returns Error Message

When testing the chat endpoint, you're getting:
```json
{
  "response": "क्षमा करें, आपका प्रश्न संसाधित करने में समस्या हुई है। कृपया पुनः प्रयास करें।",
  "schemes_count": 19,
  "cached": true
}
```

This means the Groq API is returning an error, not a valid response.

## Common Causes & Solutions

### 1. Invalid or Missing API Key

**Check:**
```bash
cd /Users/siddhii/Desktop/Sahayak-AI/backend
grep "^groq_api_key=" .env
```

**Solution:**
- Get a valid API key from https://console.groq.com
- Update `.env` file:
  ```
  groq_api_key=gsk_YOUR_ACTUAL_API_KEY_HERE
  ```
- Restart server

### 2. API Key Quota Exceeded

**Symptoms:**
- Worked before, now returns errors
- Error message about rate limits

**Solution:**
- Check Groq dashboard for usage limits
- Wait for quota reset (usually monthly)
- Or upgrade your Groq plan

### 3. Token Context Length Exceeded

**What we fixed:**
- Reduced schemes from 19 to max 10 per request
- Shortened prompt to avoid 8192 token limit

**If still failing:**
Edit `/app/services/groq_service.py` line 143:
```python
limited_schemes = schemes_data[:5]  # Reduce to 5 schemes
```

### 4. Groq API Service Down

**Check:**
```bash
curl https://api.groq.com/openai/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Solution:**
- Check https://status.groq.com
- Wait for service restoration

### 5. Network/Firewall Issues

**Check:**
```bash
ping api.groq.com
```

**Solution:**
- Check firewall settings
- Verify internet connection
- Try different network

## How to Start Server Properly

### Method 1: Using Startup Script (Recommended)
```bash
cd /Users/siddhii/Desktop/Sahayak-AI/backend
./start_server.sh
```

### Method 2: Manual Start
```bash
cd /Users/siddhii/Desktop/Sahayak-AI/backend
venv/bin/python -m uvicorn app.main:app --reload --port 8001
```

### Method 3: With Virtual Environment
```bash
cd /Users/siddhii/Desktop/Sahayak-AI/backend
source venv/bin/activate  # On macOS/Linux
# OR
venv\\Scripts\\activate   # On Windows

uvicorn app.main:app --reload --port 8001
```

## Testing the Fix

### Step 1: Check Server is Running
```bash
curl http://127.0.0.1:8001/
# Should return: {"message":"Welcome to Sahayak AI API"}
```

### Step 2: Test Cache Status
```bash
curl http://127.0.0.1:8001/ai/cache/stats
# Should return cache info
```

### Step 3: Test Simple Chat
```bash
curl -X POST http://127.0.0.1:8001/ai/chat/public \
  -H "Content-Type: application/json" \
  -d '{"message": "hello"}'
```

**Expected (Success):**
```json
{
  "response": "नमस्ते! मैं सहायक AI हूं...",
  "schemes_count": 10,
  "cached": true
}
```

**If Error:**
Check server logs for:
```
Groq API Error Response: {...}
Error message: ...
```

### Step 4: View Detailed Logs
```bash
# In backend directory, check console output
# Or redirect to file:
venv/bin/python -m uvicorn app.main:app --reload --port 8001 2>&1 | tee server.log
```

## Debug Mode

To see detailed error messages, add logging to `groq_service.py`:

```python
# At top of file
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# In answer_user_query function, before the API call:
logger.debug(f"Sending to Groq: {len(user_prompt)} chars")
logger.debug(f"Schemes count: {len(limited_schemes)}")

# After API call:
logger.debug(f"Groq response: {result}")
```

## Quick Fixes Applied

### ✅ Reduced Token Usage
- Limited to 10 schemes per query (was 19)
- Shortened prompt format
- Reduced max_tokens to 800

### ✅ Added Error Handling
- Catch exceptions in API calls
- Log detailed error messages
- Return helpful error text

### ✅ Improved Performance
- Cache schemes for 30 minutes
- Reduce DB queries
- Faster response times

## Verify API Key is Working

Test Groq API directly:
```bash
curl https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3-8b-8192",
    "messages": [{"role": "user", "content": "Say hello"}],
    "max_tokens": 50
  }'
```

**Expected:**
```json
{
  "choices": [{
    "message": {
      "content": "Hello! How can I help you today?"
    }
  }]
}
```

**If error:**
- API key invalid → Get new key from Groq console
- Rate limit → Wait or upgrade plan
- Invalid model → Check model name is correct

## Environment Variables Required

Your `.env` should have:
```bash
mongo_uri=mongodb://localhost:27017/sahayak_ai
exa_api_key=your_exa_key
groq_api_key=gsk_your_groq_key_here  # ← This one is critical!
chat_encryption_key=your_encryption_key
whatsapp_token=your_whatsapp_token
jwt_secret=your_jwt_secret
```

## Still Not Working?

1. **Check server console output** - Look for specific error messages
2. **Verify all dependencies installed**: `venv/bin/pip list | grep -E "groq|httpx|fastapi"`
3. **Test with minimal query**: `{"message": "hi"}`
4. **Try different Groq model**: Change `llama3-8b-8192` to `mixtral-8x7b-32768`
5. **Check MongoDB connection**: Ensure schemes are actually in DB

## Server Not Starting?

```bash
# Check if venv/bin/uvicorn exists
ls -la venv/bin/uvicorn

# If missing, reinstall:
venv/bin/pip install -r requirements.txt

# Check Python version
venv/bin/python --version
# Should be Python 3.8+
```

## Contact & Support

If issue persists:
1. Check Groq API status: https://status.groq.com
2. Review server logs carefully
3. Test API key with curl (shown above)
4. Ensure `.env` file is in `/backend/` directory
5. Verify MongoDB is running: `mongosh --eval "db.runCommand({ping:1})"`

---

**Remember:** The error message "संसाधित करने में समस्या" means Groq API is failing, NOT your code. Check API key and quota first!
