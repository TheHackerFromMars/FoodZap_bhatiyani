# 🍽️ RestaurantFlow_bhatiyani

> **Full-Stack Restaurant Management Platform**  
> A modern, scalable restaurant management system built with React (TypeScript) frontend and Flask (Python) backend.

## 🎯 **Project Overview**

This is a complete restaurant management system that provides:
- **Restaurant Management**: Multiple restaurant support with detailed profiles
- **Order Tracking**: Real-time order status with visual workflow
- **Menu Management**: Dynamic menu items with categories and pricing
- **Analytics Dashboard**: Sales insights with interactive charts
- **Responsive Design**: Modern UI with Tailwind CSS

---

## 🏗️ **Monorepo Structure**

```
RestaurantFlow_bhatiyani/
├── 📁 backend/              # Flask API Server
│   ├── main.py             # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── Procfile           # Railway deployment config
│   └── deploy.sh          # Deployment script
├── 📁 frontend/            # React TypeScript App
│   ├── src/               # Source code
│   ├── package.json       # Node.js dependencies
│   ├── vercel.json        # Vercel deployment config
│   └── deploy.sh          # Deployment script
├── 📄 README.md           # This file
├── 📄 DEPLOYMENT.md       # Deployment guide
└── 📄 .gitignore          # Git ignore rules
```

---

## 🚀 **Quick Start**

### **Prerequisites:**
- Node.js 18+ (for frontend)
- Python 3.11+ (for backend)
- Git

### **1. Clone & Setup:**
```bash
git clone <your-repo-url>
cd RestaurantFlow_bhatiyani

# Install backend dependencies
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Install frontend dependencies
cd ../frontend
npm install
```

### **2. Development:**
```bash
# Terminal 1: Start Backend (Port 8000)
cd backend
source venv/bin/activate
python main.py

# Terminal 2: Start Frontend (Port 3000)
cd frontend
npm start
```

### **3. Access Application:**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Health**: http://localhost:8000/health

---

## 🌐 **Live Deployment**

### **Production URLs:**
- **🌍 Frontend**: https://restaurant-flow-bhatiyani-frontend-itzr1ekue.vercel.app
- **🔗 Backend API**: https://sam-resto-production.up.railway.app

### **Quick Deploy:**
```bash
# Deploy Backend to Railway
cd backend && railway up

# Deploy Frontend to Vercel  
cd frontend && vercel --prod
```

> **📖 Detailed deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🛠️ **Tech Stack**

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | React 18 + TypeScript | Modern UI with type safety |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Charts** | Chart.js + React Flow | Data visualization |
| **Backend** | Flask + Python 3.11 | RESTful API server |
| **Deployment** | Vercel + Railway | Cloud hosting platforms |
| **Package Manager** | npm + pip | Dependency management |

---

## 📊 **API Endpoints**

### **Core APIs:**
- `GET /health` - Health check
- `GET /api/restaurants` - List all restaurants
- `GET /api/restaurants/{id}` - Get restaurant details
- `GET /api/orders` - List all orders
- `GET /api/orders/{id}` - Get order details
- `GET /api/menu-items` - List all menu items
- `GET /api/menu-items/{restaurant_id}` - Get restaurant menu
- `GET /api/analytics` - Get analytics data
- `GET /api/analytics/dashboard/{restaurant_id}` - Get dashboard metrics

### **Sample Response:**
```json
{
  "id": 1,
  "name": "Spice Garden",
  "cuisine": "Indian",
  "address": "123 Main St",
  "phone": "555-0123"
}
```

---

## 📱 **Features**

### **🏪 Restaurant Management**
- Multi-restaurant support
- Restaurant profiles with contact details
- Cuisine type categorization

### **📦 Order Tracking**
- Real-time order status (pending → preparing → completed)
- Customer information management
- Order workflow visualization

### **🍽️ Menu Management**
- Dynamic menu items by restaurant
- Category-based organization (Main Course, Appetizer, Bread)
- Pricing and availability tracking

### **📈 Analytics Dashboard**
- Daily order statistics
- Revenue tracking over time
- Popular items ranking
- Interactive charts and metrics

### **🎨 Modern UI/UX**
- Responsive design for all devices
- Professional navigation and layout
- Interactive data visualizations
- TypeScript for enhanced development experience

---

## 🔧 **Development**

### **Backend Development:**
```bash
cd backend
python main.py  # Development server with auto-reload
```

### **Frontend Development:**
```bash
cd frontend
npm start      # Development server with hot reload
npm run build  # Production build
npm test       # Run tests
```

### **Code Quality:**
- **Backend**: Python with Flask best practices
- **Frontend**: ESLint + TypeScript for code quality
- **Styling**: Tailwind CSS for consistent design

---

## 📝 **Environment Variables**

### **Backend (.env):**
```bash
FLASK_ENV=development
PORT=8000
```

### **Frontend (.env.production):**
```bash
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎯 **Project Status**

✅ **Completed Features:**
- Full-stack architecture with React + Flask
- Complete restaurant and order management
- Real-time analytics dashboard
- Production deployment on Vercel + Railway
- Responsive design with modern UI
- RESTful API with proper CORS configuration

🚀 **Ready for Production Use!**

---

*Built with ❤️ using modern web technologies*
