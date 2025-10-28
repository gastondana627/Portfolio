# Gaston Dana - Portfolio Website

A modern, interactive portfolio website showcasing AI/ML projects, full-stack development work, and creative services.

## Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **3D Audio-Reactive Visualization** - Three.js cube that pulses to background music
- **Project Showcase** - Highlighting AI-powered solutions and innovative applications
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

## Customization

- **Colors**: Update the gradient colors in `style.css` (currently purple to cyan)
- **Projects**: Edit the project cards in `index.html`
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
