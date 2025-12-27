"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCog, FaArrowLeft } from "react-icons/fa";
import withAuth from "@/components/hoc/withAuth";

const SettingsPage = () => {
  const router = useRouter();

  // ✅ Define form fields in an object
  const initialForm = {
    fullname: { label: "Full Name", type: "text", value: "" },
    username: { label: "Username", type: "text", value: "" },
    email: { label: "Email", type: "email", value: "" },
    mobile: { label: "Mobile Number", type: "text", value: "" },
    oldPassword: { label: "Old Password", type: "password", value: "" },
    newPassword: { label: "New Password", type: "password", value: "" },
    confirmPassword: { label: "Confirm Password", type: "password", value: "" },
  };

  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e, key) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }));
  };

  const handleSave = () => {
    const payload = Object.fromEntries(
      Object.entries(formData).map(([key, obj]) => [key, obj.value])
    );
    console.log("Form Data:", payload);
    alert("Profile updated successfully!");
    // TODO: API call to save data
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => router.back()}>
          <FaArrowLeft className="text-gray-700 text-lg" />
        </button>
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FaCog className="text-gray-600" /> Profile Settings
        </h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Personal Info */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
          <h3 className="font-semibold text-gray-800">Personal Information</h3>
          {["fullname", "username", "email", "mobile"].map((key) => (
            <input
              key={key}
              type={formData[key].type}
              value={formData[key].value}
              onChange={(e) => handleChange(e, key)}
              placeholder={formData[key].label}
              className="w-full p-2 border rounded-md text-sm"
            />
          ))}
        </div>

        {/* Password Update */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
          <h3 className="font-semibold text-gray-800">Change Password</h3>
          {["oldPassword", "newPassword", "confirmPassword"].map((key) => (
            <input
              key={key}
              type={formData[key].type}
              value={formData[key].value}
              onChange={(e) => handleChange(e, key)}
              placeholder={formData[key].label}
              className="w-full p-2 border rounded-md text-sm"
            />
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}


export default withAuth(SettingsPage);