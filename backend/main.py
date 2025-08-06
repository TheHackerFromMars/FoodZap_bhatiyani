#!/usr/bin/env python3
from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:3000", 
    "http://localhost:5173",
    "https://*.vercel.app",
    "https://*.netlify.app",
    "*"
])

# ✅ Hardcoded credentials for demo
valid_users = {
    "ritampramanik1@gmail.com": "FoodZap123",
    "sample@gmail.com": "FoodZap123"
}

# ===============================
# SAMPLE DATA
# ===============================
restaurants_data = [
    {"id": 1, "name": "Spice Garden", "address": "123 Main St", "phone": "555-0123", "cuisine": "Indian"},
    {"id": 2, "name": "Ocean View Cafe", "address": "456 Ocean Blvd", "phone": "555-0456", "cuisine": "Seafood"},
    {"id": 3, "name": "Mountain Grill", "address": "789 Hill St", "phone": "555-0789", "cuisine": "American"}
]

orders_data = [
    {"id": 1, "restaurant_id": 1, "customer_name": "John Doe", "status": "pending", "total": 25.99, "items": ["Butter Chicken", "Naan"]},
    {"id": 2, "restaurant_id": 1, "customer_name": "Jane Smith", "status": "completed", "total": 18.50, "items": ["Samosa", "Tea"]},
    {"id": 3, "restaurant_id": 2, "customer_name": "Mike Johnson", "status": "preparing", "total": 45.00, "items": ["Fish & Chips", "Salad"]}
]

menu_items_data = [
    {"id": 1, "restaurant_id": 1, "name": "Butter Chicken", "price": 15.99, "category": "Main Course"},
    {"id": 2, "restaurant_id": 1, "name": "Naan", "price": 3.99, "category": "Bread"},
    {"id": 3, "restaurant_id": 1, "name": "Samosa", "price": 5.99, "category": "Appetizer"},
    {"id": 4, "restaurant_id": 2, "name": "Fish & Chips", "price": 18.99, "category": "Main Course"},
    {"id": 5, "restaurant_id": 2, "name": "Grilled Salmon", "price": 22.99, "category": "Main Course"}
]

analytics_data = {
    "daily_orders": [
        {"date": "2024-01-15", "orders": 25, "revenue": 650.75},
        {"date": "2024-01-16", "orders": 30, "revenue": 820.50},
        {"date": "2024-01-17", "orders": 22, "revenue": 590.25},
        {"date": "2024-01-18", "orders": 35, "revenue": 980.00},
        {"date": "2024-01-19", "orders": 28, "revenue": 745.50}
    ],
    "popular_items": [
        {"name": "Butter Chicken", "orders": 45},
        {"name": "Fish & Chips", "orders": 32},
        {"name": "Grilled Salmon", "orders": 28},
        {"name": "Naan", "orders": 52},
        {"name": "Samosa", "orders": 38}
    ]
}

# ===============================
# API ROUTES
# ===============================
@app.route('/')
def root():
    return jsonify({
        "message": "RestaurantFlow_bhatiyani API", 
        "version": "1.0.0",
        "status": "running"
    })

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy", "message": "Flask API is running"})

# ✅ LOGIN ROUTE
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if email in valid_users and valid_users[email] == password:
        return jsonify({
            "success": True,
            "message": "Login successful",
            "user": {"email": email}
        }), 200
    else:
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

@app.route('/api/restaurants', methods=['GET'])
def get_restaurants():
    return jsonify(restaurants_data)

@app.route('/api/restaurants/<int:restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    restaurant = next((r for r in restaurants_data if r["id"] == restaurant_id), None)
    if restaurant:
        return jsonify(restaurant)
    return jsonify({"error": "Restaurant not found"}), 404

@app.route('/api/orders', methods=['GET'])
def get_orders():
    return jsonify(orders_data)

@app.route('/api/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = next((o for o in orders_data if o["id"] == order_id), None)
    if order:
        return jsonify(order)
    return jsonify({"error": "Order not found"}), 404

@app.route('/api/menu-items', methods=['GET'])
def get_menu_items():
    return jsonify(menu_items_data)

@app.route('/api/menu-items/<int:restaurant_id>', methods=['GET'])
def get_restaurant_menu(restaurant_id):
    items = [item for item in menu_items_data if item["restaurant_id"] == restaurant_id]
    return jsonify(items)

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    return jsonify(analytics_data)

@app.route('/api/analytics/dashboard/<int:restaurant_id>', methods=['GET'])
def get_dashboard_data(restaurant_id):
    restaurant_orders = [order for order in orders_data if order["restaurant_id"] == restaurant_id]
    pending_orders = [order for order in restaurant_orders if order["status"] == "pending"]
    today_revenue = sum(order["total"] for order in restaurant_orders if order["status"] == "completed")
    active_menu_items = len([item for item in menu_items_data if item["restaurant_id"] == restaurant_id])
    
    dashboard_data = {
        "today_orders": len(restaurant_orders),
        "pending_orders": len(pending_orders),
        "today_revenue": today_revenue,
        "active_menu_items": active_menu_items
    }
    return jsonify(dashboard_data)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)
