import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    setSubmitted(true);
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
      {/* Logo with consistent spacing */}
      <div className="mb-4 flex items-center justify-center">
        <img
          src="/FoodZap-title-logo.png"
          alt="FoodZap Logo"
          className="w-[350px] h-auto object-contain"
        />
      </div>

      {/* Jelly glass form box */}
      <div
        className="w-full max-w-md rounded-[35px] shadow-lg flex flex-col items-center p-8 border border-white/50 -mt-2"
        style={{
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        {!submitted ? (
          <form onSubmit={handleSubmit} className="w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Forgot Password
            </h2>

            {/* Email input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-800">
                Enter your email address
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

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors"
            >
              Send Reset Link
            </button>

            {/* Navigation links */}
            <div className="mt-4 flex justify-between text-sm">
              <Link to="/" className="text-rose-500 hover:underline">
                Back to Login
              </Link>
              <Link to="/signup" className="text-rose-500 hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        ) : (
          <div className="w-full text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Check your email!
            </h2>
            <p className="mb-6 text-gray-700">
              If an account exists for <span className="font-semibold">{email}</span>, you’ll receive a password reset link shortly.
            </p>
            <Link to="/" className="text-rose-500 hover:underline">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
