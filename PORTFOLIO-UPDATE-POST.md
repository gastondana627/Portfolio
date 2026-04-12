# Portfolio Update - Learning Through Building

I've been so caught up in project work that I forgot to share some improvements to my portfolio/website. Lots of cool updated areas to match my current roles, but I found myself tinkering with Knowledge Graphs of course. I utilized what I learned from another creative & interactive project that's in the woodworks for my Knowledge graph area.

It's pretty cool to see all the nodes connected to the data on the page. When clicked, you get redirected to more information about that project's specifics, and there's a little Bobot friend to help you throughout understanding each of these previous projects of mine. Plus, it helps me as well when I come back for future updates on each of them. I'd say the coolest thing is the prompt injection defense I applied for the Bobot. Awesome stuff.

---

## What I Built & What I Learned

### The Knowledge Graph Journey
Working on another project taught me a lot about data visualization and 3D interactions. I wanted to apply those lessons to something personal—my own portfolio. The result is an interactive 3D knowledge graph where each project is a node, and the connections show how they relate to each other.

**What I learned:**
- Three.js for WebGL rendering (still learning the performance optimization tricks)
- Raycasting for detecting which node you're hovering over
- How to make 3D interactions feel natural on both desktop and mobile

### Building Bobot (The Portfolio Assistant)
I wanted visitors to be able to ask questions about my projects without having to dig through everything. So I built a RAG-powered chatbot that knows the context of each project.

**The tech behind it:**
- **LangChain** for orchestrating the AI workflow
- **ChromaDB** for storing project embeddings
- **Google Vertex AI** for the language model
- **Flask backend** to handle the API requests

**The security challenge:**
The most interesting part was implementing prompt injection defense. I didn't want someone to trick the bot into ignoring its instructions or revealing system prompts. I built a pattern-matching system that catches common injection attempts before they reach the LLM. It's not perfect, but it's been a great learning experience in AI security.

### Tech Stack Choices (And Why)

I went with **vanilla JavaScript** instead of React or Vue. Why? I wanted to understand the fundamentals first. No framework magic—just me, the DOM, and a lot of trial and error. Plus, the performance is noticeably better with a smaller bundle size.

**Backend:** Flask felt right for this. It's lightweight, I know Python well, and it integrates seamlessly with the AI/ML libraries I'm using.

**Deployment:** Railway for the backend (auto-scaling is nice), and the frontend is static files that can be hosted anywhere. Keeping it simple.

### What I'm Still Learning

- **Performance optimization** - The 3D graph can get heavy with too many nodes
- **Mobile interactions** - Touch controls are trickier than I thought
- **AI response quality** - Tuning the RAG system to give better answers
- **Security hardening** - There's always more to learn about protecting APIs

### The Honest Truth

This portfolio has been rebuilt probably 5 times. Each time I learn something new and want to apply it. Sometimes I over-engineer things. Sometimes I realize I should've kept it simpler. But that's the process, right?

The knowledge graph? Probably overkill for a portfolio. But I learned a ton building it, and now I can apply those skills to client projects where 3D visualization actually makes sense.

---

## Tech Stack Overview

**Frontend:**
- Vanilla JavaScript (no frameworks)
- Three.js for 3D rendering
- HTML5/CSS3 with modern features

**Backend:**
- Python 3.12 + Flask
- LangChain for AI orchestration
- ChromaDB for vector storage
- Google Vertex AI for LLM

**AI/ML:**
- RAG (Retrieval-Augmented Generation)
- Vector embeddings for semantic search
- Prompt injection defense patterns
- Context-aware responses

**Deployment:**
- Railway (backend)
- Static hosting (frontend)
- Google Cloud Platform (AI services)

**Security:**
- CORS configuration
- Security headers (CSP, HSTS, XSS protection)
- Input validation and sanitization
- Rate limiting on API endpoints

---

## What's Next

I'm working on the content creation and gaming sections of the portfolio. Each one will have its own flavor while sharing the same underlying architecture. The goal is to show different sides of what I do—tech, content, and gaming—all in one place.

Also planning to write more about the specific challenges I faced building this. Things like:
- How I structured the RAG system
- The prompt injection defense implementation
- Optimizing Three.js performance
- Making 3D interactions work on mobile

---

## Try It Out

Check it out at [gastondana.com](https://gastondana.com)

The knowledge graph is the centerpiece—click on any project node to learn more. And feel free to chat with Bobot about any of the projects. I'm curious to see what questions people ask.

**Feedback welcome!** I'm always learning and improving this thing.

---

*P.S. - If you're building something similar or have questions about any of the tech I used, feel free to reach out. Happy to share what I learned (and what I'm still figuring out).*
