
import { useState, useEffect, useRef } from "react";
import postApi from "@/components/api/postApi/postApi";
import imageCompression from "browser-image-compression";
import { useApi } from "@/components/api/getApi/getApi";
import { GoogleLogin } from "@react-oauth/google";
import SellerWelcomePage from "./SellerWelcomePage";

const AuthForm = ({ onClose }) => {
  const googleRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [venderData, setVender] = useState(null);
  const [userId, setUserId] = useState(
    typeof window !== "undefined" ? localStorage.getItem("selleId") : null
  );

  // Image previews (URLs)
  const [imagePreview, setImagePreview] = useState({
    adharFront: "",
    adharBack: "",
    panCard: "",
    shopProofs: [], // array of URLs
  });

  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    businessname: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    adharCardNumber: "",
    panNumber: "",
    gstNumber: "",
    registeredBusiness: "no",
    // documents
    adharFront: null,
    adharBack: null,
    panCard: null,
    shopProofs: [], // File[]
    // bank
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifcode: "",
  });

  // Fetch Vendor Data (only if userId exists)
  useApi({
    endpoint: userId ? `users/zugaly/vendor/${userId}` : null,
    setData: (res) => {
      const d = res?.data;
      if (!d) return;
      setVender(d);

      setFormData((prev) => ({
        ...prev,
        ...d,
        password: "",
      }));

      // if backend already storing urls for docs, we can show them
      setImagePreview((prev) => ({
        ...prev,
        adharFront: d.adharFront || prev.adharFront,
        adharBack: d.adharBack || prev.adharBack,
        panCard: d.panCard || prev.panCard,
        shopProofs: Array.isArray(d.shopImages) ? d.shopImages : prev.shopProofs,
      }));

      // optional: if vendor already has status 6/7, jump directly
      if (d.application_status === 4) setCurrentStep(6);
      if (d.application_status === 6) setCurrentStep(7);
    },
    setError: (err) => console.log("Get Error:", err),
    setLoading,
  });

  // Step completion checker
  useEffect(() => {
    const c = { ...completedSteps };

    // Step 1
    if (formData.fullname && formData.mobile && formData.email) c[1] = true;

    // Step 2
    if (formData.address && formData.city && formData.state && formData.pincode)
      c[2] = true;

    // Step 3 (Aadhaar / PAN number + 3 images)
    if (
      formData.adharCardNumber &&
      formData.panNumber &&
      (formData.adharFront || imagePreview.adharFront) &&
      (formData.adharBack || imagePreview.adharBack) &&
      (formData.panCard || imagePreview.panCard)
    ) {
      c[3] = true;
    }

    // Step 4 (min 1 shop proof)
    if (
      (formData.shopProofs && formData.shopProofs.length > 0) ||
      (imagePreview.shopProofs && imagePreview.shopProofs.length > 0)
    ) {
      c[4] = true;
    }

    // Step 5
    if (
      formData.accountHolderName &&
      formData.bankName &&
      formData.accountNumber &&
      formData.ifcode
    )
      c[5] = true;

    setCompletedSteps(c);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, imagePreview]);

  console.log("currentStepcurrentStep", venderData)

  // Validation Rules
  const stepFields = {
    1: [
      {
        name: "fullname",
        placeholder: "Full Name",
        validate: (v) => /^[A-Za-z ]{3,}$/.test(v),
        errorMsg: "Min 3 letters",
      },
      {
        name: "email",
        placeholder: "Email",
        validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        errorMsg: "Invalid Email",
      },
      {
        name: "mobile",
        placeholder: "Mobile Number",
        validate: (v) => /^[0-9]{10}$/.test(v),
        errorMsg: "10 digit mobile required",
      },
      {
        name: "password",
        type: "password",
        placeholder: "Password",
        validate: (v) => /^(?=.*[0-9]).{8,}$/.test(v),
        errorMsg: "Min 8 chars & 1 number",
      },
    ],
    2: [
      {
        name: "businessname",
        placeholder: "Business Name",
        validate: (v) => v.length >= 3,
        errorMsg: "Min 3 chars",
      },
      {
        name: "address",
        placeholder: "Address",
        validate: (v) => v.length >= 5,
        errorMsg: "Min 5 chars",
      },
      {
        name: "landmark",
        placeholder: "Landmark / Near Me",
        validate: (v) => v.length >= 3,
        errorMsg: "Min 3 chars",
      },
      {
        name: "city",
        placeholder: "City",
        validate: (v) => /^[A-Za-z ]{3,}$/.test(v),
        errorMsg: "Invalid city",
      },
      {
        name: "state",
        placeholder: "State",
        validate: (v) => /^[A-Za-z ]{3,}$/.test(v),
        errorMsg: "Invalid state",
      },
      {
        name: "pincode",
        placeholder: "Pincode",
        validate: (v) => /^[0-9]{6}$/.test(v),
        errorMsg: "6-digit pincode",
      },
    ],
    3: [
      {
        name: "adharCardNumber",
        placeholder: "Aadhaar Number",
        validate: (v) => /^[0-9]{12}$/.test(v),
        errorMsg: "12-digit Aadhaar",
      },
      {
        name: "panNumber",
        placeholder: "PAN Number",
        validate: (v) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v),
        errorMsg: "ABCDE1234F",
      },
    ],
    4: [
      {
        name: "gstNumber",
        placeholder: "GST Number (If Registered)",
        validate: (v) =>
          /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z])$/.test(v),
        errorMsg: "Invalid GST",
      },
    ],
    5: [
      {
        name: "accountHolderName",
        placeholder: "Account Holder Name",
        validate: (v) => /^[A-Za-z ]{3,}$/.test(v),
        errorMsg: "Min 3 letters",
      },
      {
        name: "bankName",
        placeholder: "Bank Name",
        validate: (v) => /^[A-Za-z ]{3,}$/.test(v),
        errorMsg: "Min 3 letters",
      },
      {
        name: "accountNumber",
        placeholder: "Account Number",
        validate: (v) => /^[0-9]{9,18}$/.test(v),
        errorMsg: "Invalid account number",
      },
      {
        name: "ifcode",
        placeholder: "IFSC Code",
        validate: (v) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v),
        errorMsg: "e.g. SBIN0123456",
      },
    ],
  };

  const handleGoogleLogin = async (response) => {
    if (!response?.credential) return;
    setLoading(true);
    try {
      const res = await postApi("users/zugaly/customer/customer-login", {
        token: response.credential,
      });

      if (res.success) {
        setFormData((prev) => ({
          ...prev,
          email: res.email || prev.email,
          fullname: res.name || prev.fullname,
        }));

        setErrors((prev) => ({ ...prev, email: false }));
        localStorage.setItem("userId", res.userId);
        setUserId(res.userId);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, field) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (field.validate) {
      setErrors((prev) => ({ ...prev, [name]: !field.validate(value) }));
    }
  };

  const compressFile = async (file) => {
    if (!file) return null;
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.3,          // Target approx 300 KB
        maxWidthOrHeight: 1280,  // Reduce resolution
        initialQuality: 0.7,
        useWebWorker: true,
      });

      return compressed;
    } catch (error) {
      console.log("Compression Error:", error);
      return file;
    }
  };



  const handleKycFileChange = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressFile(file);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: compressed,
    }));

    const url = URL.createObjectURL(compressed);
    setImagePreview((prev) => ({
      ...prev,
      [fieldName]: url,
    }));
  };

  const handleBusinessFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const compressedFiles = await Promise.all(files.map(compressFile));
    const validFiles = compressedFiles.filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      shopProofs: [...prev.shopProofs, ...validFiles],
    }));

    setImagePreview((prev) => ({
      ...prev,
      shopProofs: [
        ...(prev.shopProofs || []),
        ...validFiles.map((f) => URL.createObjectURL(f)),
      ],
    }));
  };

  // Submit Steps
  const handleStepSubmit = async () => {
    setLoading(true);
    let endpoint = "";
    let payload = {};

    try {
      if (currentStep === 1) {
        endpoint = venderData?._id
          ? `users/zugaly/update-personal/${userId}`
          : "users/zugaly/save-personal";
        payload = {
          fullname: formData.fullname,
          businessname: formData.businessname,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        };
      }

      if (currentStep === 2) {
        endpoint = venderData?._id
          ? `users/zugaly/update-address/${userId}`
          : "users/zugaly/save-address";
        payload = {
          userId,
          businessname: formData.businessname,
          address: formData.address,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        };
      }

      if (currentStep === 3) {
        const fd = new FormData();
        fd.append("userId", userId);
        fd.append("adharCardNumber", formData.adharCardNumber);
        fd.append("panNumber", formData.panNumber);

        if (formData.adharFront) fd.append("adharFront", formData.adharFront);
        if (formData.adharBack) fd.append("adharBack", formData.adharBack);
        if (formData.panCard) fd.append("panCard", formData.panCard);

        endpoint = venderData?._id
          ? `users/zugaly/update-documents/${userId}`
          : "users/zugaly/save-documents";

        payload = fd;
      }

      if (currentStep === 4) {
        const fd = new FormData();
        fd.append("userId", userId);
        fd.append(
          "gstNumber",
          formData.registeredBusiness === "yes" ? formData.gstNumber : ""
        );

        if (formData.shopProofs.length > 0) {
          formData.shopProofs.forEach((file) => {
            fd.append("shopImages", file);
          });
        }

        endpoint = venderData?._id
          ? `users/zugaly/update-business-proof/${userId}`
          : "users/zugaly/save-business-proof";

        payload = fd;

      }

      if (currentStep === 5) {
        endpoint = venderData?._id
          ? `users/zugaly/update-bank/${userId}`
          : "users/zugaly/save-bank";

        payload = {
          userId,
          accountHolderName: formData.accountHolderName,
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          ifcode: formData.ifcode,
        };
      }

      let res;
      res = await postApi(endpoint, payload);

      if (res?.data?._id) {
        setUserId(res.data._id);
        localStorage.setItem("selleId", res.data._id);
      }

      // Application status handling (Step 6 / 7)
      const status = res?.data?.applicationStatus;
      if (status === 4) {
        setCurrentStep(6);
      } else if (status === 6) {
        setCurrentStep(7);
      }

      return true;
    } catch (error) {
      console.log("Submit Error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    // If already in review/approved, do nothing
    if (currentStep >= 6) return;

    // field validations
    const invalid = stepFields[currentStep].filter((f) => {
      if (!f.validate) return false;
      if (
        currentStep === 4 &&
        f.name === "gstNumber" &&
        formData.registeredBusiness !== "yes"
      ) {
        return false;
      }
      return !f.validate(formData[f.name] || "");
    });

    if (invalid.length > 0) {
      const err = {};
      invalid.forEach((i) => (err[i.name] = true));
      setErrors(err);
      return;
    }

    // Step-specific file validations
    if (currentStep === 3) {
      if (!formData.adharFront || !formData.adharBack || !formData.panCard) {
        alert("Please upload Aadhaar Front, Aadhaar Back and PAN Card images.");
        return;
      }
    }

    if (
      currentStep === 4 &&
      (!formData.shopProofs || formData.shopProofs.length === 0)
    ) {
      alert("Please upload at least 1 shop/business proof image.");
      return;
    }

    const ok = await handleStepSubmit();
    if (!ok) return;

    // For steps 1-4, move to next step if backend didn't push to 6/7
    if (currentStep < 5 && currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }

    // For step 5, we rely on applicationStatus to move to 6 or 7
  };

  const prevStep = () => {
    if (currentStep >= 6) return; // cannot go back from review/approved
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const stepsLabels = [
    "Personal",
    "Business Address",
    "KYC Docs",
    "Business Proof",
    "Bank Details",
  ];

  return (
    <>
      <SellerWelcomePage />
      <div className="flex flex-col min-h-screen justify-center items-center">
        <div className="bg-white rounded-lg p-0 md:p-6 w-full max-w-5xl relative max-h-[95vh] overflow-y-auto shadow-xl">
          {/* Desktop Sidebar & Form Layout */}
          <div className="md:flex">
            {/* Sidebar for Desktop */}
            <div
              className={`hidden md:flex flex-col w-60 border-r pr-3 ${currentStep >= 6 ? "opacity-50 pointer-events-none" : ""
                }`}
            >
              {stepsLabels?.map((t, i) => {
                const step = i + 1;
                const isCompleted = completedSteps[step];
                const canOpen =
                  step === currentStep || completedSteps[step - 1];

                return (
                  <div
                    key={step}
                    onClick={() => {
                      if (currentStep >= 6) return;
                      if (canOpen) setCurrentStep(step);
                    }}
                    className={`flex items-center justify-start cursor-pointer p-3 my-2 rounded-lg transition-all ${currentStep === step
                      ? "bg-blue-600 text-white"
                      : isCompleted
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    <span
                      className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${currentStep === step
                        ? "bg-white text-blue-600"
                        : isCompleted
                          ? "bg-white text-green-600"
                          : "bg-gray-400 text-white"
                        }`}
                    >
                      {isCompleted ? "✓" : step}
                    </span>
                    <p className="font-medium px-2">{t}</p>
                  </div>
                );
              })}
            </div>

            {/* Form Content / Status Screens */}
            <div className="flex-1 md:pl-6 p-4">
              {/* Step 6 - Under Review Screen */}
              {currentStep === 6 && (
                <div className="text-center py-14 px-6">
                  <h2 className="text-2xl font-bold text-blue-600 mb-3">
                    🔍 Application Under Review
                  </h2>
                  <p className="text-gray-700 text-sm max-w-md mx-auto">
                    Your application has been submitted successfully. Our team is
                    reviewing your details. You will be notified once approved.
                  </p>

                  <div className="flex justify-center mt-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                  </div>

                  <p className="text-gray-500 text-xs mt-4">
                    Please wait patiently… This may take some time ⏳
                  </p>
                </div>
              )}

              {/* Step 7 - Application Approved Screen */}
              {currentStep === 7 && (
                <div className="text-center py-14 px-6">
                  <h2 className="text-3xl font-bold text-green-600 mb-3">
                    🎉 Congratulations!
                  </h2>
                  <p className="text-gray-700 text-sm max-w-md mx-auto">
                    Your application has been successfully approved 🎯
                  </p>

                  <button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="mt-6 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition"
                  >
                    Go to Dashboard →
                  </button>
                </div>
              )}

              {/* Normal Steps 1–5 UI */}
              {currentStep <= 5 && (
                <>
                  {/* Mobile Accordion */}
                  <div className="md:hidden">
                    {stepsLabels?.map((t, i) => {
                      const step = i + 1;
                      const isCompleted = completedSteps[step];
                      const canOpen =
                        step === currentStep || completedSteps[step - 1];

                      return (
                        <div
                          key={step}
                          className="mb-3 border rounded-lg overflow-hidden"
                        >
                          {/* Accordion Header */}
                          <button
                            className={`w-full px-3 py-3 flex justify-between items-center ${currentStep === step
                              ? "bg-blue-600 text-white"
                              : isCompleted
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-800"
                              }`}
                            onClick={() => canOpen && setCurrentStep(step)}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold border ${isCompleted
                                  ? "bg-white text-green-600 border-green-600"
                                  : currentStep === step
                                    ? "bg-white text-blue-600 border-blue-600"
                                    : "bg-gray-400 text-white border-gray-400"
                                  }`}
                              >
                                {isCompleted ? "✓" : step}
                              </span>
                              {t}
                            </div>

                            <span className="text-lg">
                              {currentStep === step ? "▲" : "▼"}
                            </span>
                          </button>

                          {/* Accordion Body */}
                          {currentStep === step && (
                            <div className="p-4 bg-gray-50">
                              {stepFields[step].map((field) => (
                                <div key={field.name} className="mb-3">
                                  <input
                                    name={field.name}
                                    type={field.type || "text"}
                                    placeholder={field.placeholder}
                                    value={formData[field.name] || ""}
                                    onChange={(e) =>
                                      handleInputChange(e, field)
                                    }
                                    disabled={field.name === "email"}
                                    className={`border p-3 rounded-lg w-full ${errors[field.name]
                                      ? "border-red-600"
                                      : ""
                                      } ${field.name === "email"
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : ""
                                      }`}
                                  />
                                  {errors[field.name] && (
                                    <p className="text-red-500 text-xs mt-1">
                                      {field.errorMsg}
                                    </p>
                                  )}
                                </div>
                              ))}

                              {/* Step 3 Upload Block - Mobile */}
                              {currentStep === 3 && (
                                <div className="mt-4">
                                  <p className="font-medium mb-2">
                                    Upload Aadhaar Front, Aadhaar Back & PAN Card
                                  </p>

                                  <label className="block text-sm font-medium mb-1">
                                    Aadhaar Front
                                  </label>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleKycFileChange(e, "adharFront")
                                    }
                                    className="border p-2 rounded-lg w-full mb-2"
                                  />
                                  {imagePreview.adharFront && (
                                    <img
                                      src={imagePreview.adharFront}
                                      className="w-20 h-20 rounded-lg border object-cover mb-3"
                                    />
                                  )}

                                  <label className="block text-sm font-medium mb-1">
                                    Aadhaar Back
                                  </label>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleKycFileChange(e, "adharBack")
                                    }
                                    className="border p-2 rounded-lg w-full mb-2"
                                  />
                                  {imagePreview.adharBack && (
                                    <img
                                      src={imagePreview.adharBack}
                                      className="w-20 h-20 rounded-lg border object-cover mb-3"
                                    />
                                  )}

                                  <label className="block text-sm font-medium mb-1">
                                    PAN Card
                                  </label>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleKycFileChange(e, "panCard")
                                    }
                                    className="border p-2 rounded-lg w-full mb-2"
                                  />
                                  {imagePreview.panCard && (
                                    <img
                                      src={imagePreview.panCard}
                                      className="w-20 h-20 rounded-lg border object-cover mb-1"
                                    />
                                  )}
                                </div>
                              )}

                              {/* Step 4 Upload Block - Mobile */}
                              {currentStep === 4 && (
                                <div className="mt-4">
                                  <p className="font-medium mb-1">
                                    Business Documents / Shop Photos
                                  </p>
                                  <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleBusinessFileChange}
                                    className="border p-2 rounded-lg w-full"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">
                                    Minimum 1 shop photo required
                                  </p>
                                  <div className="flex gap-2 flex-wrap mt-2">
                                    {imagePreview.shopProofs?.map((src, i) => (
                                      <img
                                        key={i}
                                        src={src}
                                        className="w-16 h-16 rounded-lg border object-cover"
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop Inputs */}
                  <div className="hidden md:block">
                    {stepFields[currentStep].map((field) => (
                      <div key={field.name} className="mb-4">
                        <label className="block font-medium mb-1 text-gray-700">
                          {field.placeholder}
                        </label>
                        <input
                          name={field.name}
                          type={field.type || "text"}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(e, field)}
                          disabled={field.name === "email"}
                          className={`border p-3 rounded-lg w-full shadow-sm ${errors[field.name] ? "border-red-600" : ""
                            } ${field.name === "email" ? "bg-gray-200" : ""}`}
                        />
                        {errors[field.name] && (
                          <p className="text-red-500 text-xs mt-1">
                            {field.errorMsg}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Special UI Blocks */}
                  {currentStep === 1 && (
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
                  )}

                  {/* Step 3 Upload - Desktop */}
                  {currentStep === 3 && (
                    <div className="mt-4 hidden md:block">
                      <p className="font-medium mb-2">
                        Upload Aadhaar Front, Aadhaar Back & PAN Card
                      </p>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Aadhaar Front
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleKycFileChange(e, "adharFront")
                            }
                            className="border p-2 rounded-lg w-full"
                          />
                          {imagePreview.adharFront && (
                            <img
                              src={imagePreview.adharFront}
                              className="w-20 h-20 rounded-lg border object-cover mt-2"
                            />
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Aadhaar Back
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleKycFileChange(e, "adharBack")
                            }
                            className="border p-2 rounded-lg w-full"
                          />
                          {imagePreview.adharBack && (
                            <img
                              src={imagePreview.adharBack}
                              className="w-20 h-20 rounded-lg border object-cover mt-2"
                            />
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            PAN Card
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleKycFileChange(e, "panCard")
                            }
                            className="border p-2 rounded-lg w-full"
                          />
                          {imagePreview.panCard && (
                            <img
                              src={imagePreview.panCard}
                              className="w-20 h-20 rounded-lg border object-cover mt-2"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4 Upload - Desktop */}
                  {currentStep === 4 && (
                    <div className="mt-4">
                      <label className="flex gap-3 items-center mb-3">
                        <input
                          type="radio"
                          name="registeredBusiness"
                          value="yes"
                          checked={formData.registeredBusiness === "yes"}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              registeredBusiness: e.target.value,
                            }))
                          }
                        />{" "}
                        Registered Business (GST Required)
                      </label>

                      <label className="flex gap-3 items-center mb-3">
                        <input
                          type="radio"
                          name="registeredBusiness"
                          value="no"
                          checked={formData.registeredBusiness === "no"}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              registeredBusiness: e.target.value,
                              gstNumber: "",
                            }))
                          }
                        />{" "}
                        No GST
                      </label>

                      <p className="font-medium mb-1">
                        Business Documents / Shop Photos
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleBusinessFileChange}
                        className="border p-3 rounded-lg w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum 1 shop photo required
                      </p>

                      <div className="flex gap-3 flex-wrap mt-3">
                        {imagePreview.shopProofs?.map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            className="w-20 h-20 rounded-lg border object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex justify-between mt-6">
                    {currentStep > 1 && (
                      <button
                        onClick={prevStep}
                        className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                      >
                        Back
                      </button>
                    )}
                    <button
                      onClick={nextStep}
                      className={`px-8 py-2 rounded-lg text-white shadow-lg ${currentStep < 5
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                      {loading
                        ? "Saving..."
                        : currentStep < 5
                          ? "Next →"
                          : "Submit"}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Hidden Google Button */}
            <div
              ref={googleRef}
              className="opacity-0 h-0 w-0 overflow-hidden"
            >
              <GoogleLogin onSuccess={handleGoogleLogin} />
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default AuthForm;
