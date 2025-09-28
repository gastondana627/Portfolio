# backend/app.py

from flask import Flask, jsonify
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing (CORS)
# This is crucial to allow your Vercel frontend to talk to this API
CORS(app)

# --- HARDCODED PROJECT DATA ---
# This is a placeholder that mimics the data you'll eventually pull from Neo4j.
mock_projects_data = {
    "nodes": [
        # AI Projects Constellation
        {"id": "peata", "group": "AI Projects", "label": "Peata - AI Pet Reunification"},
        {"id": "relic", "group": "AI Projects", "label": "Relic - AI Archaeological Study"},
        {"id": "astro_archive", "group": "AI Projects", "label": "Astro Archive"},

        # Gaming Constellation
        {"id": "stargate", "group": "Gaming", "label": "Project Stargate and Bobot"},
        {"id": "king_of_meat", "group": "Gaming", "label": "King of Meat (QA Testing)"},

        # Ethical Hacking Constellation
        {"id": "knowhax", "group": "Ethical Hacking", "label": "KnowHax 2025 Challenge"},
        {"id": "sesa", "group": "Ethical Hacking", "label": "SESA Project Proposal"}
    ],
    "links": [
        # Connections within AI Projects
        {"source": "peata", "target": "relic"},
        {"source": "relic", "target": "astro_archive"},
        
        # Connections within Gaming
        {"source": "stargate", "target": "king_of_meat"},

        # Connections within Ethical Hacking
        {"source": "knowhax", "target": "sesa"}
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
    