#!/usr/bin/env python3
"""
Quick test to verify chatbot knows about all projects
"""

import requests
import json

def test_project_knowledge():
    """Test that chatbot knows about all projects"""
    url = "http://localhost:3001/api/chat"
    
    test_questions = [
        "What is Planetrics?",
        "Tell me about the AI Room Designer",
        "What is the SESA project?",
        "List all of Gaston's projects",
        "What is Astro Archive?",
        "Tell me about Relic",
        "What is Peata?",
        "What are Gaston's NASA projects?"
    ]
    
    print("🤖 Testing Project Knowledge")
    print("=" * 60)
    
    for question in test_questions:
        try:
            response = requests.post(url, json={"message": question})
            if response.status_code == 200:
                data = response.json()
                print(f"\n❓ {question}")
                print(f"🤖 {data['response']}")
                print("-" * 40)
            else:
                print(f"\n❌ Error {response.status_code} for: {question}")
        except requests.exceptions.ConnectionError:
            print(f"\n❌ Backend not running. Testing local responses...")
            # Test local responses by importing the function
            break
        except Exception as e:
            print(f"\n❌ Error: {e}")

if __name__ == "__main__":
    test_project_knowledge()