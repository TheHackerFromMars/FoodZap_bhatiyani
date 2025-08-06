# RestaurantFlow_bhatiyani Deployment Guide

## 🚀 Live Deployment URLs

**Frontend (React)**: https://restaurant-flow-bhatiyani-frontend.vercel.app  
**Backend (Flask API)**: https://restaurant-flow-bhatiyani-backend.railway.app

## 📋 Quick Deploy Instructions

### Backend Deployment (Railway)

1. **Connect to Railway**:
   ```bash
   cd backend/
   # Install Railway CLI: npm install -g @railway/cli
   railway login
   railway init
   railway up
   ```

2. **Environment Variables**: No additional env vars needed for this demo

3. **Domain**: Railway auto-generates domain like `https://restaurant-flow-bhatiyani-backend.railway.app`

### Frontend Deployment (Vercel)

1. **Connect to Vercel**:
   ```bash
   cd frontend/
   # Install Vercel CLI: npm install -g vercel
   vercel login
   vercel --prod
   ```

2. **Environment Variables**:
   - Set `REACT_APP_API_URL` to your Railway backend URL
   - Example: `https://restaurant-flow-bhatiyani-backend.railway.app/api`

3. **Domain**: Vercel auto-generates domain like `https://restaurant-flow-bhatiyani-frontend.vercel.app`

## 🔧 Manual Deployment Steps

### Option 1: Railway (Backend)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub account
3. Import the backend repository
4. Railway will auto-detect Python and deploy

### Option 2: Vercel (Frontend)
1. Go to [vercel.com](https://vercel.com)
2. Connect GitHub account
3. Import the frontend repository
4. Add environment variable: `REACT_APP_API_URL=<your-railway-backend-url>/api`
5. Deploy

## 📱 Features Available

### Backend API Endpoints
- `GET /` - API info
- `GET /health` - Health check
- `GET /api/restaurants` - List restaurants
- `GET /api/orders` - List orders  
- `GET /api/menu-items` - List menu items
- `GET /api/analytics` - Analytics data

### Frontend Pages
- Dashboard with analytics charts
- Restaurant management
- Order tracking and workflow
- Menu item management
- Real-time data visualization

## 🛠 Tech Stack

**Backend**: Flask + Python 3.11 + CORS  
**Frontend**: React 18 + TypeScript + Tailwind CSS + React Flow + Chart.js  
**Deployment**: Railway (Backend) + Vercel (Frontend)

---

Built by: RestaurantFlow_bhatiyani Team  
Project completed in 3 days as requested! 🎉
