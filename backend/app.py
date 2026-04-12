from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import json
import re
from datetime import datetime
from dotenv import load_dotenv

from langchain_community.vectorstores import Chroma
from langchain_google_vertexai import VertexAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Load environment variables from .env file
load_dotenv()

if os.getenv("GCP_SERVICE_ACCOUNT_JSON"):
    sa_info = json.loads(os.getenv("GCP_SERVICE_ACCOUNT_JSON"))
    temp_path = "/tmp/temp_key.json"
    with open(temp_path, "w") as f:
        json.dump(sa_info, f)
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = temp_path

# ============================================
# FLASK INITIALIZATION & CORS CONFIGURATION
# ============================================

app = Flask(__name__)

CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "http://localhost:5000",
            "http://localhost:8000",
            "https://gastondana.com",
            "https://gastondana.vercel.app",
            "https://portfolio-jcqs164kp-gastondana627s-projects.vercel.app",
            "https://portfolio-production-b1b4.up.railway.app",
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": False,
        "max_age": 3600
    }
})

# ============================================
# SECURITY HEADERS FOR PRODUCTION
# ============================================

@app.after_request
def add_security_headers(response):
    """Add security headers to all responses"""
    if os.getenv('FLASK_ENV') == 'production' or os.getenv('PORTFOLIO_ENV') == 'production':
        # Prevent MIME type sniffing
        response.headers['X-Content-Type-Options'] = 'nosniff'
        
        # Prevent clickjacking
        response.headers['X-Frame-Options'] = 'DENY'
        
        # XSS Protection
        response.headers['X-XSS-Protection'] = '1; mode=block'
        
        # Referrer Policy
        response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        
        # Content Security Policy for API
        response.headers['Content-Security-Policy'] = "default-src 'none'; frame-ancestors 'none';"
        
        # HSTS for HTTPS
        if request.is_secure:
            response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload'
    
    return response

# ============================================
# PROMPT INJECTION DEFENSE
# ============================================

INJECTION_PATTERNS = [
    r"ignore.*instruction",
    r"forget.*previous",
    r"forget.*context",
    r"disregard.*instruction",
    r"you are now",
    r"pretend you are",
    r"act as if",
    r"from now on",
    r"new instruction",
    r"reveal.*system",
    r"show.*prompt",
    r"what.*your.*system",
    r"what.*your.*instructions",
    r"print.*system",
    r"display.*system",
    r"tell me.*context",
    r"show.*vectorstore",
    r"reveal.*documents",
    r"what.*documents",
    r"list all.*files",
]

def is_prompt_injection(message):
    """Detect common prompt injection patterns"""
    message_lower = message.lower()
    for pattern in INJECTION_PATTERNS:
        if re.search(pattern, message_lower, re.IGNORECASE):
            print(f"⚠️ Potential injection detected: {pattern}")
            return True
    return False

def sanitize_user_input(message):
    """Clean user input before sending to AI"""
    suspicious_sequences = [
        "<!--", "-->",
        "{{", "}}",
        "\\n\\n\\n",
    ]
    
    sanitized = message
    for seq in suspicious_sequences:
        if seq in sanitized:
            print(f"⚠️ Removed suspicious sequence: {seq}")
            sanitized = sanitized.replace(seq, "")
    
    return sanitized.strip()

# ============================================
# MULTI-MODEL AI SETUP (SCHEDULED ROTATION)
# ============================================

AI_CLIENT = None
AI_PROVIDER = None
AI_AVAILABLE = False

# Schedule: 8hr each provider (UTC)
schedule = {
    'openai': range(0, 8),      # 00:00 - 08:00 UTC
    'claude': range(8, 16),     # 08:00 - 16:00 UTC
    'google': range(16, 24)     # 16:00 - 24:00 UTC
}

def get_current_provider():
    """Determine provider based on time schedule"""
    hour = datetime.utcnow().hour
    if hour in schedule['openai']:
        return 'openai'
    elif hour in schedule['claude']:
        return 'claude'
    else:
        return 'google'

try:
    current_time = datetime.utcnow()
    scheduled_provider = get_current_provider()
    print(f"⏰ Current UTC hour: {current_time.hour}, Scheduled provider: {scheduled_provider}")
    
    # Force OpenAI for now since it's the only configured provider
    if os.getenv('OPENAI_API_KEY', '').strip():
        from openai import OpenAI
        AI_CLIENT = OpenAI(api_key=os.getenv('OPENAI_API_KEY').strip())
        AI_PROVIDER = "openai"
        AI_AVAILABLE = True
        print("✅ OpenAI configured (Forced - only available provider)")
    
    elif os.getenv('ANTHROPIC_API_KEY', '').strip():
        from anthropic import Anthropic
        AI_CLIENT = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY').strip())
        AI_PROVIDER = "claude"
        AI_AVAILABLE = True
        print("✅ Claude configured (Fallback)")
    
    elif os.getenv('GOOGLE_API_KEY', '').strip():
        import google.generativeai as genai
        genai.configure(api_key=os.getenv('GOOGLE_API_KEY').strip())
        AI_CLIENT = genai
        AI_PROVIDER = "google"
        AI_AVAILABLE = True
        print("✅ Google AI configured (Fallback)")
    
    else:
        print("⚠️ No AI API keys found. Using local responses only.")
        AI_AVAILABLE = False

except ImportError as e:
    print(f"⚠️ AI library not installed: {e}. Using local responses only.")
    AI_AVAILABLE = False
except Exception as e:
    print(f"⚠️ AI initialization failed: {e}. Using local responses only.")
    AI_AVAILABLE = False

# ============================================
# GCP & RAG CONFIGURATION
# ============================================

PROJECT_ID = os.getenv('GOOGLE_CLOUD_PROJECT', 'sesa-trifecta-street-25')
LOCATION = os.getenv('GOOGLE_CLOUD_LOCATION', 'us-central1')

# ============================================
# RAG SETUP (Multi-Project Text Documents)
# ============================================

VECTORSTORES = {}

PROJECT_DOC_MAP = {
    "ai-room-designer": {
        "filename": "ai_room_designer.txt",
        "keywords": ["room designer", "ai room", "rooms through time", "redesign", "interior design", "gemini", "fal.ai"]
    },
    "astro_archive": {
        "filename": "astro_archive.txt",
        "keywords": ["astro archive", "nasa", "space data", "memory-aware", "agents", "coaching"]
    },
    "nasa_kg": {
        "filename": "nasa_kg.txt",
        "keywords": ["nasa knowledge graph", "neo4j", "biological", "astronaut", "health", "omics"]
    },
    "peata": {
        "filename": "peata.txt",
        "keywords": ["peata", "pet recovery", "rag", "image-matching", "lost pets"]
    },
    "planetrics": {
        "filename": "planetrics.txt",
        "keywords": ["planetrics", "exoplanet", "nasa", "plotly", "dashboard"]
    },
    "relic": {
        "filename": "relic.txt",
        "keywords": ["relic", "archaeological", "geospatial", "research", "srtm", "sentinel"]
    },
    "sesa": {
        "filename": "sesa.txt",
        "keywords": ["sesa", "multi-agent", "nasa proposal", "emotional awareness"]
    },
    "stargate": {
        "filename": "stargate.txt",
        "keywords": ["stargate", "gaming", "mentorship", "coaching", "bobot"]
    },
    "gaming_context": {
        "filename": "gaming_context.txt",
        "keywords": ["gaming", "game development", "unity", "unreal", "godot", "qa testing", "game testing", "streaming", "twitch", "youtube", "game jam", "raid shadow legends", "ghost of yotei", "game design", "indie games", "multiplayer", "vr games", "mobile games", "c#", "blueprint", "gdscript", "testral", "jira", "beta testing", "game analytics", "procedural generation", "game ai", "accessibility", "cross-platform"]
    },
    "content_creation_context": {
        "filename": "content_creation_context.txt",
        "keywords": ["content creation", "video production", "youtube", "streaming", "social media", "brand partnerships", "collaborations", "tutorials", "educational content", "adobe premiere", "obs studio", "camtasia", "figma", "canva", "notion", "trello", "buffer", "analytics", "linkedin posts", "technical writing", "documentation", "workshops", "mentorship", "community", "storytelling", "multi-platform", "engagement", "viral content", "thought leadership"]
    }
}

def load_project_docs(project_key):
    """Load text file for a specific project"""
    try:
        project_info = PROJECT_DOC_MAP.get(project_key)
        if not project_info:
            return None
        
        filename = project_info["filename"]
        doc_path = os.path.join(os.path.dirname(__file__), "project_docs", filename)
        
        if not os.path.exists(doc_path):
            print(f"⚠️ Doc not found: {doc_path}")
            return None
        
        print(f"📄 Loading docs for {project_key}...")
        
        # Read text file
        with open(doc_path, 'r', encoding='utf-8') as f:
            text = f.read()
        
        if not text.strip():
            print(f"⚠️ Document is empty: {filename}")
            return None
        
        print(f"✂️ Splitting into chunks...")
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=100,
            separators=["\n\n", "\n", ". ", " ", ""]
        )
        chunks = splitter.split_text(text)
        print(f"✅ Created {len(chunks)} chunks for {project_key}")
        
        print(f"🔮 Creating embeddings for {project_key}...")
        embeddings = VertexAIEmbeddings(
            model_name="text-embedding-004",
            project=PROJECT_ID,
            location=LOCATION
        )
        
        vectorstore = Chroma.from_texts(
            chunks,
            embedding=embeddings,
            collection_name=f"project_{project_key}"
        )
        print(f"✅ Vector store created for {project_key}!")
        return vectorstore
        
    except Exception as e:
        print(f"❌ Failed to load docs for {project_key}: {e}")
        return None

def get_vectorstore_for_query(query):
    """Match query to project and return vectorstore"""
    query_lower = query.lower()
    
    print(f"🔍 Matching query: '{query_lower}'")
    
    for project_key, project_info in PROJECT_DOC_MAP.items():
        if any(keyword in query_lower for keyword in project_info["keywords"]):
            print(f"✅ Match found for project: {project_key}")
            
            # Lazy load vectorstore (only when needed)
            if project_key not in VECTORSTORES:
                print(f"📥 Loading vectorstore for {project_key}...")
                VECTORSTORES[project_key] = load_project_docs(project_key)
            else:
                print(f"♻️ Using cached vectorstore for {project_key}")
            
            return VECTORSTORES[project_key], project_key
    
    return None, None

# ============================================
# PROJECT & PORTFOLIO DATA
# ============================================

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
                {"type": "video", "url": "https://www.linkedin.com/posts/gaston-d-859653184_plotly-python-datascience-activity-7380386160432500736-P6OA?utm_source=share&utm_medium=member_desktop&rcm=ACoAACuFtgUBVdf9kFE9Wlxn2qi6FBP2M0VX6Ds"}
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

PORTFOLIO_CONTEXT = """
You are an AI assistant for Gaston Dana's portfolio website. You are knowledgeable about his work, projects, and experience.

ABOUT GASTON:
- Early Access Program Tester for Kaggle and Vercel
- Full-Stack Developer & AI Engineer specializing in cutting-edge AI/ML systems
- Game Developer & QA Tester with expertise in Unity, Unreal Engine, and Godot
- Gaming Content Creator with active streaming and video content
- Specializes in RAG systems, multi-agent AI, and production-ready AI/ML solutions
- Active mentor through Ambition in Motion (NSCS partnership) and ALPFA community
- Beta tester for cutting-edge development tools and platforms
- Participates in early access programs for both frontend and backend software
- 7+ hackathons and game jams participated with multiple placements
- First SESA proposal submitted to NASA (2025)
- Guides next generation of technologists through mentorship programs

GAMING EXPERTISE:
- Currently playing: Raid Shadow Legends (daily active player)
- Excited about: Ghost of Yotei (upcoming release)
- Game Development: Unity (Expert), Unreal Engine (Intermediate), Godot (Intermediate)
- QA Testing: Functional, regression, performance, and compatibility testing
- Content Creation: Twitch streaming, YouTube tutorials, game development content
- Tools: TestRail, JIRA, Unity Test Runner, Steam Playtest
- Specializations: Procedural generation, game AI, accessibility, cross-platform development

CONTENT CREATION EXPERTISE:
- Recent Published Content: AI Room Designer showcase (25K+ views), Planetrics NASA visualization (18K+ views), Unity tutorial series (45K+ total views)
- Brand Partnerships: AI/ML Developer Community, NASA/Space Technology Community, Unity Developer Community
- Specializations: Technical video production, educational content for developers, AI application showcases
- Tools: OBS Studio, Premiere Pro, After Effects, Figma, YouTube Studio
- Recognition: NASA collaboration recognition, Unity Community Educator Award, viral technical content creator

KEY PROJECTS:
1. **Peata** - Character-driven, RAG-backed virtual assistant for pet recovery using image-matching and conversational AI to help reunite lost pets with families
2. **Relic** - AI archaeological research assistant using SRTM, Sentinel-2, OpenTopography, and Google Earth data as an interactive digital field guide
3. **NASA Knowledge Graph** - Mapped biological/omics data into Neo4j for contextual health reasoning supporting astronaut health research
4. **AI Room Designer (Rooms Through Time)** - Multi-modal interior design platform with dual modes: Generate New (text-to-image) and Redesign My Room (image transformation)
5. **Planetrics** - Interactive web dashboard visualizing NASA's 6,000+ exoplanet catalog
6. **Astro Archive** - Memory-aware coaching agents capable of context switching and user-specific coaching for space data
7. **Project Stargate and Bobot** - Interactive digital personas for gaming mentorship and coaching
8. **SESA** - Multi-agent AI system with goal-oriented behaviors and emotional awareness (NASA proposal)

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

# ============================================
# AI RESPONSE GENERATION
# ============================================

def call_ai_model(system_prompt, user_message, provider=None):
    """Universal AI caller - routes to appropriate provider"""
    if not AI_AVAILABLE:
        print("⚠️ AI_AVAILABLE is False, returning None")
        return None
    
    current_provider = provider or AI_PROVIDER
    
    try:
        if current_provider == "claude":
            response = AI_CLIENT.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=1024,
                system=system_prompt,
                messages=[{"role": "user", "content": user_message}]
            )
            return response.content[0].text
        
        elif current_provider == "openai":
            print(f"🔍 DEBUG: Calling OpenAI with system prompt length: {len(system_prompt)}")
            print(f"🔍 DEBUG: System prompt preview: {system_prompt[:200]}...")
            response = AI_CLIENT.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=500,
                temperature=0.7
            )
            result = response.choices[0].message.content
            print(f"🔍 DEBUG: OpenAI response preview: {result[:100]}...")
            return result
        
        elif current_provider == "google":
            model = AI_CLIENT.GenerativeModel("gemini-1.5-flash")
            prompt = f"{system_prompt}\n\nUser: {user_message}"
            response = model.generate_content(prompt)
            return response.text
        
    except Exception as e:
        print(f"❌ {current_provider.title()} error: {e}")
        return None

def enhance_query_with_portfolio_context(user_message, portfolio_context):
    """Enhance user query with portfolio-specific context for better RAG matching"""
    if portfolio_context == 'gaming':
        return f"gaming {user_message}"
    elif portfolio_context == 'content':
        return f"content creation video production youtube {user_message}"
    else:
        return user_message

def get_portfolio_specific_system_prompt(portfolio_context, project_key=None):
    """Get system prompt tailored to the current portfolio context"""
    base_prompt = PORTFOLIO_CONTEXT
    
    if portfolio_context == 'gaming':
        return f"""{base_prompt}

CURRENT PORTFOLIO FOCUS: GAMING ECOSYSTEM
You are currently helping a user who is viewing Gaston's gaming portfolio. Focus your responses on:
- Game development experience (Unity, Unreal Engine, Godot)
- QA testing expertise and methodologies
- Gaming content creation (streaming, tutorials)
- Current gaming interests (Raid Shadow Legends, Ghost of Yotei)
- Game jam participation and achievements
- Gaming industry insights and connections

Prioritize gaming-related information while still being helpful about other topics when asked directly.
"""
    elif portfolio_context == 'content':
        return f"""{base_prompt}

CURRENT PORTFOLIO FOCUS: CONTENT CREATION ECOSYSTEM
You are currently helping a user who is viewing Gaston's content creation portfolio. Focus your responses on:

RECENT PUBLISHED CONTENT (2024-2025):
- AI Room Designer "Rooms Through Time" showcase (4:15 min, 25K+ views, 28% engagement)
- Planetrics NASA Data Visualization demo (6:30 min, 18K+ views, 32% engagement) 
- NASA Knowledge Graph technical documentation (8:50 min, 12K+ views, 40% engagement)
- Unity Game Development Tutorial Series (45K+ total views, 2,500+ subscribers, 35% engagement)

CURRENT BRAND PARTNERSHIPS:
- AI/ML Developer Community (completed): Technical showcase partnership, 75K reach, 28% engagement
- NASA/Space Technology Community (ongoing): Educational content partnership, 45K reach, 32% engagement
- Unity Developer Community (ongoing): Tutorial series partnership, 120K reach, 35% engagement
- Professional Development Community (completed): Multi-portfolio showcase, 35K reach, 40% engagement

CONTENT CREATION SPECIALIZATIONS:
- Technical video production and walkthroughs (AI/ML, game development, data visualization)
- Educational content for developer communities (Unity tutorials, AI implementation guides)
- NASA collaboration documentation and space science education
- Professional development and career strategy content
- Multi-modal AI application showcases and technical demonstrations

CURRENT FOCUS AREAS (January 2025):
- AI-powered content creation and technical demonstrations
- Educational video content for developer community
- Data visualization and interactive dashboard design
- Multi-modal AI application showcases and tutorials

TOOLS & PLATFORMS:
- Video Production: OBS Studio, Premiere Pro, After Effects, Camtasia, DaVinci Resolve
- Design: Figma, Photoshop, Illustrator, Sketch
- Content Management: Notion, YouTube Studio, Buffer, Google Analytics

ACHIEVEMENTS & RECOGNITION:
- NASA Collaboration Recognition for space science education
- Unity Community Educator Award for exceptional educational content
- AI/ML Developer Community recognition for viral technical content
- Innovation in Portfolio Design acknowledgment

Prioritize current content creation projects and partnerships while being helpful about other topics when asked directly.
"""
    else:
        return base_prompt

def generate_ai_response(user_message, portfolio_context='main'):
    """Generate AI response using RAG (if applicable) + AI or fallback"""
    
    print(f"\n🔍 DEBUG: Processing query: '{user_message}'")
    print(f"🔍 DEBUG: Portfolio context: '{portfolio_context}'")
    print(f"🔍 DEBUG: AI Available = {AI_AVAILABLE}")
    print(f"🔍 DEBUG: AI Provider = {AI_PROVIDER}")
    
    # Enhance query with portfolio context for better RAG matching
    enhanced_query = enhance_query_with_portfolio_context(user_message, portfolio_context)
    vectorstore, project_key = get_vectorstore_for_query(enhanced_query)
    
    print(f"🔍 DEBUG: Project detected = {project_key}")
    print(f"🔍 DEBUG: Vectorstore found = {vectorstore is not None}")
    
    # RAG-enhanced response
    if AI_AVAILABLE and vectorstore:
        try:
            print(f"🔍 Using RAG for project: {project_key}")
            
            results = vectorstore.similarity_search(user_message, k=3)
            context = "\n\n".join([doc.page_content for doc in results])
            
            portfolio_prompt = get_portfolio_specific_system_prompt(portfolio_context, project_key)
            system_prompt = f"{portfolio_prompt}\n\nYou are helping users learn about Gaston's {project_key} project. Answer based on the documentation provided."
            user_prompt = f"""CONTEXT FROM PROJECT DOCUMENTATION:
{context}

USER QUESTION: {user_message}

Provide a helpful, conversational answer based on the documentation above. Keep it concise (2-4 sentences) unless more detail is requested."""
            
            response = call_ai_model(system_prompt, user_prompt)
            if response:
                print(f"✅ RAG response generated: {response[:100]}...")
                return response
            
        except Exception as e:
            print(f"❌ RAG error: {e}")
    
    # Regular AI response
    if AI_AVAILABLE:
        print(f"🔍 Using standard AI response (no RAG match)")
        portfolio_prompt = get_portfolio_specific_system_prompt(portfolio_context)
        response = call_ai_model(portfolio_prompt, user_message)
        if response:
            print(f"✅ AI response generated: {response[:100]}...")
            return response
    
    # Fallback to local
    print(f"🔍 Falling back to local response")
    return get_local_response(user_message, portfolio_context)

def get_local_response(message, portfolio_context='main'):
    """Local fallback responses when AI is unavailable"""
    lowerMessage = message.lower()
    
    # Portfolio-specific default responses
    if portfolio_context == 'gaming':
        if not any(keyword in lowerMessage for keyword in ['peata', 'relic', 'nasa', 'room designer', 'rag', 'contact', 'project']):
            return "🎮 I'm here to help you learn about Gaston's gaming expertise! Ask me about his game development experience with Unity and Unreal Engine, QA testing methodologies, gaming content creation, or his current gaming interests like Raid Shadow Legends and Ghost of Yotei."
    
    elif portfolio_context == 'content':
        if not any(keyword in lowerMessage for keyword in ['peata', 'relic', 'nasa', 'room designer', 'rag', 'contact', 'project']):
            return "📹 I'm here to help you learn about Gaston's content creation work! Ask me about his recent published videos (AI Room Designer showcase with 25K+ views, Planetrics NASA visualization with 18K+ views, Unity tutorial series with 45K+ total views), current brand partnerships with AI/ML and NASA communities, educational content for developers, or his technical video production expertise. What would you like to know about his content creation journey?"
    
    if 'room designer' in lowerMessage or 'ai room' in lowerMessage or 'rooms through time' in lowerMessage:
        return "🏠 The AI Room Designer (Rooms Through Time) is Gaston's latest multi-modal AI platform! It features dual modes: Generate New (text-to-image) and Redesign My Room (image transformation). Built with React, Python, FastAPI, Gemini 2.5 Flash for redesign, Fal.ai for 3D reconstruction, ElevenLabs for voice narration, and includes a local gpt-oss agent for offline AI consultation!"
    
    if 'peata' in lowerMessage:
        return "🐕 Peata is one of Gaston's flagship AI projects! It's a character-driven, RAG-backed virtual assistant designed for pet recovery using image-matching and conversational AI to help reunite lost pets with families."
    
    if 'relic' in lowerMessage:
        return "🏛️ Relic is a fascinating AI archaeological research assistant! It's a persona-driven, RAG-backed system that serves as an interactive digital field guide using SRTM, Sentinel-2, OpenTopography, and Google Earth data."
    
    if 'stargate' in lowerMessage:
        return "🎮 Project Stargate is all about gaming mentorship! Gaston created interactive digital personas for gaming coaching and player development. It's a unique blend of AI agents and gaming expertise."
    
    # Gaming-specific responses
    if 'raid shadow legends' in lowerMessage or 'raid' in lowerMessage:
        return "🎮 Gaston is currently playing Raid Shadow Legends! He's an active daily player who focuses on team composition and strategy optimization. He enjoys the tactical combat, RPG mechanics, and character progression systems."
    
    if 'ghost of yotei' in lowerMessage or 'yotei' in lowerMessage:
        return "🗾 Gaston is highly excited about Ghost of Yotei! He's been following the development updates and trailers closely for this anticipated sequel to Ghost of Tsushima. He's particularly interested in the new protagonist and time period shift."
    
    if 'game development' in lowerMessage or 'unity' in lowerMessage or 'unreal' in lowerMessage or 'godot' in lowerMessage:
        return "🎮 Gaston has extensive game development experience! He's expert in Unity (C# scripting, 2D/3D, VR/AR), intermediate in Unreal Engine (Blueprint, VR), and works with Godot (GDScript). He's participated in 7+ game jams with multiple placements and specializes in procedural generation and game AI."
    
    if 'qa testing' in lowerMessage or 'game testing' in lowerMessage or 'testral' in lowerMessage or 'jira' in lowerMessage:
        return "🧪 Gaston is experienced in QA testing methodologies including functional, regression, performance, and compatibility testing. He uses tools like TestRail, JIRA, Unity Test Runner, and Steam Playtest. He's worked on indie game releases and has ISTQB Foundation Level certification in progress."
    
    if 'streaming' in lowerMessage or 'twitch' in lowerMessage or 'youtube' in lowerMessage or 'content creation' in lowerMessage:
        return "📺 Gaston creates gaming content through Twitch streaming and YouTube! He focuses on strategy games, indie titles, live coding sessions, and game development tutorials. He also does game reviews and behind-the-scenes development content with a growing community following."
    
    if 'gaming' in lowerMessage and ('skills' in lowerMessage or 'experience' in lowerMessage):
        return "🎮 Gaston's gaming expertise spans development (Unity, Unreal, Godot), QA testing (functional, performance, compatibility), content creation (streaming, tutorials), and industry involvement (game jams, mentorship, beta testing). He combines technical skills with creative game design and community engagement."
    
    # Content creation responses
    if 'content creation' in lowerMessage or 'video production' in lowerMessage:
        return "📹 Gaston creates comprehensive technical content including YouTube tutorials, LinkedIn thought leadership posts, and educational videos. His recent work includes AI Room Designer campaign content, Planetrics dashboard showcases, and Unity development tutorials with thousands of views."
    
    if 'youtube' in lowerMessage and ('channel' in lowerMessage or 'videos' in lowerMessage):
        return "📺 Gaston's YouTube content focuses on technical tutorials, project walkthroughs, and educational content. Notable videos include 'Rooms Through Time - AI Interior Design Revolution' and Unity development tutorial series. He creates content that breaks down complex AI/ML and game development concepts."
    
    if 'brand partnerships' in lowerMessage or 'collaborations' in lowerMessage:
        return "🤝 Gaston collaborates with technology companies for early access content, educational institutions for guest lectures, gaming industry partners for sponsored content, and open source projects for documentation. His partnerships focus on educational impact and community value."
    
    if 'social media' in lowerMessage or 'linkedin posts' in lowerMessage:
        return "📱 Gaston's social media strategy includes LinkedIn thought leadership posts with thousands of views, cross-platform content syndication, and community engagement. His recent viral content includes Planetrics data visualization showcases and NASA project case studies."
    
    if 'tutorials' in lowerMessage or 'educational content' in lowerMessage:
        return "🎓 Gaston specializes in educational content that makes complex topics accessible. His tutorials cover AI/ML implementation, game development, data visualization, and web development. He focuses on practical, actionable content with step-by-step guides and real-world applications."
    
    if 'mentorship' in lowerMessage or 'community' in lowerMessage:
        return "👥 Gaston is actively involved in mentorship through Ambition in Motion (NSCS partnership) and ALPFA community. He creates content that supports aspiring developers, facilitates workshops, and builds meaningful connections in the tech community."
    
    if 'nasa' in lowerMessage or 'space' in lowerMessage or 'exoplanet' in lowerMessage:
        return "🚀 Gaston has worked on several NASA-related projects! His NASA Knowledge Graph maps biological data into Neo4j for astronaut health reasoning, Astro Archive uses memory-aware agents for space data, and Planetrics visualizes NASA's 6,000+ exoplanet catalog. His SESA proposal was submitted to NASA in 2025!"
    
    if 'rag' in lowerMessage or 'retrieval' in lowerMessage:
        return "🔍 Gaston is an expert in RAG (Retrieval-Augmented Generation) systems! He's implemented RAG in multiple projects like Peata (pet recovery), Relic (archaeological research), and others, combining document retrieval with generative AI to create context-aware assistants."
    
    if 'contact' in lowerMessage or 'reach' in lowerMessage or 'email' in lowerMessage:
        return "📧 You can reach Gaston through LinkedIn (https://www.linkedin.com/in/gaston-d-859653184/), GitHub (https://github.com/gastondana627), or the contact form on this website!"
    
    if 'project' in lowerMessage and ('main' in lowerMessage or 'top' in lowerMessage):
        return "🚀 Gaston's main AI projects include Peata (pet recovery), Relic (archaeological research), NASA Knowledge Graph, AI Room Designer, Planetrics (exoplanet dashboard), Astro Archive (space data agents), and Project Stargate (gaming mentorship). Each showcases different AI/ML capabilities!"
    
    return "That's an interesting question! Gaston has worked on many AI projects involving RAG systems, multi-agent architectures, and knowledge graphs. Could you be more specific about what you'd like to know?"

# ============================================
# API ENDPOINTS
# ============================================

@app.route("/api/projects", methods=["GET"])
def get_projects():
    """Fetch all projects and skills data"""
    try:
        return jsonify(mock_projects_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/chat", methods=["POST", "OPTIONS"])
def chat():
    """Chatbot endpoint with RAG support + injection defense"""
    
    if request.method == "OPTIONS":
        return "", 200
    
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        user_message = data.get('message', '').strip()
        portfolio_context = data.get('portfolio_context', 'main')
        
        if not user_message:
            return jsonify({"error": "Message is required"}), 400
        
        print(f"\n📞 Chat API called")
        print(f"User message: {user_message}")
        print(f"Portfolio context: {portfolio_context}")
        
        # ✅ PROMPT INJECTION DEFENSE
        if is_prompt_injection(user_message):
            print(f"🚨 BLOCKED: Potential prompt injection detected")
            return jsonify({
                "response": "I can only help with questions about Gaston's work and projects. Please ask something relevant.",
                "timestamp": datetime.now().isoformat(),
                "blocked": True,
                "reason": "Suspicious input pattern detected"
            }), 400
        
        # ✅ SANITIZE INPUT
        user_message = sanitize_user_input(user_message)
        
        ai_response = generate_ai_response(user_message, portfolio_context)
        
        print(f"[{datetime.now()}] User: {user_message}")
        print(f"[{datetime.now()}] Bot: {ai_response}")
        
        _, project_key = get_vectorstore_for_query(user_message)
        used_rag = project_key is not None and project_key in VECTORSTORES
        
        return jsonify({
            "response": ai_response,
            "timestamp": datetime.now().isoformat(),
            "used_rag": used_rag,
            "project": project_key if used_rag else None,
            "ai_provider": AI_PROVIDER,
            "ai_available": AI_AVAILABLE
        }), 200
        
    except Exception as e:
        print(f"❌ Chat endpoint error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({
            "response": "I'm having trouble processing your request right now. Please try again later!",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

@app.route("/", methods=["GET"])
def root():
    """Health check endpoint"""
    return jsonify({
        "status": "App is running!",
        "message": "Welcome to Gaston's API-powered portfolio backend.",
        "ai_available": AI_AVAILABLE,
        "ai_provider": AI_PROVIDER
    }), 200

@app.route("/health", methods=["GET"])
def health_check():
    """Detailed health check"""
    return jsonify({
        "health": "ok",
        "timestamp": datetime.now().isoformat(),
        "ai_available": AI_AVAILABLE,
        "ai_provider": AI_PROVIDER,
        "flask_port": 5000
    }), 200

@app.route("/api/analytics/track", methods=["POST", "OPTIONS"])
def track_analytics():
    """Analytics tracking endpoint for portfolio ecosystem"""
    
    if request.method == "OPTIONS":
        return "", 200
    
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        # Validate required fields
        required_fields = ['event_name', 'session_id', 'user_id', 'timestamp', 'portfolio']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Log analytics event (in production, this would go to a database)
        print(f"\n📊 Analytics Event Received:")
        print(f"Event: {data.get('event_name')}")
        print(f"Portfolio: {data.get('portfolio')}")
        print(f"Session: {data.get('session_id')}")
        print(f"Timestamp: {data.get('timestamp')}")
        
        # In a production environment, you would:
        # 1. Store the event in a database (MongoDB, PostgreSQL, etc.)
        # 2. Process the data for insights
        # 3. Implement data retention policies
        # 4. Add privacy compliance measures
        
        # For now, we'll just acknowledge receipt
        return jsonify({
            "status": "success",
            "message": "Analytics event tracked successfully",
            "timestamp": datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        print(f"❌ Analytics tracking error: {e}")
        return jsonify({
            "error": "Failed to track analytics event",
            "message": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

@app.route("/api/analytics/summary", methods=["GET"])
def get_analytics_summary():
    """Get analytics summary (placeholder for future implementation)"""
    try:
        # In production, this would query the analytics database
        # and return aggregated insights
        
        return jsonify({
            "status": "success",
            "message": "Analytics summary endpoint available",
            "note": "Full analytics implementation requires database setup",
            "timestamp": datetime.now().isoformat(),
            "available_endpoints": [
                "/api/analytics/track (POST) - Track events",
                "/api/analytics/summary (GET) - Get summary data"
            ]
        }), 200
        
    except Exception as e:
        print(f"❌ Analytics summary error: {e}")
        return jsonify({
            "error": "Failed to get analytics summary",
            "message": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

# ============================================
# APP EXECUTION
# ============================================

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 Starting Gaston's Portfolio Backend")
    print("="*60)
    print(f"✅ Flask running on port 5000")
    print(f"✅ AI Available: {AI_AVAILABLE}")
    print(f"✅ AI Provider: {AI_PROVIDER}")
    print(f"✅ Provider Rotation: 8hr OpenAI / 8hr Claude / 8hr Google (UTC)")
    print(f"✅ RAG enabled for 8 projects (lazy-loaded on query)")
    print(f"✅ Prompt injection defense: ACTIVE")
    print(f"✅ CORS enabled for:")
    print(f"   - http://localhost:3000 (dev frontend)")
    print(f"   - https://gastondana.vercel.app (prod)")
    print("="*60 + "\n")
    
    app.run(debug=True, port=5000)
