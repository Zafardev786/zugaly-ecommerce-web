"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../Common/Loader";
import { GoogleLogin } from "@react-oauth/google";

const RegisterForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  loading,
  showPassword,
  togglePasswordVisibility,
  planeList,
  handleGoogleLogin,
  setIsRegister
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h2>
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
      <div className="mb-2">
        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullname}
          onChange={handleInputChange}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
          Mobile Number
        </label>
        <input
          id="mobile"
          name="mobile"
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={formData.mobile}
          onChange={handleInputChange}
          pattern="[0-9]{10}"
          maxLength={10}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          disabled
          required
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
          Register
        </button>
      )}

      <p className="mt-4 text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <button
          onClick={() => setIsRegister(false)}
          className="text-blue-500 hover:underline"
        >
          Login
        </button>
      </p>
    </>
  );
};

export default RegisterForm;