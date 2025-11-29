"""
Test Script for Sahayak AI Gemini Integration
This demonstrates the scheme explanation functionality using Google Gemini AI
"""

import asyncio
import json
from app.core.database import schemes_collection
from app.services.gemini_service import get_scheme_explanation_gemini, answer_user_query_gemini

async def test_gemini_scheme_explanation():
    """
    Test the scheme explanation functionality using Gemini AI
    """
    print("=" * 80)
    print("TESTING GEMINI AI SCHEME EXPLANATION FUNCTIONALITY")
    print("=" * 80)

    try:
        # Get a scheme from the database
        scheme = await schemes_collection.find_one()
        if not scheme:
            print("❌ No schemes found in database. Please run scraping first.")
            return

        print(f"📋 Testing with scheme: {scheme.get('name', 'Unknown')}")

        # Test scheme explanation
        print("\n🔄 Generating explanation with Gemini AI...")
        explanation = await get_scheme_explanation_gemini(scheme)

        print("\n✅ Gemini AI Response:")
        print("-" * 50)
        print(explanation)
        print("-" * 50)

        # Test chat functionality
        print("\n💬 Testing chat functionality with Gemini AI...")
        test_question = "What government schemes are available for farmers?"
        chat_response = await answer_user_query_gemini(test_question, [scheme])

        print(f"\nQuestion: {test_question}")
        print("\n✅ Gemini AI Chat Response:")
        print("-" * 50)
        print(chat_response)
        print("-" * 50)

        print("\n🎉 Gemini AI integration test completed successfully!")

    except Exception as e:
        print(f"❌ Error during testing: {str(e)}")
        import traceback
        traceback.print_exc()

async def test_gemini_with_multiple_schemes():
    """
    Test with multiple schemes to see how Gemini handles larger context
    """
    print("\n" + "=" * 80)
    print("TESTING GEMINI AI WITH MULTIPLE SCHEMES")
    print("=" * 80)

    try:
        # Get multiple schemes
        schemes = await schemes_collection.find().to_list(5)
        if not schemes:
            print("❌ No schemes found in database.")
            return

        print(f"📋 Testing with {len(schemes)} schemes")

        test_question = "Can you tell me about agricultural schemes available?"
        print(f"\nQuestion: {test_question}")

        chat_response = await answer_user_query_gemini(test_question, schemes)

        print("\n✅ Gemini AI Multi-Scheme Response:")
        print("-" * 50)
        print(chat_response)
        print("-" * 50)

    except Exception as e:
        print(f"❌ Error during multi-scheme testing: {str(e)}")

async def main():
    """
    Main test function
    """
    print("🚀 Starting Gemini AI Functionality Tests")
    print("Make sure your .env file has GEMINI_API_KEY set")
    print()

    await test_gemini_scheme_explanation()
    await test_gemini_with_multiple_schemes()

    print("\n✨ All Gemini AI tests completed!")

if __name__ == "__main__":
    asyncio.run(main())