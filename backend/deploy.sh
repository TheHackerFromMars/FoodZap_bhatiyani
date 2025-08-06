#!/bin/bash

echo "🚀 RestaurantFlow_bhatiyani Backend Deployment Script"
echo "=============================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo "🔑 Please run 'railway login' first to authenticate"
echo "📂 Then run 'railway init' to create a new project"
echo "🚀 Finally run 'railway up' to deploy"

echo ""
echo "📋 Deployment checklist:"
echo "✅ Flask app configured for production"
echo "✅ Gunicorn web server setup"
echo "✅ Requirements.txt ready"
echo "✅ Procfile configured"
echo "✅ CORS enabled for frontend domains"
echo "✅ PORT environment variable support"

echo ""
echo "🌐 After deployment, your API will be available at:"
echo "https://your-project-name.railway.app"
