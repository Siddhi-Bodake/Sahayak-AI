#!/bin/bash

# Sahayak AI Backend Server Startup Script

cd "$(dirname "$0")"

echo "🚀 Starting Sahayak AI Backend Server..."
echo "📁 Working directory: $(pwd)"
echo ""

# Kill any existing server on port 8001
echo "🔍 Checking for existing server on port 8001..."
if lsof -ti:8001 > /dev/null 2>&1; then
    echo "⚠️  Killing existing server..."
    kill -9 $(lsof -ti:8001) 2>/dev/null
    sleep 2
fi

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found!"
    echo "Run: python3 -m venv venv && venv/bin/pip install -r requirements.txt"
    exit 1
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "Create .env with required API keys"
    exit 1
fi

# Start server
echo "✅ Starting server on http://127.0.0.1:8001"
echo ""
exec venv/bin/python -m uvicorn app.main:app --reload --port 8001
