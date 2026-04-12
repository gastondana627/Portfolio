# Google Cloud Platform Setup for Portfolio Chatbot

This guide will help you set up Google Cloud Platform (GCP) integration for your portfolio chatbot using Vertex AI.

## Prerequisites

- Google Cloud Platform account
- Project ID: `sesa-trifecta-street-25`
- Project Number: `362559111577`

## Setup Steps

### 1. Enable Required APIs

In your GCP Console, enable these APIs:
- Vertex AI API
- AI Platform API
- Cloud Resource Manager API

```bash
gcloud services enable aiplatform.googleapis.com
gcloud services enable ml.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com
```

### 2. Set up Authentication

#### Option A: Service Account (Recommended for Production)
1. Go to IAM & Admin > Service Accounts
2. Create a new service account
3. Grant these roles:
   - Vertex AI User
   - AI Platform Developer
4. Create and download a JSON key
5. Set environment variable:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"
   ```

#### Option B: User Account (Development)
```bash
gcloud auth application-default login
```

### 3. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 4. Environment Variables

Create a `.env` file in the backend directory:
```env
GOOGLE_CLOUD_PROJECT=sesa-trifecta-street-25
GOOGLE_CLOUD_PROJECT_NUMBER=362559111577
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account-key.json
```

### 5. Test the Setup

Run the backend:
```bash
cd backend
python app.py
```

Test the chatbot endpoint:
```bash
curl -X POST http://localhost:5001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about Gaston'\''s AI projects"}'
```

## Deployment Options

### Vercel (Frontend)
Your frontend can be deployed to Vercel as usual. The chatbot will work with local fallback responses if the backend isn't available.

### Google Cloud Run (Backend)
1. Create a `Dockerfile` in the backend directory:
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
```

2. Deploy to Cloud Run:
```bash
gcloud run deploy portfolio-chatbot \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Railway/Heroku (Alternative)
The backend can also be deployed to Railway or Heroku with the GCP credentials as environment variables.

## Cost Considerations

- Vertex AI Gemini models have usage-based pricing
- Typical costs for a portfolio chatbot: $0.01-$0.10 per day
- Set up billing alerts in GCP Console

## Troubleshooting

### Common Issues:

1. **Authentication Error**
   - Verify GOOGLE_APPLICATION_CREDENTIALS path
   - Check service account permissions

2. **API Not Enabled**
   - Enable Vertex AI API in GCP Console
   - Wait 5-10 minutes for propagation

3. **Quota Exceeded**
   - Check Vertex AI quotas in GCP Console
   - Request quota increase if needed

4. **Local Fallback**
   - If GCP fails, the chatbot uses local responses
   - Check backend logs for specific errors

## Security Notes

- Never commit service account keys to version control
- Use environment variables for all credentials
- Consider using Workload Identity for GKE deployments
- Implement rate limiting for production use

## Model Options

Current setup uses `gemini-1.5-flash-001`. You can also try:
- `gemini-1.5-pro-001` (more capable, higher cost)
- `text-bison@001` (PaLM 2, lower cost)

Update the model name in `backend/app.py` if needed.