import { useState, useEffect, useRef } from "react";
import Loader from "../Common/Loader";
import NotificationModal from "../Constant/NotificationModal/NotificationModal";
import postApi from "../api/postApi/postApi";
import muzaffarpurAreas from "../data/muzaffarpurAreas";
import { useApi } from "../api/getApi/getApi";

export default function AddressModal({
  isOpen,
  onClose,
  userAddresses = [],
  setUserAddresses,
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
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white w-full max-w-xl rounded p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-xl"
          >
            ✕
          </button>

          <h2 className="text-lg font-bold mb-4">Manage Address</h2>

          {Object.keys(newAddress).map((key) => (
            <input
              key={key}
              placeholder={key}
              value={newAddress[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className="w-full border px-3 py-2 mb-2 rounded"
            />
          ))}

          {isPincodeValid && (
            <button
              onClick={handleSaveAddress}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              {loading ? <Loader size={18} /> : "Save Address"}
            </button>
          )}
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
