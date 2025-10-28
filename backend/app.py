# backend/app.py

from flask import Flask, jsonify
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing (CORS)
# This is crucial to allow your Vercel frontend to talk to this API
CORS(app)

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

# --- API ENDPOINT ---
@app.route("/api/projects")
def get_projects():
    """
    This endpoint returns the mock project data as a JSON object.
    """
    return jsonify(mock_projects_data)

# This allows the file to be run directly using "python app.py"
if __name__ == '__main__':
    # Running on port 5001 to avoid conflicts with other common ports
    app.run(debug=True, port=5001)
    