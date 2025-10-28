# Gaston Dana - AI Engineer Portfolio

An innovative, interactive portfolio website showcasing cutting-edge AI/ML projects and full-stack development expertise. Features a **clickable 3D prism chatbot**, **dynamic favicon system**, and immersive knowledge graph experience.

## 🚀 Unique Features

### **🤖 AI-Powered Chatbot**
- **Clickable 3D Prism** - Click the central prism in the knowledge graph to chat with an AI assistant
- **Google Cloud Vertex AI** - Powered by Gemini 1.5 Flash with portfolio context
- **Intelligent Responses** - Knows about all projects, skills, and experience
- **Graceful Fallback** - Works with local responses when cloud unavailable

### **🎨 Dynamic Favicon System**
- **3 Rotating Fonts** - Orbitron, Exo 2, and Rajdhani fonts rotate per visitor
- **Smart Selection** - Based on date, time, and browser characteristics
- **Canvas Generated** - Real-time favicon creation with brand colors
- **Cross-Browser** - Optimized for Chrome, Firefox, and Safari

### **🌌 Interactive Knowledge Graph**
- **3D Visualization** - Three.js-based interactive project exploration
- **Audio-Reactive** - Prism and nodes pulse to background music
- **Cross-Component Sync** - Graph ↔ Carousel ↔ Chatbot integration
- **8 Project Nodes** - Color-coded by category with hover tooltips

### **💫 Enhanced Experience**
- **Custom Cosmic Cursor** - Trailing cursor with sparkle effects (desktop)
- **Project Carousel** - Auto-rotating display synchronized with graph
- **Responsive Design** - Seamless experience across all devices
- **Professional Polish** - Mentorship credentials, early access programs

## 🛠️ Tech Stack

### **Frontend**
- **Core**: HTML5, CSS3, JavaScript ES6+
- **3D Graphics**: Three.js for knowledge graph and audio reactivity
- **AI Integration**: Google Cloud Vertex AI (Gemini 1.5 Flash)
- **Canvas**: Dynamic favicon generation with real-time rendering
- **Fonts**: Google Fonts (Space Grotesk, Poppins, Orbitron, Exo 2, Rajdhani)
- **Icons**: Font Awesome 6.0

### **Backend (Optional)**
- **API**: Flask with CORS support
- **AI**: Google Cloud Vertex AI integration
- **Authentication**: Google Cloud Application Default Credentials
- **Deployment**: Optimized for Google Cloud Run

## 📁 Project Structure

```
.
├── index.html              # Main portfolio page
├── style.css               # Responsive design and cosmic theme
├── script.js               # Core functionality and interactions
├── graph.js                # Three.js knowledge graph with audio reactivity
├── chatbot.js              # AI chatbot with Vertex AI integration
├── chatbot.css             # Chatbot UI styling
├── dynamic-favicon.js      # Dynamic favicon system with font rotation
├── project-carousel.js     # Synchronized project carousel
├── cursor.js               # Custom cosmic cursor effects
├── assets/                 # Images, audio, and media files
├── backend/                # Flask API with Google Cloud integration
│   ├── app.py              # Vertex AI chatbot endpoint
│   └── requirements.txt    # Python dependencies
├── test-favicon.html       # Favicon testing and preview
├── favicon-debug.html      # Favicon debugging tools
└── vercel.json             # Static deployment configuration
```

## 🚀 Quick Start

### **Frontend Only (Recommended)**
```bash
# Clone the repository
git clone https://github.com/gastondana627/Portfolio.git
cd Portfolio

# Open in browser (or use local server)
open index.html

# Or use a local server
python -m http.server 3000
# Visit http://localhost:3000
```

### **Full Stack with AI Chatbot**
```bash
# 1. Set up Google Cloud authentication
gcloud auth application-default login
gcloud config set project sesa-trifecta-street-25

# 2. Install backend dependencies
cd backend
pip install -r requirements.txt

# 3. Run the Flask API
python app.py
# API available at http://localhost:3001

# 4. Open frontend
cd ..
open index.html
```

### **Testing Features**
```bash
# Test dynamic favicon variations
open test-favicon.html

# Debug favicon issues
open favicon-debug.html

# Test chatbot responses
python test_chatbot.py
```

## 🌐 Deployment

### **Frontend (Vercel - Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy with one command
vercel

# The site is configured for static hosting via vercel.json
# Chatbot will use local fallback responses (still very good!)
```

### **Full Stack (Google Cloud)**
```bash
# Deploy backend to Cloud Run
gcloud run deploy portfolio-chatbot \
  --source ./backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Update frontend API URLs to point to Cloud Run
# Deploy frontend to Vercel as above
```

### **Alternative Backends**
- **Railway** (~$5/month) - Supports private repos
- **Heroku** (~$7/month) - Easy deployment
- **Local Development** - Backend runs on localhost:3001

## 🎯 Featured Projects

### **AI/ML Projects**
1. **AI Room Designer** - Multi-modal interior design with Gemini 2.5 Flash, Fal.ai 3D reconstruction
2. **Planetrics** - Interactive NASA exoplanet dashboard (6,000+ planets) with live API data
3. **NASA Knowledge Graph** - Biological data mapping in Neo4j for astronaut health research
4. **Peata** - RAG-backed pet recovery assistant with image-matching capabilities
5. **Relic** - AI archaeological research tool using satellite and geospatial data
6. **Astro Archive** - Memory-aware coaching agents with context switching
7. **SESA** - Multi-agent AI system proposal (submitted to NASA)

### **Gaming & Interactive**
8. **Project Stargate** - Gaming mentorship personas with AI-powered coaching

### **Professional Highlights**
- **Early Access Tester** - Kaggle and Vercel beta programs
- **NASA Collaboration** - First SESA proposal submitted (2025)
- **Mentorship** - Active through NSCS and ALPFA partnerships
- **7+ Hackathons** - Multiple placements and innovative solutions

## 🎨 Customization

### **Branding**
- **Colors**: Update gradient colors in `style.css` (currently purple #8309D5 to cyan #09C1D5)
- **Favicon Fonts**: Modify font list in `dynamic-favicon.js` 
- **Cursor Effects**: Customize cosmic cursor in `cursor.js`

### **Content**
- **Projects**: Edit project data in `backend/app.py` and `graph.js` fallback arrays
- **Chatbot Knowledge**: Update `PORTFOLIO_CONTEXT` in `backend/app.py`
- **Carousel**: Modify featured projects in `project-carousel.js`

### **Media**
- **Background Music**: Replace audio file in `assets/` folder
- **Project Images**: Update images in `assets/` folder
- **Profile Photos**: Replace profile images

### **AI Integration**
- **Google Cloud Project**: Update project ID in `backend/app.py`
- **Chatbot Responses**: Customize local fallbacks in `chatbot.js`
- **Model Selection**: Change Vertex AI model in backend

## 🌟 Innovation Highlights

### **World's First Dynamic Favicon Portfolio**
- **3 Font Rotation**: Orbitron, Exo 2, Rajdhani
- **Smart Selection**: Based on visitor timing and browser
- **Canvas Generated**: Real-time creation with brand colors

### **Clickable 3D Prism Chatbot**
- **Unique Interaction**: Click the central prism to chat
- **AI-Powered**: Google Cloud Vertex AI integration
- **Context-Aware**: Knows about all projects and experience

### **Cross-Component Synchronization**
- **Graph ↔ Carousel**: Click nodes to update carousel
- **Carousel ↔ Graph**: Click cards to zoom to nodes
- **Chatbot Integration**: Ask about any project or skill

## 🌐 Browser Support

- **Chrome/Edge** (latest) - Full experience with all effects
- **Firefox** (latest) - Complete functionality
- **Safari** (latest) - Optimized favicon handling
- **Mobile browsers** - Responsive design, touch-friendly

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Three.js Optimized**: Efficient rendering and cleanup
- **Lazy Loading**: Images and resources load on demand
- **Graceful Degradation**: Works without JavaScript

## 📄 License

© 2025 Gaston Dana. All rights reserved.

## 🤝 Connect

- **LinkedIn**: [Gaston Dana](https://www.linkedin.com/in/gaston-d-859653184/)
- **GitHub**: [@gastondana627](https://github.com/gastondana627)
- **Portfolio**: [Live Demo](https://your-vercel-url.vercel.app)
- **Email**: Available through website contact form

---

**Built with innovation, powered by AI, designed for impact.** 🚀
