# ResumeAI Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel + Railway (Easiest)

#### Frontend (Vercel):
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set build directory to `frontend`
5. Deploy!

#### Backend (Railway):
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Add environment variable: `GOOGLE_API_KEY`
5. Deploy!

### Option 2: Docker Deployment

#### Local Docker:
```bash
# Build and run with docker-compose
docker-compose up --build
```

#### Cloud Docker (DigitalOcean, AWS, etc.):
1. Upload your code to a cloud server
2. Install Docker and Docker Compose
3. Run: `docker-compose up -d`

### Option 3: Manual Deployment

#### Frontend:
```bash
cd frontend
npm install
npm run build
# Upload dist/ folder to any static hosting
```

#### Backend:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 🔧 Environment Setup

### Required Environment Variables:
- `GOOGLE_API_KEY`: Your Google Gemini API key
- `CORS_ORIGINS`: Frontend URL for CORS

### Frontend Configuration:
Update `frontend/src/services/api-client.js` with your backend URL:
```javascript
export const apiClient = axios.create({
  baseURL: 'https://your-backend-url.com/api', // Change this
  timeout: 30000,
})
```

## 📋 Pre-deployment Checklist

- [ ] Set up Google Gemini API key
- [ ] Update CORS settings in backend
- [ ] Update API client URL in frontend
- [ ] Test locally with `npm run dev` and `uvicorn main:app`
- [ ] Build frontend with `npm run build`

## 🌐 Domain Configuration

### Custom Domain:
1. Buy a domain (Namecheap, GoDaddy, etc.)
2. Point DNS to your hosting provider
3. Update CORS settings with your domain

### SSL Certificate:
Most hosting providers offer free SSL certificates (Let's Encrypt)

## 📊 Monitoring & Maintenance

### Health Checks:
- Frontend: Check if site loads
- Backend: Visit `/docs` endpoint
- Database: Check if resume analysis works

### Logs:
- Vercel: Built-in logging
- Railway: Built-in logging
- Docker: `docker-compose logs`

## 💰 Cost Estimates

### Free Tiers:
- Vercel: Free for personal projects
- Railway: $5/month after free tier
- Netlify: Free for static sites

### Paid Options:
- AWS: $10-50/month
- DigitalOcean: $5-20/month
- Heroku: $7-25/month

## 🆘 Troubleshooting

### Common Issues:
1. **CORS errors**: Update CORS_ORIGINS in backend
2. **API key errors**: Check GOOGLE_API_KEY environment variable
3. **Build failures**: Check Node.js and Python versions
4. **Database errors**: Ensure database file permissions

### Support:
- Check logs in your hosting platform
- Test locally first
- Verify environment variables

