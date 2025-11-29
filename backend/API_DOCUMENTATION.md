# Sahayak AI Backend API Documentation

## Base URL
```
http://127.0.0.1:8001
```

## Authentication
Most endpoints require JWT token in Authorization header: `Bearer <token>`

---

## Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /auth/register`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "mobileno": "+919876543210",
  "language": "en"
}
```

**Response (200):**
```json
{
  "message": "User registered successfully"
}
```

**Response (400):**
```json
{
  "detail": "Email already registered"
}
```

### 2. Login User
**Endpoint:** `POST /auth/login`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer"
}
```

**Response (401):**
```json
{
  "detail": "Invalid credentials"
}
```

### 3. Get Current User Info
**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "mobileno": "+919876543210",
  "role": "user",
  "language": "en",
  "created_at": "2023-01-01T00:00:00Z"
}
```

---

## Scheme Endpoints

### 1. Get All Schemes
**Endpoint:** `GET /schemes`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "title": "Pradhan Mantri Jan Dhan Yojana",
    "category": "Banking",
    "description": "Financial inclusion scheme",
    "eligibility": "All Indian citizens",
    "benefits": "Zero balance account, insurance coverage",
    "application_process": "Visit bank with ID proof",
    "source_url": "https://pmjdy.gov.in",
    "is_new": true,
    "created_at": "2023-01-01T00:00:00Z"
  }
]
```

### 2. Get Scheme by ID
**Endpoint:** `GET /schemes/{scheme_id}`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Pradhan Mantri Jan Dhan Yojana",
  "category": "Banking",
  "description": "Financial inclusion scheme",
  "eligibility": "All Indian citizens",
  "benefits": "Zero balance account, insurance coverage",
  "application_process": "Visit bank with ID proof",
  "source_url": "https://pmjdy.gov.in",
  "is_new": true,
  "created_at": "2023-01-01T00:00:00Z"
}
```

**Response (404):**
```json
{
  "detail": "Scheme not found"
}
```

### 3. Fetch New Schemes
**Endpoint:** `POST /schemes/fetch`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "message": "Schemes fetched and stored"
}
```

---

## AI Endpoints (Powered by Google Gemini AI)

### 1. Get Scheme Explanation
**Endpoint:** `POST /ai/scheme-info/{scheme_id}`

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**AI Processing:** Uses Google Gemini AI with scheme name and short description to generate detailed explanation in English.

**Response (200):**
```json
{
  "explanation": "The Pradhan Mantri Jan Dhan Yojana is a financial inclusion scheme that provides zero balance bank accounts to unbanked citizens. This scheme aims to ensure that every Indian has access to banking services, insurance, and pension schemes. It helps people open bank accounts without any minimum balance requirement and provides them with Rupay debit cards, accident insurance coverage, and life insurance coverage."
}
```

**Response (404):**
```json
{
  "detail": "Scheme not found"
}
```

### 2. Chat with AI Assistant
**Endpoint:** `POST /ai/chat`

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Tell me about Jan Dhan Yojana scheme"
}
```

**AI Processing:** Sends only scheme names and short descriptions to Google Gemini AI for accurate, concise responses.

**Response (200):**
```json
{
  "response": "Pradhan Mantri Jan Dhan Yojana is a financial inclusion scheme...",
  "schemes_count": 25,
  "data_source": "processed_schemes_database",
  "cached": true,
  "user": {
    "name": "John Doe",
    "role": "farmer"
  }
}
```

### 3. Public Chat with AI Assistant
**Endpoint:** `POST /ai/chat/public`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "What government schemes are available for farmers?"
}
```

**AI Processing:** Sends only scheme names and short descriptions to Google Gemini AI for accurate, concise responses.

**Response (200):**
```json
{
  "response": "Several government schemes are available for farmers including...",
  "schemes_count": 25,
  "data_source": "processed_schemes_database",
  "cached": true
}
```

---

## Notification Endpoints

### 1. Get User Notifications
**Endpoint:** `GET /notifications/{user_id}`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
[
  {
    "user_id": "507f1f77bcf86cd799439011",
    "message": "New scheme: Pradhan Mantri Jan Dhan Yojana - Apply here: https://pmjdy.gov.in",
    "type": "scheme_update",
    "scheme_id": "507f1f77bcf86cd799439012",
    "created_at": "2023-01-01T00:00:00Z",
    "is_read": false
  }
]
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "detail": "Invalid token"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 400 Bad Request
```json
{
  "detail": "Validation error message"
}
```

---

## Testing Instructions

1. **Setup Environment:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Start the server:**
   ```bash
   ./start_server.sh
   # Or manually: uvicorn app.main:app --reload --port 8001
   ```

3. **Import Postman Collection:**
   - Import `POSTMAN_COLLECTION.json` into Postman
   - Set base_url variable to `http://127.0.0.1:8001`

4. **Test Flow:**
   - **Public Chat (No Auth):** POST `/ai/chat/public` with English questions
   - **Register User:** POST `/auth/register`
   - **Login:** POST `/auth/login` (saves auth_token automatically)
   - **Fetch Schemes:** POST `/schemes/fetch` (scrapes and processes data)
   - **Get Schemes:** GET `/schemes`
   - **Chat with Auth:** POST `/ai/chat` with English questions
   - **Check Notifications:** GET `/notifications/{user_id}`

5. **Sample Test Queries:**
   - "What government schemes are available for farmers?"
   - "Tell me about PM-KISAN scheme"
   - "What are the eligibility criteria for agricultural schemes?"