import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Restaurants from "./pages/Restaurants";
import Orders from "./pages/Orders";
import MenuItems from "./pages/MenuItems";
import Analytics from "./pages/Analytics";
import OrderFlow from "./pages/OrderFlow";
import Settings from "./pages/Settings";
import "./App.css";

// Protect pages so only logged-in users can access them
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? <>{children}</> : <Navigate to="/" replace />;
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password"; // hide layout for auth pages

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 FoodZap. Built with React, TypeScript, and modern web technologies.</p>
            <p className="text-sm mt-1">
              Designed and developed by Ritam Pramanik, with occasional AI assistance for productivity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/restaurants"
            element={
              <PrivateRoute>
                <Restaurants />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/menu-items"
            element={
              <PrivateRoute>
                <MenuItems />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
          <Route
            path="/order-flow"
            element={
              <PrivateRoute>
                <OrderFlow />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
