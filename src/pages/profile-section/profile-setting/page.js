"use client"

import React, { useState, useEffect } from "react";
import AddForm from "@/components/Common/AddForm";
import { useRouter } from 'next/navigation';
import postApi from "@/components/api/postApi/postApi";
import NotificationModal from "@/components/Constant/NotificationModal/NotificationModal";
import { useApi } from "@/components/api/getApi/getApi";
import withAuth from "@/components/hoc/withAuth";

const ProfileSetting = ({ setSuccess, success }) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shiftList, setShiftList] = useState([]);
  const [currentForm, setCurrentForm] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const [profile, setProfile] = useState(null);
  const [newAddress, setNewAddress] = useState({
    houseNumber: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pinCode: "",
    landmark: "",
    mobile: "",
  });
  const router = useRouter();
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const storedUserRoutes = JSON.parse(localStorage.getItem("profileData")) || [];
    setUserList(storedUserRoutes);
  }, []);

  const [formData, setFormData] = useState({
    fullname: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    email: "",
    mobile: "",
    address: "",
    businessname: "",
    username: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    if (shiftList && Object.keys(shiftList).length > 0) {
      setFormData((prev) => ({
        ...prev,
        fullname: shiftList.fullname || "",
        email: shiftList?.email || "",
        mobile: shiftList?.mobile || "",
        address: shiftList?.address || "",
        businessname: shiftList?.businessname || "",
        username: shiftList?.username || "",
        state: shiftList?.state || "",
        city: shiftList?.city || "",
      }));
    }
  }, [shiftList]);

  const onClose = () => {
    router.push("/profile-section/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  useApi({
    endpoint: "users/zugaly/customer/my-profile",
    setData: (response) => {
      const rows = response?.customer || [];
      setProfile(rows);
    },
    setError: setNotification,
    setLoading,
  });

  useEffect(() => {
    if (profile) {
      const firstAddress = profile.addresses && profile.addresses.length > 0
        ? profile.addresses[0]
        : {};

      setFormData((prev) => ({
        ...prev,
        fullname: profile.fullname || "",
        email: profile.email || "",
        mobile: profile.mobile || "",
        state: firstAddress.state || "",
        city: firstAddress.city || "",
        houseNumber: firstAddress.houseNumber || "",
        street: firstAddress.street || "",
        area: firstAddress.area || "",
        city: firstAddress.city || "",
        state: firstAddress.state || "",
        pinCode: firstAddress.pinCode || "",
        landmark: firstAddress.landmark || "",
        mobile: profile.mobile || "",
      }));

      setNewAddress((prev) => ({
        houseNumber: firstAddress.houseNumber || "",
        street: firstAddress.street || "",
        area: firstAddress.area || "",
        city: firstAddress.city || "",
        state: firstAddress.state || "",
        pinCode: firstAddress.pinCode || "",
        landmark: firstAddress.landmark || "",
        mobile: profile.mobile || "",
      }));
    }
  }, [profile]);

  const validateForm = () => {
    const errors = {};
    const fieldsToValidate = currentForm === 1 ? firstFormFields : secondFormFields;

    fieldsToValidate.forEach((field) => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} is required`;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentForm(2);
    }
  };

  const handleBack = () => {
    setCurrentForm(1);
  };

  const firstFormFields = [
    {
      label: "Full Name",
      placeholder: "Enter Your Full Name",
      id: "fullname",
      type: "text",
      name: "fullname",
      value: formData.fullname,
      required: true
    },
    {
      label: "Email",
      placeholder: "Enter Your Email",
      id: "email",
      type: "email",
      name: "email",
      value: formData.email,
    },
    {
      label: "Mobile",
      placeholder: "Enter Mobile Number",
      id: "mobile",
      type: "number",
      name: "mobile",
      value: formData.mobile,
      required: true
    },
    {
      label: "House Number",
      placeholder: "Enter House Number",
      id: "houseNumber",
      type: "text",
      name: "houseNumber",
      value: newAddress.houseNumber,
      required: true
    },
    {
      label: "Street",
      placeholder: "Enter Street",
      id: "street",
      type: "text",
      name: "street",
      value: newAddress.street,
      required: true
    },
    {
      label: "Area",
      placeholder: "Enter Area",
      id: "area",
      type: "text",
      name: "area",
      value: newAddress.area,
      required: true
    },
    {
      label: "City",
      placeholder: "Enter your City",
      id: "city",
      type: "text",
      name: "city",
      value: formData.city,
      required: true
    },
    {
      label: "State",
      placeholder: "Enter your state",
      id: "state",
      type: "text",
      name: "state",
      value: formData.state,
      required: true
    },
    {
      label: "Pin Code",
      placeholder: "Enter Pin Code",
      id: "pinCode",
      type: "text",
      name: "pinCode",
      value: newAddress.pinCode,
      required: true
    },
    {
      label: "Landmark",
      placeholder: "Enter Landmark",
      id: "landmark",
      type: "text",
      name: "landmark",
      value: newAddress.landmark,
    },
  ];
  
  const secondFormFields = [
    {
      label: "Old Password",
      placeholder: "Enter Old Password",
      id: "oldPassword",
      type: "password",
      name: "oldPassword",
      value: formData.oldPassword,
    },
    {
      label: "New Password",
      placeholder: "Enter New Password",
      id: "newPassword",
      type: "password",
      name: "newPassword",
      value: formData.newPassword,
    },
    {
      label: "Confirm Password",
      placeholder: "Enter Confirm Password",
      id: "confirmPassword",
      type: "password",
      name: "confirmPassword",
      value: formData.confirmPassword,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setNotification({ isVisible: true, message: "New Password and Confirm Password do not match", type: "error" });
      setLoading(false);
      return;
    }

    try {
      // Use the address update endpoint that also handles profile info
      const endpoint = "users/zugaly/customer/update-customers";

      const requestData = {
        fullname: formData.fullname,
        email: formData.email,
        mobile: formData.mobile,
        houseNumber: newAddress.houseNumber,
        street: newAddress.street,
        area: newAddress.area,
        city: formData.city,
        state: formData.state,
        pinCode: newAddress.pinCode,
        landmark: newAddress.landmark,
      };

      // Only include password fields if they are provided
      if (formData.oldPassword || formData.newPassword || formData.confirmPassword) {
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
          setNotification({ 
            isVisible: true, 
            message: "All password fields are required to update password", 
            type: "error" 
          });
          setLoading(false);
          return;
        }
        
        requestData.oldPassword = formData.oldPassword;
        requestData.newPassword = formData.newPassword;
        requestData.confirmPassword = formData.confirmPassword;
      }

      const response = await postApi(endpoint, requestData);

      setNotification({
        isVisible: true,
        message: "Profile Updated Successfully",
        type: "success"
      });

      // Refresh profile data after update
      const profileResponse = await postApi("users/zugaly/customer/my-profile", {});
      if (profileResponse.success) {
        setProfile(profileResponse.customer);
      }

    } catch (error) {
      console.error("API Error:", error);
      setNotification({
        isVisible: true,
        message: error.response?.data?.message || error.message || "An error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {currentForm === 1 && (
        <AddForm
          title="Profile Update"
          formFields={firstFormFields}
          defaultValues={formData}
          onChange={handleChange}
          onCancel={onClose}
          handleChange={handleChange}
          loading={loading}
          onNext={handleNext}
          currentForm={currentForm}
          validationErrors={validationErrors}
        />
      )}

      {currentForm === 2 && (
        <AddForm
          title="Password Update"
          formFields={secondFormFields}
          defaultValues={formData}
          onChange={handleChange}
          handleSubmit={handleSubmit}
          onCancel={onClose}
          handleChange={handleChange}
          loading={loading}
          onBack={handleBack}
          currentForm={currentForm}
          validationErrors={validationErrors}
          setCurrentForm={setCurrentForm}
        />
      )}

      <NotificationModal
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification({ ...notification, isVisible: false })}
      />
    </>
  );
};



export default withAuth(ProfileSetting);