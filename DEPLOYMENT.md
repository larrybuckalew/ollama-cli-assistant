# 🚀 Deployment Guide

This guide covers deploying the Ollama CLI Assistant to production. The project consists of three main components that can be deployed independently.

## 📋 Deployment Overview

| Component | Technology | Recommended Platform | Status |
|-----------|------------|---------------------|--------|
| **Web UI** | Next.js 16 | Vercel (Free) | ✅ Ready |
| **Backend API** | FastAPI (Python) | Railway/Render | ✅ Ready |
| **CLI Tool** | Python Script | GitHub Releases | ✅ Ready |

---

## 🌐 1. Deploy Next.js Web UI to Vercel

### Prerequisites
- GitHub account connected to Vercel
- Project pushed to GitHub

### Steps

1. **Connect to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login
   ```

2. **Deploy from GitHub**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub account
   - Select `ollama-cli-assistant` repository
   - Vercel will auto-detect Next.js and deploy

3. **Configure Environment Variables**
   In Vercel dashboard → Project Settings → Environment Variables:
   ```
   OLLAMA_API_URL=https://your-backend-url.com
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

4. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain

### Expected Result
- ✅ Web UI available at `https://your-project.vercel.app`
- ✅ Automatic deployments on git push
- ✅ Free tier includes custom domains

---

## 🐍 2. Deploy Python Backend to Railway

### Option A: Railway (Recommended)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy from GitHub**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login
   railway login

   # Link project
   cd backend
   railway link

   # Deploy
   railway up
   ```

3. **Set Environment Variables**
   ```bash
   railway variables set SECRET_KEY=your-secret-key
   railway variables set GOOGLE_CLIENT_ID=your-google-client-id
   railway variables set GOOGLE_CLIENT_SECRET=your-google-client-secret
   # ... set other OAuth and Stripe variables
   ```

### Option B: Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)

2. **Deploy Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Set build settings:
     - **Runtime**: Python 3
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Configure Environment**
   - Add all required environment variables
   - Set instance type (Free tier available)

### Expected Result
- ✅ Backend API available at `https://your-backend.onrender.com`
- ✅ Database automatically created
- ✅ Environment variables configured

---

## 💻 3. Distribute CLI Tool via GitHub Releases

The CLI doesn't need server deployment - it's distributed as a downloadable script.

### Create GitHub Release

1. **Go to GitHub Repository**
   - Navigate to Releases → Create new release

2. **Create Release**
   ```
   Tag version: v1.0.0
   Release title: Ollama CLI Assistant v1.0.0
   Description: Complete AI assistant with CLI and web interfaces
   ```

3. **Add Release Assets**
   - Upload `ollama-cli.py`
   - Upload `requirements.txt`
   - Users can download and run locally

### Usage Instructions for Users
```bash
# Download and run
curl -O https://github.com/larrybuckalew/ollama-cli-assistant/releases/download/v1.0.0/ollama-cli.py
pip install -r requirements.txt
python ollama-cli.py
```

---

## 🔧 4. Environment Variables Setup

### Web UI (Vercel)
```
OLLAMA_API_URL=https://your-backend-url.com
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Backend (Railway/Render)
```
SECRET_KEY=your-super-secret-key-here
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
MICROSOFT_CLIENT_ID=your-microsoft-oauth-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-oauth-client-secret
GITHUB_CLIENT_ID=your-github-oauth-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-client-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
```

### OAuth Redirect URIs
Configure these in your OAuth provider dashboards:
- **Google**: `https://your-backend.com/auth/callback/google`
- **Microsoft**: `https://your-backend.com/auth/callback/microsoft`
- **GitHub**: `https://your-backend.com/auth/callback/github`

---

## 🧪 5. Testing Deployments

### Test Web UI
```bash
# Test homepage
curl https://your-vercel-app.vercel.app

# Test API endpoint
curl https://your-vercel-app.vercel.app/api/chat
```

### Test Backend API
```bash
# Test backend health
curl https://your-backend.com/

# Test user registration
curl -X POST https://your-backend.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test CLI Tool
```bash
# Download and test
python ollama-cli.py --help
python ollama-cli.py --list-models
```

---

## 💰 Cost Estimates

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Vercel** | ✅ Unlimited | $20/month (Pro) |
| **Railway** | ✅ $5/month credit | $5+/month |
| **Render** | ✅ 750 hours/month | $7+/month |
| **GitHub** | ✅ Unlimited | N/A |

---

## 🔄 CI/CD Pipeline

All platforms support automatic deployments:

- **Vercel**: Deploys on every push to main
- **Railway**: Deploys on every push to main
- **Render**: Deploys on every push to main
- **GitHub Releases**: Manual or automated releases

---

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables are set
   - Verify package.json/requirements.txt are correct
   - Check build logs in deployment dashboard

2. **API Connection Issues**
   - Verify backend URL in web UI environment variables
   - Check CORS settings in backend
   - Test API endpoints directly

3. **OAuth Issues**
   - Verify redirect URIs match exactly
   - Check environment variables are set correctly
   - Test OAuth flow in development first

### Support
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- FastAPI Docs: https://fastapi.tiangolo.com

---

## 🎉 Post-Deployment Checklist

- [ ] Web UI deployed and accessible
- [ ] Backend API responding correctly
- [ ] Environment variables configured
- [ ] OAuth providers configured
- [ ] Stripe payments working (if enabled)
- [ ] CLI tool downloadable
- [ ] All links in README updated
- [ ] Domain configured (optional)
- [ ] SSL certificates working
- [ ] Monitoring/alerts set up (optional)

**Your Ollama CLI Assistant is now live! 🚀**