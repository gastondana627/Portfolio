Here's the README with clean, proper formatting:

```markdown
# Gaston Dana - AI Engineer Portfolio

An innovative, interactive portfolio website showcasing cutting-edge AI/ML projects and full-stack development expertise. Features a clickable 3D prism chatbot, dynamic favicon system, and immersive knowledge graph experience.

**Live Demo:** https://gastondana.vercel.app

---

## 🚀 Unique Features

### 🤖 AI-Powered Chatbot
- Clickable 3D Prism - Click the central prism in the knowledge graph to chat
- Claude 3.5 Sonnet Backend - Powered by Anthropic on Railway
- Intelligent Responses - Knows about all projects, skills, and experience
- Graceful Fallback - Works with local responses when backend unavailable
- Production-Ready - CORS-configured for Vercel + Railway deployment

### 🎨 Dynamic Favicon System
- 3 Rotating Fonts - Orbitron, Exo 2, Rajdhani
- Smart Selection - Based on date, time, and browser
- Canvas Generated - Real-time creation with brand colors
- Cross-Browser - Optimized for Chrome, Firefox, Safari

### 🌌 Interactive Knowledge Graph
- 3D Visualization - Three.js-based interactive exploration
- Audio-Reactive - Prism and nodes pulse to background music
- Cross-Component Sync - Graph ↔ Carousel ↔ Chatbot integration
- 8 Project Nodes - Color-coded by category with hover tooltips
- Evolution Paths - Visual connections showing project evolution

### 💫 Enhanced Experience
- Custom Cosmic Cursor - Trailing cursor with sparkle effects
- Project Carousel - Auto-rotating display synchronized with graph
- Responsive Design - Seamless experience across all devices
- Professional Polish - Mentorship credentials, early access programs

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript ES6+
- Three.js for 3D graphics and audio reactivity
- Claude API integration
- Dynamic canvas favicon generation
- Google Fonts (Space Grotesk, Poppins, Orbitron, Exo 2, Rajdhani)
- Font Awesome 6.0 icons
- Vercel deployment

### Backend
- Flask (Python)
- Anthropic Claude 3.5 Sonnet
- Auto-fallback: OpenAI GPT-4o / Google Gemini
- CORS: Explicit production domain configuration
- Railway deployment (Port 5000)

### Infrastructure
- Frontend: Vercel (global CDN)
- Backend: Railway (~$5/month)
- Production: https://gastondana.vercel.app
- API: https://portfolio-production-b1b4.up.railway.app/api

---

## 📁 Project Structure

```
.
├── index.html
├── style.css
├── script.js
├── graph.js
├── chatbot.js
├── chatbot.css
├── dynamic-favicon.js
├── project-carousel.js
├── cursor.js
├── assets/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
├── vercel.json
└── README.md
```

---

## 🚀 Quick Start

### Frontend Only

```
git clone https://github.com/gastondana627/Portfolio.git
cd Portfolio
open index.html

# Or use local server
python -m http.server 3000
```

Chatbot will use local fallback responses (very good!).

### Full Stack with AI Chatbot

#### Backend Setup

```
cd backend
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Add: ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE

python app.py
# API at http://localhost:5000
```

#### Frontend

```
open index.html
# Chatbot connects to http://localhost:5000/api/chat
```

#### Test

```
curl http://localhost:5000/health
curl http://localhost:5000/api/projects
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about Peata"}'
```

---

## 🌐 Deployment

### Frontend Only (Vercel)

```
npm i -g vercel
vercel
```

### Full Stack (Vercel + Railway)

**Backend to Railway:**
```
railway login
railway init
railway variables add ANTHROPIC_API_KEY=sk-ant-YOUR_KEY
railway up
```

**Frontend to Vercel:**
```
# Update chatbot.js API URL if needed
vercel
```

**Update CORS in Railway Backend:**
Ensure app.py includes:
- https://gastondana.vercel.app
- https://portfolio-jcqs164kp-gastondana627s-projects.vercel.app

---

## 🔧 Environment Variables

### Backend (.env)

```
ANTHROPIC_API_KEY=sk-ant-xxx
OPENAI_API_KEY=sk-xxx (optional fallback)
GOOGLE_API_KEY=xxx (optional fallback)
GOOGLE_CLOUD_PROJECT=sesa-trifecta-street-25
GOOGLE_CLOUD_LOCATION=us-central1
```

---

## 🎯 Featured Projects

### AI/ML
- AI Room Designer - Multi-modal interior design with Gemini 2.5 Flash
- Planetrics - NASA exoplanet dashboard (6,000+ planets)
- NASA Knowledge Graph - Biological data in Neo4j for astronauts
- Peata - RAG-backed pet recovery assistant
- Relic - AI archaeological research tool
- Astro Archive - Memory-aware coaching agents
- SESA - Multi-agent AI system (NASA proposal)

### Gaming
- Project Stargate - Gaming mentorship personas

### Professional
- Early Access Tester (Kaggle, Vercel)
- NASA Collaboration (SESA 2025)
- Mentorship (NSCS, ALPFA)
- 7+ Hackathons

---

## 🎨 Customization

### Branding
- Colors: Update gradients in style.css (#8309D5 → #09C1D5)
- Fonts: Modify dynamic-favicon.js font list
- Cursor: Customize cursor.js effects
- Navigation: Update index.html nav links

### Content
- Projects: Edit backend/app.py mock_projects_data
- Chatbot: Update PORTFOLIO_CONTEXT in app.py
- Carousel: Modify project-carousel.js
- Skills: Update mock_projects_data["skills"]

### Media
- Background Music: Replace assets/ audio
- Images: Update assets/ folder
- Profile Photos: Replace images

---

## 🌟 Innovation Highlights

### Dynamic Favicon Portfolio
- 3 font rotation (Orbitron, Exo 2, Rajdhani)
- Smart selection based on visitor timing
- Canvas real-time generation

### Clickable 3D Prism Chatbot
- Unique interaction model
- Claude 3.5 Sonnet integration
- Context-aware responses
- Production Railway deployment

### Cross-Component Sync
- Graph ↔ Carousel integration
- Chatbot context awareness
- Seamless project exploration

### Rapid Prototyping
- 72-hour full-stack ship
- Multi-platform deployment
- Offensive engineering approach

---

## 🌐 Browser Support

- Chrome (Latest) - Full support
- Firefox (Latest) - Full support
- Safari (Latest) - Optimized favicon handling
- Edge (Latest) - Full support
- Mobile - Responsive design

---

## 📊 Performance

- Lighthouse Score: 95+
- Three.js optimized rendering
- Lazy loading for resources
- API response time: < 500ms
- Graceful degradation without JavaScript

---

## 🔮 Roadmap

### v2.0 (Next)
- Tab-based filtering (AI/ML, Gaming, Space, Full-Stack)
- Node highlighting on filter
- Improved hover tooltips
- Tour mode with narration

### v3.0
- Separate content creation portfolio
- RAG integration for documentation
- Real-time updates
- Analytics dashboard

---

## 📄 License

© 2025 Gaston Dana. All rights reserved.

---

## 🤝 Connect

- LinkedIn: https://www.linkedin.com/in/gaston-d-859653184/
- GitHub: https://github.com/gastondana627
- Portfolio: https://gastondana.vercel.app
- Email: Available through website contact form

---

**Built with innovation, powered by AI, designed for impact.** 🚀

*Shipped in 72 hours. Deployed across three platforms. Offensive engineering at scale.*