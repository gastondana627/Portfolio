# Gaston Dana - Portfolio Website

A modern, interactive portfolio website showcasing AI/ML projects, full-stack development work, and creative services. Features 8 projects including recent 2025 hackathon entries: Planetrics (NASA Exoplanet Dashboard) and AI Room Designer (Multi-modal Interior Design Platform).

## Features

- **Interactive Knowledge Graph** - Three.js-based 3D visualization with 8 project nodes and skill connections
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **3D Audio-Reactive Visualization** - Three.js prism that pulses to background music
- **Project Showcase** - Highlighting AI-powered solutions and innovative applications (8 featured projects)
- **Project Carousel** - Auto-rotating display synchronized with knowledge graph
- **Contact Form** - Integrated with Formspree for easy communication
- **Dark/Light Theme Toggle** - User preference support
- **Background Music Player** - With volume controls

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Three.js for 3D graphics
- Font Awesome icons
- Google Fonts (Poppins)

### Backend (Optional)
- Flask
- Flask-CORS
- Python 3.x

## Project Structure

```
.
├── index.html              # Main HTML file
├── style.css               # Styles and responsive design
├── script.js               # Main JavaScript functionality
├── graph.js                # Three.js audio-reactive visualization
├── thankyou.html           # Contact form success page
├── vercel.json             # Vercel deployment configuration
├── assets/                 # Images, audio, and other media
└── backend/                # Flask API (optional)
    ├── app.py
    └── requirements.txt
```

## Local Development

### Frontend Only

Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

### With Backend

1. Set up Python virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
python app.py
```

The API will be available at `http://localhost:5001`

## Deployment

### Vercel (Recommended for Frontend)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

The site is configured for static hosting via `vercel.json`.

## Featured Projects

The portfolio currently showcases 8 AI/ML projects:

1. **NASA Knowledge Graph** - RAG-powered research assistant
2. **Peata** - Emotional AI companion
3. **Teacher Management Chatbot** - Educational AI assistant
4. **Space for Health Challenge** - NASA health monitoring system
5. **Stargate** - Multi-agent orchestration platform
6. **SESA Proposal** - Space exploration research proposal
7. **Planetrics** (2025) - NASA Exoplanet Dashboard with live data visualization
8. **AI Room Designer** (2025) - Multi-modal interior design platform with Gemini 2.5 Flash

## Customization

- **Colors**: Update the gradient colors in `style.css` (currently purple to cyan)
- **Projects**: Edit project data in `backend/app.py` and `graph.js` fallback arrays
- **Carousel**: Update featured projects in `project-carousel.js`
- **Music**: Replace `assets/music_fx_a_trap_beat_with_a_heavy_bass_butwith_techno-2.wav`
- **Images**: Update images in the `assets/` folder

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

© 2025 Gaston Dana. All rights reserved.

## Contact

- LinkedIn: [Gaston Dana](https://www.linkedin.com/in/gaston-d-859653184/)
- GitHub: [@gastondana627](https://github.com/gastondana627)
