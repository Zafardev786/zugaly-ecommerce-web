"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import Loader from "../Common/Loader";

const LoginForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  loading,
  showPassword,
  togglePasswordVisibility,
  handleGoogleLogin,
  setIsRegister,
  setNotification
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>

      <div className="mb-2">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleInputChange}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none pr-10"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader />
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          disabled={loading}
        >
          Login
        </button>
      )}

      <div className="mt-4">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            setNotification({
              message: "Google Login failed, please try again.",
              type: "error",
              isVisible: true,
            });
          }}
        />
      </div>

      <p className="mt-4 text-sm text-gray-600 text-center">
        New here? You can sign up automatically by signing in with Google.
      </p>

    </>
  );
};

export default LoginForm;