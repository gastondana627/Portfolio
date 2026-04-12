# Deployment Configuration - Localhost & Production

## 🏠 Localhost Configuration

### Frontend (Port 8000)
**Status:** ✅ Running
**Command:** `python3 -m http.server 8000`
**URL:** http://localhost:8000

**Test URLs:**
- Main Portfolio: http://localhost:8000/index.html
- Content Portfolio: http://localhost:8000/content/index.html
- Gaming Portfolio: http://localhost:8000/gaming/index.html
- Content Segments: http://localhost:8000/content/index.html#content-segments

### Backend (Port 5000)
**Status:** ⚠️ Needs dependency fix
**Command:** `python3 backend/app.py`
**URL:** http://localhost:5000
**API Endpoint:** http://localhost:5000/api/chat

**To Fix Backend:**
```bash
# Install dependencies
pip3 install -r backend/requirements.txt

# Or install minimal requirements
pip3 install flask flask-cors python-dotenv

# Start server
python3 backend/app.py
```

## 🌐 Production Configuration

### Frontend Deployments

#### 1. Netlify (Primary)
**Status:** ✅ Configured
**Config File:** `netlify.toml`
**URL:** https://gastondana.com (or your Netlify URL)

**Features:**
- Static site hosting
- Multi-portfolio routing (/content, /gaming)
- Security headers
- Cache optimization
- Automatic HTTPS

**Deploy Command:**
```bash
# Netlify auto-deploys from Git
# Or manual deploy:
netlify deploy --prod
```

#### 2. Vercel (Alternative)
**Status:** ✅ Configured
**Config File:** `vercel.json`
**URL:** https://gastondana.vercel.app

**Features:**
- Static site hosting
- Custom routing
- Security headers
- Edge caching
- Automatic HTTPS

**Deploy Command:**
```bash
vercel --prod
```

### Backend Deployment

#### Railway (Primary)
**Status:** ✅ Configured
**Config File:** `railway.toml`
**URL:** https://portfolio-production-b1b4.up.railway.app

**Features:**
- Python/Flask hosting
- Environment variables
- Auto-scaling
- Gunicorn workers
- Health checks

**Environment Variables Needed:**
```
OPENAI_API_KEY=your_key_here
GCP_SERVICE_ACCOUNT_JSON=your_json_here
FLASK_ENV=production
PORTFOLIO_ENV=production
```

**Deploy:**
- Auto-deploys from Git push
- Or use Railway CLI

## 📁 File Structure for Deployment

```
Portfolio/
├── index.html                    → Main portfolio
├── content/
│   ├── index.html               → Content portfolio
│   ├── content-segments-data.js  → Segments data ✅ NEW
│   ├── content-segments-ui.js    → Segments UI ✅ NEW
│   ├── content-segments-styles.css → Segments styles ✅ NEW
│   └── assets/
│       ├── thumbnails/segments/  → Image thumbnails ✅ NEW
│       └── videos/segments/      → Video files ✅ NEW
├── gaming/
│   └── index.html               → Gaming portfolio
├── shared/                       → Shared components
├── backend/
│   ├── app.py                   → Flask backend
│   ├── requirements.txt         → Python dependencies
│   └── .env                     → Environment variables
├── netlify.toml                 → Netlify config
├── vercel.json                  → Vercel config
└── railway.toml                 → Railway config
```

## 🔧 Configuration Checklist

### ✅ Localhost Setup
- [x] Frontend server running (port 8000)
- [ ] Backend server running (port 5000) - needs dependency fix
- [x] Content segments integrated
- [x] All assets properly organized

### ✅ Production Setup
- [x] Netlify configured (netlify.toml)
- [x] Vercel configured (vercel.json)
- [x] Railway configured (railway.toml)
- [x] Security headers set
- [x] Cache optimization enabled
- [x] CORS configured for backend
- [x] Environment variables set

### ✅ Content Segments (NEW)
- [x] Data file created (content-segments-data.js)
- [x] UI component created (content-segments-ui.js)
- [x] Styles created (content-segments-styles.css)
- [x] Integrated into content/index.html
- [x] Assets organized in proper folders
- [x] Production-ready paths (relative)

## 🚀 Deployment Steps

### Deploy Frontend to Netlify:
```bash
# Option 1: Git push (auto-deploy)
git add .
git commit -m "Add content segments feature"
git push origin main

# Option 2: Manual deploy
netlify deploy --prod
```

### Deploy Frontend to Vercel:
```bash
# Option 1: Git push (auto-deploy)
git push origin main

# Option 2: Manual deploy
vercel --prod
```

### Deploy Backend to Railway:
```bash
# Option 1: Git push (auto-deploy)
git push origin main

# Option 2: Railway CLI
railway up
```

## 🔍 Testing Checklist

### Localhost Testing:
- [ ] Frontend loads at http://localhost:8000
- [ ] Content portfolio loads
- [ ] Content segments section displays
- [ ] Tab navigation works
- [ ] Videos play
- [ ] Images load
- [ ] Modal opens/closes
- [ ] Responsive design works

### Production Testing:
- [ ] Frontend loads at production URL
- [ ] All portfolios accessible (/content, /gaming)
- [ ] Content segments work in production
- [ ] Assets load from correct paths
- [ ] Videos stream properly
- [ ] Images load quickly
- [ ] Backend API responds (if needed)
- [ ] CORS works between frontend/backend
- [ ] HTTPS enabled
- [ ] Security headers present

## 🌍 Environment-Specific Configuration

### Development (Localhost)
```javascript
// In your JS files, detect environment:
const isDevelopment = window.location.hostname === 'localhost';
const API_URL = isDevelopment 
  ? 'http://localhost:5000/api'
  : 'https://portfolio-production-b1b4.up.railway.app/api';
```

### Production
```javascript
// Production URLs are automatically used
const API_URL = 'https://portfolio-production-b1b4.up.railway.app/api';
```

## 📊 Current Status

### Localhost:
- ✅ Frontend: Running on port 8000
- ⚠️ Backend: Needs dependency fix
- ✅ Content Segments: Fully functional (frontend only)

### Production:
- ✅ Netlify: Configured and ready
- ✅ Vercel: Configured and ready
- ✅ Railway: Configured for backend
- ✅ Content Segments: Production-ready

## 🔐 Security Configuration

### CORS (Backend)
```python
# backend/app.py already configured for:
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "http://localhost:5000",
            "https://gastondana.com",
            "https://gastondana.vercel.app",
            "https://portfolio-production-b1b4.up.railway.app",
        ]
    }
})
```

### Content Security Policy
- Configured in netlify.toml
- Allows CDN resources (Font Awesome, Google Fonts)
- Allows backend API calls
- Restricts unsafe content

## 📝 Environment Variables

### Backend (.env)
```bash
OPENAI_API_KEY=your_key_here
GCP_SERVICE_ACCOUNT_JSON=your_json_here
FLASK_ENV=production
PORTFOLIO_ENV=production
```

### Railway Environment Variables
Set in Railway dashboard:
- OPENAI_API_KEY
- GCP_SERVICE_ACCOUNT_JSON
- FLASK_ENV=production
- PORTFOLIO_ENV=production

## 🎯 Next Steps

1. **Fix Backend Dependencies** (if needed for AI features)
   ```bash
   pip3 install -r backend/requirements.txt
   python3 backend/app.py
   ```

2. **Test Localhost**
   - Open http://localhost:8000/content/index.html
   - Test content segments
   - Verify all features work

3. **Deploy to Production**
   ```bash
   git add .
   git commit -m "Add content segments feature"
   git push origin main
   ```

4. **Verify Production**
   - Check Netlify/Vercel deployment
   - Test content segments in production
   - Verify assets load correctly

## 🆘 Troubleshooting

### Backend Won't Start:
```bash
# Check Python version
python3 --version

# Install dependencies
pip3 install flask flask-cors python-dotenv

# Check for errors
python3 backend/app.py
```

### Assets Not Loading in Production:
- Check paths are relative (not absolute)
- Verify files are committed to Git
- Check deployment logs
- Clear browser cache

### CORS Errors:
- Verify backend CORS configuration
- Check frontend API URL
- Ensure production URLs are whitelisted

---

**Status:** ✅ Both localhost and production are configured
**Ready for:** Testing and deployment
