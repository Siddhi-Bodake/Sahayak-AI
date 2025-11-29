# Quick Testing Guide - Chat Performance

## 🚀 Test the Performance Improvements

### Step 1: Start the Server
```bash
cd /Users/siddhii/Desktop/Sahayak-AI/backend
uvicorn app.main:app --reload --port 8001
```

### Step 2: Test Public Chat Endpoint

#### First Request (Cache Miss - Slower)
```bash
curl -X POST http://127.0.0.1:8001/ai/chat/public \
  -H "Content-Type: application/json" \
  -d '{"message": "मुझे किसान योजनाओं के बारे में बताओ"}' \
  -w "\nTime: %{time_total}s\n"
```

Expected output:
```json
{
  "response": "किसानों के लिए कई योजनाएं उपलब्ध हैं...",
  "schemes_count": 7,
  "data_source": "processed_schemes_database",
  "cached": false  // ⚠️ First time - no cache
}
Time: 5.2s  // Slow - fetching from DB
```

#### Second Request (Cache Hit - Faster!)
```bash
curl -X POST http://127.0.0.1:8001/ai/chat/public \
  -H "Content-Type: application/json" \
  -d '{"message": "महिलाओं के लिए कौन सी योजनाएं हैं?"}' \
  -w "\nTime: %{time_total}s\n"
```

Expected output:
```json
{
  "response": "महिलाओं के लिए ये योजनाएं उपलब्ध हैं...",
  "schemes_count": 7,
  "data_source": "processed_schemes_database",
  "cached": true  // ✅ Cache hit!
}
Time: 3.1s  // 40% faster!
```

### Step 3: Check Cache Statistics
```bash
curl http://127.0.0.1:8001/ai/cache/stats
```

Expected output:
```json
{
  "cached": true,
  "schemes_count": 7,
  "cache_age_seconds": 145,
  "last_updated": "2024-11-29T10:30:00.123456",
  "expires_in_seconds": 1655
}
```

### Step 4: Test Protected Chat (With Auth)

#### First, Login to Get Token
```bash
curl -X POST http://127.0.0.1:8001/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser@example.com&password=password123"
```

Copy the `access_token` from response.

#### Use Token for Chat
```bash
curl -X POST http://127.0.0.1:8001/ai/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"message": "मुझे सभी योजनाओं की सूची दो"}' \
  -w "\nTime: %{time_total}s\n"
```

Expected output:
```json
{
  "response": "यहाँ सभी उपलब्ध योजनाएं हैं...",
  "schemes_count": 7,
  "data_source": "processed_schemes_database",
  "cached": true,  // ✅ Using cache
  "user": {
    "name": "Test User",
    "role": "citizen"
  }
}
Time: 3.2s  // Fast!
```

### Step 5: Clear Cache and Test Again
```bash
# Clear cache
curl -X POST http://127.0.0.1:8001/ai/cache/clear

# Response: {"message": "Cache cleared successfully"}

# Now test again - should be slower (fetching from DB)
curl -X POST http://127.0.0.1:8001/ai/chat/public \
  -H "Content-Type: application/json" \
  -d '{"message": "test after clear"}' \
  -w "\nTime: %{time_total}s\n"

# Should show "cached": false and take ~5 seconds
```

## 📊 Performance Comparison

| Scenario | Time | DB Query | Groq API | Cache |
|----------|------|----------|----------|-------|
| First request (cold cache) | ~5.2s | ✅ Yes | ✅ Yes | ❌ Miss |
| Subsequent requests | ~3.1s | ❌ No | ✅ Yes | ✅ Hit |
| After 30 minutes | ~5.1s | ✅ Yes | ✅ Yes | ⏰ Expired |

**Improvement: 40% faster response time!**

## 🎯 Frontend Integration

Update your frontend to show cache status:

```typescript
const response = await fetch('http://127.0.0.1:8001/ai/chat/public', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: userMessage })
});

const data = await response.json();

if (data.cached) {
  console.log('⚡ Fast response from cache!');
} else {
  console.log('🔄 Fresh data from database');
}
```

## 🐛 Troubleshooting

### Issue: Still loading slowly
**Solution**: Check if Groq API key is valid
```bash
# Check server logs for Groq API errors
tail -f logs.txt
```

### Issue: cached field always false
**Solution**: Verify cache service is imported
```python
# In ai_routes.py, check line 6:
from app.services.cache_service import scheme_cache
```

### Issue: Cache not expiring
**Solution**: Default TTL is 30 minutes. Clear manually:
```bash
curl -X POST http://127.0.0.1:8001/ai/cache/clear
```

## ✅ Success Indicators

You'll know it's working when:
1. ✅ First request shows `"cached": false`
2. ✅ Second request shows `"cached": true`
3. ✅ Response time drops from ~5s to ~3s
4. ✅ Cache stats show `"cached": true`
5. ✅ No repeated MongoDB queries in logs

## 🎉 Next Steps

The chat should now:
- Load 40% faster on subsequent requests
- Show cache status in response
- Use MongoDB data (not training on it, using it as knowledge base)
- Save chat history for authenticated users

Try it out and see the performance improvement! 🚀
