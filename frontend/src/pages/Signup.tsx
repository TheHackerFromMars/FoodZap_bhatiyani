import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle signup logic here
    navigate("/"); // Redirect to login after signup
  };

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/LoginBanner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo with same spacing as Login page */}
      <div className="mb-4 flex items-center justify-center">
        <img
          src="/FoodZap-title-logo.png"
          alt="FoodZap Logo"
          className="w-[350px] h-auto object-contain"
        />
      </div>

      {/* Jelly glass signup box */}
      <div
        className="w-full max-w-md rounded-[35px] shadow-lg flex flex-col items-center p-8 border border-white/50 -mt-2"
        style={{
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Account
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-800">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg bg-white/80 focus:bg-white focus:ring-2 focus:ring-rose-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-800">
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
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-800">
              Password
            </label>
            <div className="flex">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete="new-password"
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

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-gray-800">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg bg-white/80 focus:bg-white focus:ring-2 focus:ring-rose-400"
            />
          </div>

          {/* Sign Up button */}
          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors"
          >
            Sign Up
          </button>

          {/* Link to login */}
          <div className="mt-4 flex justify-center text-sm">
            <Link to="/" className="text-rose-500 hover:underline">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
