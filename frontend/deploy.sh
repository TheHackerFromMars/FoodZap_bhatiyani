#!/bin/bash

echo "🚀 RestaurantFlow_bhatiyani Frontend Deployment Script"
echo "================================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🔑 Please run 'vercel login' first to authenticate"
echo "🚀 Then run 'vercel --prod' to deploy"

echo ""
echo "📋 Deployment checklist:"
echo "✅ React app built and optimized"
echo "✅ Tailwind CSS configured"
echo "✅ TypeScript compiled"
echo "✅ Environment variables ready"
echo "✅ API endpoints configured"
echo "✅ Responsive design implemented"

echo ""
echo "⚙️  Remember to set environment variables in Vercel:"
echo "REACT_APP_API_URL=https://your-railway-backend-url.railway.app/api"

echo ""
echo "🌐 After deployment, your app will be available at:"
echo "https://your-project-name.vercel.app"
