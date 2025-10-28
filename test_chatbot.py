#!/usr/bin/env python3
"""
Simple test script for the portfolio chatbot
"""

import requests
import json

def test_chatbot_local():
    """Test the chatbot with local backend"""
    url = "http://localhost:3001/api/chat"
    
    test_messages = [
        "Tell me about Gaston's AI projects",
        "What is Peata?",
        "How can I contact Gaston?",
        "What are his main skills?",
        "Tell me about his NASA work"
    ]
    
    print("🤖 Testing Portfolio Chatbot")
    print("=" * 50)
    
    for message in test_messages:
        try:
            response = requests.post(url, json={"message": message})
            if response.status_code == 200:
                data = response.json()
                print(f"\n👤 User: {message}")
                print(f"🤖 Bot: {data['response']}")
            else:
                print(f"\n❌ Error {response.status_code}: {response.text}")
        except requests.exceptions.ConnectionError:
            print(f"\n❌ Connection Error: Make sure backend is running on localhost:3001")
            break
        except Exception as e:
            print(f"\n❌ Error: {e}")

def test_projects_endpoint():
    """Test the projects endpoint"""
    url = "http://localhost:3001/api/projects"
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            print(f"\n✅ Projects endpoint working: {len(data['projects'])} projects loaded")
        else:
            print(f"\n❌ Projects endpoint error: {response.status_code}")
    except Exception as e:
        print(f"\n❌ Projects endpoint error: {e}")

if __name__ == "__main__":
    print("Starting backend tests...")
    test_projects_endpoint()
    test_chatbot_local()
    print("\n" + "=" * 50)
    print("✅ Test complete! Start your backend with: cd backend && python app.py")