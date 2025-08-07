import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#ffe5e5",
        backgroundImage: "url('/LoginBanner.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo */}
      <div className="mb-4 flex items-center justify-center">
        <img
          src="/FoodZap-title-logo.png"
          alt="FoodZap Logo"
          className="w-[350px] h-auto object-contain"
        />
      </div>

      {/* Login Form Box */}
      <div
        className="w-full max-w-md rounded-[30px] shadow-lg flex flex-col items-center p-8 border border-white/60"
        style={{
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg bg-white/80 focus:bg-white focus:ring-2 focus:ring-rose-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-gray-800"
            >
              Password
            </label>
            <div className="flex">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg bg-white/80 focus:bg-white focus:ring-2 focus:ring-rose-400"
              />
              <button
                type="button"
                className="ml-2 px-3 py-2 text-sm text-rose-500 hover:underline"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors"
          >
            Login
          </button>

          {/* Links */}
          <div className="mt-4 flex justify-between text-sm">
            <Link to="/forgot-password" className="text-rose-500 hover:underline">
              Forgot Password?
            </Link>
            <Link to="/signup" className="text-rose-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
