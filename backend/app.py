# backend/app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import json
from datetime import datetime

# Initialize the Flask app
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing (CORS)
# This is crucial to allow your Vercel frontend to talk to this API
CORS(app)

# Google Cloud Platform setup (optional - will fallback to local responses)
try:
    from google.cloud import aiplatform
    from vertexai.language_models import TextGenerationModel
    
    # Initialize Vertex AI (requires GCP credentials)
    # Your GCP project details
    PROJECT_ID = os.getenv('GOOGLE_CLOUD_PROJECT', 'sesa-trifecta-street-25')
    PROJECT_NUMBER = os.getenv('GOOGLE_CLOUD_PROJECT_NUMBER', '362559111577')
    LOCATION = os.getenv('GOOGLE_CLOUD_LOCATION', 'us-central1')
    
    aiplatform.init(project=PROJECT_ID, location=LOCATION)
    GCP_AVAILABLE = True
        
except ImportError:
    print("Google Cloud libraries not installed. Using local responses only.")
    GCP_AVAILABLE = False
except Exception as e:
    print(f"GCP initialization failed: {e}. Using local responses only.")
    GCP_AVAILABLE = False

# --- PROJECT DATA WITH FULL DETAILS ---
mock_projects_data = {
    "projects": [
        {
            "id": "stargate",
            "group": "Gaming",
            "label": "Project Stargate and Bobot",
            "description": "Interactive digital personas for gaming mentorship and coaching, enhancing player development.",
            "year": 2024,
            "skills": ["Python", "AI Agents", "Gaming", "Coaching"],
            "links": [
                {"type": "github", "url": "https://github.com/gastondana627/Stargate-and-Bobot"},
                {"type": "demo", "url": "https://moonrock-stargate-and-bobot-game.streamlit.app"}
            ]
        },
        {
            "id": "peata",
            "group": "AI Projects",
            "label": "Peata - AI Pet Reunification",
            "description": "Character-driven, RAG-backed virtual assistant for pet recovery, using image-matching.",
            "year": 2024,
            "skills": ["RAG", "Python", "AI Agents", "Computer Vision"],
            "links": [
                {"type": "github", "url": "https://github.com/gastondana627/Peata"},
                {"type": "demo", "url": "https://peata-sao.streamlit.app"}
            ]
        },
        {
            "id": "relic",
            "group": "AI Projects",
            "label": "Relic - AI Tech Archaeological Study",
            "description": "Persona-driven, RAG-backed AI research assistant as an interactive digital field guide using SRTM, S2, OT, and Google Earth.",
            "year": 2024,
            "skills": ["RAG", "Python", "GIS", "AI Agents", "Geospatial Analysis"],
            "links": [
                {"type": "github", "url": "https://github.com/gastondana627/Team-Relic-Xingu-Challenge"},
                {"type": "demo", "url": "https://relic-openai-to-z-challenge.tech"},
                {"type": "info", "url": "https://www.linkedin.com/posts/gaston-d-859653184_firsttimeforeverything-techarchaeology-xinguriver-activity-7351776858884988929-0012"}
            ]
        },
        {
            "id": "sesa",
            "group": "Ethical Hacking",
            "label": "SESA Project Proposal",
            "description": "Designed multi-agent AI with goal-oriented behaviors and emotional awareness for engaging narratives.",
            "year": 2024,
            "skills": ["Multi-Agent Systems", "AI", "Security", "Behavioral AI"],
            "links": [
                {"type": "info", "url": "https://www.linkedin.com/posts/gaston-d-859653184_sesa-spacetech-ai-activity-7353836444710260737-k045"}
            ]
        },
        {
            "id": "astro_archive",
            "group": "AI Projects",
            "label": "Astro Archive",
            "description": "Engineered memory-aware agents capable of context switching and user-specific coaching.",
            "year": 2024,
            "skills": ["MongoDB", "Python", "AI Agents", "Memory Systems"],
            "links": [
                {"type": "github", "url": "https://github.com/gastondana627/Mongo_DB_NASA_OSDR"}
            ]
        },
        {
            "id": "nasa_kg",
            "group": "AI Projects",
            "label": "NASA Knowledge Graph",
            "description": "Mapped biological/omics data into Neo4j for contextual health reasoning for astronauts.",
            "year": 2024,
            "skills": ["Neo4j", "Knowledge Graphs", "Python", "Bioinformatics"],
            "links": [
                {"type": "github", "url": "https://github.com/gastondana627/spoke_genelab"},
                {"type": "info", "url": "https://www.linkedin.com/posts/gaston-d-859653184_spoke-nasa-team60-activity-7325938069293977601-T3ck"}
            ]
        },
        {
            "id": "planetrics",
            "group": "AI Projects",
            "label": "Planetrics",
            "description": "Interactive web dashboard visualizing NASA's 6,000+ exoplanet catalog. Built with Plotly Studio, featuring live data from NASA Exoplanet Archive API, discovery trends, and curated milestone content.",
            "year": 2025,
            "skills": ["Python", "Plotly", "Pandas", "NASA API", "Data Visualization"],
            "links": [
                {"type": "demo", "url": "https://d3db0003-331f-4875-8af8-7bb0fb3acc6c.plotly.app"}
            ]
        },
        {
            "id": "ai-room-designer",
            "group": "AI Projects",
            "label": "AI Room Designer",
            "description": "Multi-modal AI interior design platform with dual modes: Generate New (text-to-image) and Redesign My Room (image transformation). Features Gemini 2.5 Flash for redesign, Fal.ai for 3D reconstruction, ElevenLabs voice narration, and local gpt-oss agent for offline AI consultation.",
            "year": 2025,
            "skills": ["React", "Python", "FastAPI", "Gemini 2.5", "Fal.ai", "ElevenLabs", "TypeScript", "Tailwind CSS"],
            "links": [
                {"type": "demo", "url": "https://rooms-through-time-production.up.railway.app"},
                {"type": "demo", "url": "https://rooms-through-time.vercel.app"},
                {"type": "github", "url": "https://github.com/gastondana627/Rooms-Through-Time"},
                {"type": "info", "url": "https://youtu.be/Gh2-ltEzjr0?si=J3W58BHmcdWNWA5k"}
            ]
        }
    ],
    "skills": [
        {"id": "python", "name": "Python", "category": "Language", "level": "expert"},
        {"id": "rag", "name": "RAG", "category": "AI", "level": "expert"},
        {"id": "ai_agents", "name": "AI Agents", "category": "AI", "level": "expert"},
        {"id": "neo4j", "name": "Neo4j", "category": "Database", "level": "advanced"},
        {"id": "mongodb", "name": "MongoDB", "category": "Database", "level": "advanced"},
        {"id": "computer_vision", "name": "Computer Vision", "category": "AI", "level": "intermediate"},
        {"id": "gis", "name": "GIS", "category": "Geospatial", "level": "advanced"},
        {"id": "multi_agent", "name": "Multi-Agent Systems", "category": "AI", "level": "advanced"},
        {"id": "gaming", "name": "Gaming", "category": "Domain", "level": "advanced"},
        {"id": "security", "name": "Security", "category": "Domain", "level": "intermediate"},
        {"id": "data_viz", "name": "Data Visualization", "category": "Domain", "level": "advanced"},
        {"id": "api", "name": "API Integration", "category": "Domain", "level": "expert"},
        {"id": "react", "name": "React", "category": "Language", "level": "advanced"}
    ],
    "evolution_links": [
        {"source": "peata", "target": "relic", "relationship": "evolved_into", "description": "Expanded RAG concepts from pet recovery to archaeological research"},
        {"source": "relic", "target": "astro_archive", "relationship": "evolved_into", "description": "Applied geospatial + AI learnings to space data archival"},
        {"source": "astro_archive", "target": "nasa_kg", "relationship": "evolved_into", "description": "Transitioned from document storage to knowledge graph reasoning"},
        {"source": "stargate", "target": "peata", "relationship": "inspired", "description": "Gaming personas inspired character-driven AI assistants"},
        {"source": "sesa", "target": "astro_archive", "relationship": "influenced", "description": "Multi-agent concepts influenced memory-aware systems"}
    ],
    "skill_links": [
        {"project": "stargate", "skill": "python"},
        {"project": "stargate", "skill": "ai_agents"},
        {"project": "stargate", "skill": "gaming"},
        {"project": "peata", "skill": "rag"},
        {"project": "peata", "skill": "python"},
        {"project": "peata", "skill": "ai_agents"},
        {"project": "peata", "skill": "computer_vision"},
        {"project": "relic", "skill": "rag"},
        {"project": "relic", "skill": "python"},
        {"project": "relic", "skill": "gis"},
        {"project": "relic", "skill": "ai_agents"},
        {"project": "sesa", "skill": "multi_agent"},
        {"project": "sesa", "skill": "ai_agents"},
        {"project": "sesa", "skill": "security"},
        {"project": "astro_archive", "skill": "mongodb"},
        {"project": "astro_archive", "skill": "python"},
        {"project": "astro_archive", "skill": "ai_agents"},
        {"project": "nasa_kg", "skill": "neo4j"},
        {"project": "nasa_kg", "skill": "python"},
        {"project": "planetrics", "skill": "python"},
        {"project": "planetrics", "skill": "data_viz"},
        {"project": "planetrics", "skill": "api"},
        {"project": "ai-room-designer", "skill": "python"},
        {"project": "ai-room-designer", "skill": "react"},
        {"project": "ai-room-designer", "skill": "ai_agents"},
        {"project": "ai-room-designer", "skill": "computer_vision"}
    ]
}

# Portfolio context for the AI chatbot
PORTFOLIO_CONTEXT = """
You are an AI assistant for Gaston Dana's portfolio website. You are knowledgeable about his work, projects, and experience.

ABOUT GASTON:
- Full-Stack Developer & AI Engineer
- Experience at Reality AI Lab and AdvancingX
- Specializes in RAG systems, multi-agent AI, and production-ready AI/ML solutions
- Active mentor through Ambition in Motion (NSCS partnership) and ALPFA community
- Early access participant and beta tester for cutting-edge development tools
- Participates in beta programs for both frontend and backend software platforms
- 7+ hackathons participated with multiple placements
- First SESA proposal submitted to NASA (2025)
- Guides next generation of technologists through mentorship programs

KEY PROJECTS:
1. **Peata** - Character-driven, RAG-backed virtual assistant for pet recovery using image-matching and conversational AI to help reunite lost pets with families
2. **Relic** - AI archaeological research assistant using SRTM, Sentinel-2, OpenTopography, and Google Earth data as an interactive digital field guide
3. **NASA Knowledge Graph** - Mapped biological/omics data into Neo4j for contextual health reasoning supporting astronaut health research
4. **AI Room Designer (Rooms Through Time)** - Multi-modal interior design platform with dual modes: Generate New (text-to-image) and Redesign My Room (image transformation). Built with React, Python, FastAPI, Gemini 2.5 Flash for redesign, Fal.ai for 3D reconstruction, ElevenLabs voice narration, and local gpt-oss agent for offline AI consultation
5. **Planetrics** - Interactive web dashboard visualizing NASA's 6,000+ exoplanet catalog. Built with Plotly Studio, featuring live data from NASA Exoplanet Archive API, discovery trends, and curated milestone content
6. **Astro Archive** - Memory-aware coaching agents capable of context switching and user-specific coaching for space data
7. **Project Stargate and Bobot** - Interactive digital personas for gaming mentorship and coaching, enhancing player development through AI-powered guidance
8. **SESA** - Multi-agent AI system with goal-oriented behaviors and emotional awareness for engaging narratives (proposal submitted to NASA)

TECHNICAL SKILLS:
- AI/ML: RAG Systems (Expert), Multi-Agent Systems (Expert), Computer Vision (Advanced)
- Languages: Python (Expert), JavaScript (Advanced), React (Advanced)
- Databases: Neo4j (Expert), MongoDB (Advanced)
- Cloud: GCP/AWS (Advanced), Docker/DevOps (Intermediate)

CONTACT:
- LinkedIn: https://www.linkedin.com/in/gaston-d-859653184/
- GitHub: https://github.com/gastondana627
- Email: Available through website contact form

Be helpful, enthusiastic, and knowledgeable. Keep responses conversational but informative.
"""

def generate_ai_response(user_message):
    """Generate AI response using Vertex AI or fallback to local responses"""
    
    if GCP_AVAILABLE:
        try:
            # Use Vertex AI's Gemini model
            from vertexai.generative_models import GenerativeModel
            
            model = GenerativeModel("gemini-1.5-flash-001")
            
            prompt = f"""
{PORTFOLIO_CONTEXT}

User Question: {user_message}

Please provide a helpful, conversational response about Gaston's work and experience. Keep it concise but informative (2-3 sentences max unless more detail is specifically requested).
"""
            
            response = model.generate_content(prompt)
            return response.text.strip()
            
        except Exception as e:
            print(f"Vertex AI error: {e}")
            # Fall back to local responses
            pass
    
    # Local fallback responses
    return get_local_response(user_message)

def get_local_response(message):
    """Local fallback responses when GCP is unavailable"""
    lowerMessage = message.lower()
    
    # Project-specific responses
    if 'peata' in lowerMessage:
        return "🐕 Peata is one of Gaston's flagship AI projects! It's a character-driven, RAG-backed virtual assistant designed for pet recovery. The system uses image-matching and conversational AI to help reunite lost pets with their families."
    
    if 'relic' in lowerMessage:
        return "🏛️ Relic is a fascinating AI archaeological research assistant! It's a persona-driven, RAG-backed system that serves as an interactive digital field guide using SRTM, Sentinel-2, OpenTopography, and Google Earth data."
    
    if 'nasa' in lowerMessage or 'space' in lowerMessage:
        return "🚀 Gaston has worked on several NASA-related projects! His NASA Knowledge Graph maps biological data into Neo4j for astronaut health reasoning, and his SESA proposal was submitted to NASA in 2025."
    
    if 'ai room designer' in lowerMessage or 'room designer' in lowerMessage:
        return "🏠 The AI Room Designer is Gaston's latest multi-modal AI platform! It features dual modes with Gemini 2.5 Flash, Fal.ai for 3D reconstruction, and ElevenLabs for voice narration."
    
    if 'rag' in lowerMessage:
        return "🔍 Gaston is an expert in RAG (Retrieval-Augmented Generation) systems! He's implemented RAG in multiple projects like Peata, Relic, and others, combining document retrieval with generative AI."
    
    if 'contact' in lowerMessage:
        return "📧 You can reach Gaston through LinkedIn (https://www.linkedin.com/in/gaston-d-859653184/), GitHub (https://github.com/gastondana627), or the contact form on this website!"
    
    if 'project' in lowerMessage and ('main' in lowerMessage or 'top' in lowerMessage):
        return "🚀 Gaston's main AI projects include Peata (pet recovery), Relic (archaeological research), NASA Knowledge Graph, AI Room Designer, and several others. Each showcases different aspects of his AI expertise!"
    
    # Default response
    return "That's an interesting question! Gaston has worked on many AI projects involving RAG systems, multi-agent architectures, and knowledge graphs. Could you be more specific about what you'd like to know?"

# --- API ENDPOINTS ---
@app.route("/api/projects")
def get_projects():
    """
    This endpoint returns the mock project data as a JSON object.
    """
    return jsonify(mock_projects_data)

@app.route("/api/chat", methods=["POST"])
def chat():
    """
    Chatbot endpoint that processes user messages and returns AI responses
    """
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({"error": "Message is required"}), 400
        
        # Generate AI response
        ai_response = generate_ai_response(user_message)
        
        # Log the interaction (optional)
        print(f"[{datetime.now()}] User: {user_message}")
        print(f"[{datetime.now()}] Bot: {ai_response}")
        
        return jsonify({
            "response": ai_response,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        print(f"Chat endpoint error: {e}")
        return jsonify({
            "response": "I'm having trouble processing your request right now. Please try again later!",
            "error": str(e)
        }), 500

# This allows the file to be run directly using "python app.py"
if __name__ == '__main__':
    # Running on port 3001 to avoid conflicts with frontend on 3000
    app.run(debug=True, port=3001)
    