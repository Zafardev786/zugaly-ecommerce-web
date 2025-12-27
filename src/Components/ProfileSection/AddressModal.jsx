import { useState, useEffect, useRef } from "react";
import Loader from "../Common/Loader";
import NotificationModal from "../Constant/NotificationModal/NotificationModal";
import postApi from "../api/postApi/postApi";
import muzaffarpurAreas from "../data/muzaffarpurAreas";
import { useApi } from "../api/getApi/getApi";
import {
  FiHome,
  FiMapPin,
  FiPhone,
  FiNavigation,
  FiMap,
} from "react-icons/fi";

const Input = ({ icon, placeholder, value, onChange, error }) => (
  <div className="flex flex-col">
    <div className="flex items-center border rounded-md px-3 py-2 text-sm focus-within:border-green-600">
      <span className="text-gray-400 mr-2">{icon}</span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full outline-none text-sm"
      />
    </div>
    {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
  </div>
);


export default function AddressModal({
  isOpen,
  onClose,

}) {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

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

  const [profile, setProfile] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isPincodeValid, setIsPincodeValid] = useState(false);
  const [pincodeError, setPincodeError] = useState("");

  const profileLoadedRef = useRef(false);

  if (!isOpen) return null;

  /* ---------------- PINCODE ---------------- */
  const validatePincode = (pincode) => {
    if (!pincode || pincode.length !== 6) {
      setIsPincodeValid(false);
      setPincodeError("Please enter a 6-digit pincode");
      return false;
    }

    const valid = muzaffarpurAreas.some((a) => a.pincode === pincode);
    setIsPincodeValid(valid);
    setPincodeError(valid ? "" : "Service not available in this area");
    return valid;
  };

  useEffect(() => {
    if (newAddress.pinCode) validatePincode(newAddress.pinCode);
  }, [newAddress.pinCode]);

  /* ---------------- INPUT ---------------- */
  const handleInputChange = (field, value) => {
    if (field === "pinCode") value = value.replace(/\D/g, "").slice(0, 6);
    if (field === "mobile") value = value.replace(/\D/g, "").slice(0, 10);

    setNewAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ---------------- PROFILE API ---------------- */
  useApi({
    endpoint: "users/zugaly/customer/my-profile",
    setData: (res) => {
      const user = res?.user;
      setProfile(user);
    },
    setLoading,
  });

  /* ---------------- MAP PROFILE → ADDRESS (FIX) ---------------- */
  useEffect(() => {
    if (
      profile &&
      profile.addresses?.length &&
      !profileLoadedRef.current &&
      editingIndex === null
    ) {
      const address = profile.addresses[0];

      setNewAddress({
        houseNumber: address.houseNumber || "",
        street: address.street || "",
        area: address.area || "",
        city: address.city || "",
        state: address.state || "",
        pinCode: address.pinCode || "",
        landmark: address.landmark || "",
        mobile: profile.mobile || "", // ✅ FIX HERE
      });

      profileLoadedRef.current = true;
    }
  }, [profile, editingIndex]);

  /* ---------------- SAVE ---------------- */
  const handleSaveAddress = async () => {
    if (!validatePincode(newAddress.pinCode)) return;

    if (!/^[0-9]{10}$/.test(newAddress.mobile)) {
      setNotification({
        isVisible: true,
        message: "Mobile number must be 10 digits",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await postApi(
        "users/zugaly/customer/update-customers",
        newAddress
      );

      if (!res?.success) throw new Error("Failed to save address");

      setNotification({
        isVisible: true,
        message: "Address saved successfully",
        type: "success",
      });
    } catch (err) {
      setNotification({
        isVisible: true,
        message: err.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-2">
        <div className="bg-white w-full max-w-lg rounded-xl p-5 relative shadow-lg">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>

          <h2 className="text-base font-semibold mb-4">
            📍 Add / Update Delivery Address
          </h2>

          {/* FORM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* House */}
            <Input
              icon={<FiHome />}
              placeholder="House / Flat No"
              value={newAddress.houseNumber}
              onChange={(v) => handleInputChange("houseNumber", v)}
            />

            {/* Street */}
            <Input
              icon={<FiNavigation />}
              placeholder="Street / Road"
              value={newAddress.street}
              onChange={(v) => handleInputChange("street", v)}
            />

            {/* Area */}
            <Input
              icon={<FiMap />}
              placeholder="Area / Locality"
              value={newAddress.area}
              onChange={(v) => handleInputChange("area", v)}
            />

            {/* City */}
            <Input
              icon={<FiMapPin />}
              placeholder="City"
              value={newAddress.city}
              onChange={(v) => handleInputChange("city", v)}
            />

            {/* State */}
            <Input
              icon={<FiMapPin />}
              placeholder="State"
              value={newAddress.state}
              onChange={(v) => handleInputChange("state", v)}
            />

            {/* Pincode */}
            <Input
              icon={<FiMapPin />}
              placeholder="Pincode"
              value={newAddress.pinCode}
              onChange={(v) => handleInputChange("pinCode", v)}
              error={pincodeError}
            />

            {/* Landmark */}
            <Input
              icon={<FiNavigation />}
              placeholder="Landmark (Optional)"
              value={newAddress.landmark}
              onChange={(v) => handleInputChange("landmark", v)}
            />

            {/* Mobile */}
            <Input
              icon={<FiPhone />}
              placeholder="Mobile Number"
              value={newAddress.mobile}
              onChange={(v) => handleInputChange("mobile", v)}
            />
          </div>

          {/* SAVE BUTTON */}
          <button
            disabled={!isPincodeValid || loading}
            onClick={handleSaveAddress}
            className={`mt-4 w-full py-2 text-sm rounded-lg text-white transition
            ${isPincodeValid
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-300 cursor-not-allowed"
              }
          `}
          >
            {loading ? <Loader size={16} /> : "Save Address"}
          </button>
        </div>
      </div>

      <NotificationModal
        {...notification}
        onClose={() =>
          setNotification({ ...notification, isVisible: false })
        }
      />
    </>
  );

}
