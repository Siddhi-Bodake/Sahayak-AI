# Sahayak AI Backend

Backend for Sahayak AI - Financial Assistant for Rural India using FastAPI, MongoDB Atlas, Exa API, Groq API, and WhatsApp Cloud API.

## Setup

1. Create virtual environment:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables in `.env`:
   ```
   MONGO_URI=your_mongo_atlas_connection_string
   EXA_API_KEY=your_exa_api_key
   GROQ_API_KEY=your_groq_api_key
   WHATSAPP_TOKEN=your_whatsapp_cloud_api_token
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Endpoints


## Base URL : http://127.0.0.1:8000/

### Authentication

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "mobileno": "1234567890",
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

#### POST /auth/login
Login user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
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

#### GET /auth/me
Get current user information using JWT token.

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
  "mobileno": "1234567890",
  "role": "user",
  "language": "en",
  "created_at": "2023-11-28T19:00:00Z"
}
```

**Response (401):**
```json
{
  "detail": "Invalid token"
}
```

### Schemes

#### GET /schemes
Get all government schemes.

**Response (200):**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "title": "Pradhan Mantri Awas Yojana",
    "category": "Housing",
    "description": "Housing scheme for rural areas",
    "eligibility": "Income below 3 lakhs",
    "benefits": "Subsidized housing",
    "application_process": "Apply online",
    "source_url": "https://example.com",
    "is_new": false,
    "created_at": "2023-11-28T19:00:00Z"
  }
]
```

#### GET /schemes/{scheme_id}
Get specific scheme by ID.

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Pradhan Mantri Awas Yojana",
  "category": "Housing",
  "description": "Housing scheme for rural areas",
  "eligibility": "Income below 3 lakhs",
  "benefits": "Subsidized housing",
  "application_process": "Apply online",
  "source_url": "https://example.com",
  "is_new": false,
  "created_at": "2023-11-28T19:00:00Z"
}
```

**Response (404):**
```json
{
  "detail": "Scheme not found"
}
```

#### POST /schemes/fetch
Manually trigger scheme fetching from Exa API.

**Response (200):**
```json
{
  "message": "Schemes fetched and stored"
}
```

### AI

#### POST /ai/scheme-info/{scheme_id}
Get AI-powered explanation of a scheme.

**Response (200):**
```json
{
  "explanation": "This scheme provides subsidized housing for rural families with income below 3 lakhs. To apply, visit the official website and fill the online form with your Aadhaar details."
}
```

**Response (404):**
```json
{
  "detail": "Scheme not found"
}
```

### Notifications

#### GET /notifications/{user_id}
Get all notifications for a user.

**Response (200):**
```json
[
  {
    "id": "507f1f77bcf86cd799439012",
    "user_id": "507f1f77bcf86cd799439011",
    "message": "New schemes available: 5",
    "type": "scheme_update",
    "created_at": "2023-11-28T19:00:00Z",
    "is_read": false
  }
]
```

## Features

- JWT Authentication with password hashing
- Scheduled scheme fetching every 6 hours using APScheduler
- AI-powered scheme explanations using Groq API
- WhatsApp notifications for new schemes using WhatsApp Cloud API
- Multilingual support (English, Hindi, Marathi)
- MongoDB Atlas integration with Motor async driver

## Models

### User
- id: str
- name: str
- email: EmailStr
- password: str (hashed)
- mobileno: str
- role: str (default: "user")
- language: str (default: "en")
- created_at: datetime

### Scheme
- id: str
- title: str
- category: str (optional)
- description: str (optional)
- eligibility: str (optional)
- benefits: str (optional)
- application_process: str (optional)
- source_url: str (optional)
- is_new: bool (default: true)
- created_at: datetime

### Notification
- id: str
- user_id: str
- message: str
- type: str (default: "scheme_update")
- created_at: datetime
- is_read: bool (default: false)