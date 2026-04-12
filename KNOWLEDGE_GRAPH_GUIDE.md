# Interactive Knowledge Graph Guide

## What We Built

A 3D interactive knowledge graph featuring:
- **Central Prism** - Audio-reactive, rotates continuously
- **Project Nodes** - Spheres orbiting the prism, color-coded by category
- **Connections** - Lines showing relationships between projects
- **Hover Tooltips** - Shows project name on hover
- **Click to Expand** - Zooms to node and shows elegant modal with details

## Features

### Audio Reactivity
- **Prism**: Pulses with bass, changes color with treble
- **Nodes**: Pulse gently with the music
- **Smooth**: All animations are smooth and elegant

### Interactions
1. **Hover** over any node → See project name in tooltip
2. **Click** a node → Camera zooms in, modal appears with:
   - Project title
   - Category badge
   - Description
   - Links (GitHub, Demo, More Info)
3. **Close** modal → Camera zooms back out

### Color Coding
- **Purple** (#8309D5) - AI Projects
- **Cyan** (#09C1D5) - Gaming
- **Green** (#00FF88) - Ethical Hacking

## How to Add New Projects

### Option 1: Via Backend (Recommended)

Edit `backend/app.py` and add to the `nodes` array:

```python
{
    "id": "unique_id",
    "group": "AI Projects",  # or "Gaming", "Ethical Hacking"
    "label": "Project Name",
    "description": "Brief description of the project",
    "links": [
        {"type": "github", "url": "https://github.com/..."},
        {"type": "demo", "url": "https://..."},
        {"type": "info", "url": "https://..."}
    ]
}
```

Add connections in the `links` array:
```python
{"source": "project1_id", "target": "project2_id"}
```

### Option 2: Frontend Fallback

If backend isn't running, edit the fallback data in `graph.js` (line ~70).

## Scaling

The graph automatically:
- Distributes nodes evenly in a circle
- Adjusts spacing based on number of projects
- Handles any number of connections
- Responsive to window resizing

## Customization

### Change Colors
Edit `groupColors` in `graph.js` (line ~50)

### Adjust Node Distance
Change `radius` value in `createProjectNodes()` (line ~80)

### Animation Speed
Modify rotation speeds in `animate()` function (line ~200)

### Modal Styling
Edit `graph-modal.css` for different look/feel

## Testing

1. Start backend: `cd backend && source venv/bin/activate && python app.py`
2. Start frontend: `python3 -m http.server 3000`
3. Visit: `http://localhost:3000`
4. Play music, hover nodes, click to explore!

## Troubleshooting

**Nodes not appearing?**
- Check browser console for errors
- Verify backend is running on port 5001
- Fallback data will load if backend unavailable

**Modal not showing?**
- Check that `graph-modal.css` is linked in `index.html`
- Verify Font Awesome is loaded for icons

**Audio not reactive?**
- Click the play button to start music
- Browser may block autoplay - user interaction required

## Future Enhancements

- [ ] Add search/filter functionality
- [ ] Implement force-directed layout option
- [ ] Add project tags/skills
- [ ] Timeline view of projects
- [ ] VR/AR mode for immersive exploration
