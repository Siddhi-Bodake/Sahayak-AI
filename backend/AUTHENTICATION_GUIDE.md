# 🔐 Authentication & Chat Guide

## The Problem You Identified ✅

You're absolutely correct! The old implementation had:
```json
{
  "message": "query",
  "user_id": "manual_id"  ← Redundant & insecure!
}
```

This was **wrong** because:
- ❌ User can fake their ID
- ❌ No authentication
- ❌ Redundant data

## The Fix 🎯

Now we have **two endpoints**:

### 1. **Protected Chat** (Recommended)
```
POST /chat
Authorization: Bearer <JWT_TOKEN>
```

**How it works:**
1. User logs in → gets JWT token
2. Token contains user_id
3. Send token in header
4. Backend extracts user from token
5. No need to pass user_id in body!

### 2. **Public Chat** (For testing/public access)
```
POST /chat/public
```

No authentication required - for public chatbot or testing.

---

## 🚀 How to Use

### Step 1: Login to Get Token

**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "674a1b2c3d4e5f6g7h8i9j0k",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "farmer"
  }
}
```

**Copy the `access_token`!**

---

### Step 2: Use Token in Chat (Protected)

**Endpoint:** `POST /chat`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:** (No user_id needed!)
```json
{
  "message": "मैं किसान हूं। मेरे लिए कौन सी योजना है?"
}
```

**Response:**
```json
{
  "response": "आपके लिए PM-KISAN योजना उपयुक्त है...",
  "schemes_count": 15,
  "data_source": "processed_schemes_database",
  "user": {
    "name": "John Doe",
    "role": "farmer"
  }
}
```

**What happened:**
- ✅ Backend verified JWT token
- ✅ Extracted user_id from token
- ✅ Saved chat history automatically
- ✅ Returned personalized response

---

### Step 3: Use Public Chat (No Auth)

**Endpoint:** `POST /chat/public`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "मैं किसान हूं। मेरे लिए कौन सी योजना है?"
}
```

**Response:**
```json
{
  "response": "आपके लिए PM-KISAN योजना उपयुक्त है...",
  "schemes_count": 15,
  "data_source": "processed_schemes_database"
}
```

**Use cases:**
- Testing without login
- Public-facing chatbot on landing page
- Demo purposes

---

## 📋 Postman Setup

### For Protected Chat (/chat)

1. **Login First:**
   ```
   POST /auth/login
   Body: {"email": "...", "password": "..."}
   ```

2. **Copy Token** from response

3. **Set in Postman:**
   - Go to request
   - Click **Authorization** tab
   - Type: **Bearer Token**
   - Token: Paste your token

4. **Send Chat Request:**
   ```json
   {
     "message": "Your query"
   }
   ```

### For Public Chat (/chat/public)

Just send request directly - no authentication needed!

---

## 🔄 Complete Flow

```
┌─────────────────────────────────────────────────────┐
│  User Registration/Login                             │
│  POST /auth/login                                   │
│  ↓                                                   │
│  Response: JWT Token                                │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  Protected Chat                                      │
│  POST /chat                                         │
│  Header: Authorization: Bearer <token>              │
│  Body: {"message": "query"}                         │
│  ↓                                                   │
│  Backend:                                           │
│  1. Verify token                                    │
│  2. Extract user_id from token                      │
│  3. Fetch schemes                                   │
│  4. Get AI response                                 │
│  5. Save chat history with user_id                  │
│  ↓                                                   │
│  Response: AI answer + user info                    │
└─────────────────────────────────────────────────────┘
```

---

## ✅ Benefits of This Approach

| Old Way | New Way |
|---------|---------|
| Manual user_id in body | Automatic from token |
| No authentication | JWT authentication |
| User can fake ID | Secure - can't fake token |
| No chat history | Auto-saved with user |
| No user context | Returns user info |

---

## 🧪 Testing Both Endpoints

### Test 1: Public Chat (Easy)
```bash
curl -X POST http://localhost:8000/chat/public \
  -H "Content-Type: application/json" \
  -d '{"message": "योजनाएं बताओ"}'
```

### Test 2: Protected Chat (Secure)
```bash
# First login
TOKEN=$(curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass"}' \
  | jq -r '.access_token')

# Then chat with token
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"message": "मैं किसान हूं"}'
```

---

## 🔐 Security Features

1. **JWT Token Expiration**: Tokens expire after set time
2. **Password Hashing**: Passwords stored securely with bcrypt
3. **Token Verification**: Every request validates token
4. **User Context**: Chat history linked to authenticated user
5. **No Manual IDs**: Can't fake user identity

---

## 📊 Chat History Tracking

With authentication, chat history is automatically saved:

```javascript
{
  "_id": ObjectId("..."),
  "user_id": "674a1b2c3d4e5f6g7h8i9j0k",  // From token
  "message": "मैं किसान हूं",
  "response": "आपके लिए PM-KISAN...",
  "timestamp": "2025-11-29T10:30:00Z"
}
```

**Get user's chat history:**
```
GET /chat/history
Authorization: Bearer <token>
```

---

## 🎯 Which Endpoint to Use?

### Use `/chat` (Protected) when:
- ✅ User is logged in
- ✅ Need to track chat history
- ✅ Want personalized responses
- ✅ Production application
- ✅ Security is important

### Use `/chat/public` when:
- ✅ Testing without login
- ✅ Public chatbot on website
- ✅ Demo/prototype
- ✅ No user tracking needed

---

## 🐛 Common Errors

### Error: 401 Unauthorized
```json
{"detail": "Invalid token"}
```
**Fix:** Login again to get fresh token

### Error: 404 User not found
```json
{"detail": "User not found"}
```
**Fix:** User was deleted, register again

### Error: Token expired
```json
{"detail": "Token has expired"}
```
**Fix:** Login again to get new token

---

## 💡 Pro Tips

1. **Store token** in frontend (localStorage/cookie)
2. **Auto-refresh** token before expiry
3. **Use interceptors** in axios to add token to all requests
4. **Handle 401** by redirecting to login
5. **Test with Postman** environment variables for token

---

## 📱 Frontend Integration Example

```javascript
// Login
const login = async (email, password) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  });
  const data = await response.json();
  localStorage.setItem('token', data.access_token);
  return data;
};

// Chat with auth
const chat = async (message) => {
  const token = localStorage.getItem('token');
  const response = await fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({message})
  });
  return response.json();
};

// Public chat (no auth)
const publicChat = async (message) => {
  const response = await fetch('/chat/public', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message})
  });
  return response.json();
};
```

---

**Summary:** You were 100% right - passing `user_id` manually was wrong! Now we have proper authentication with JWT tokens. 🎉
