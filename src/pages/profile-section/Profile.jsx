import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaClipboardList,
  FaHistory,
  FaMapMarkerAlt,
  FaCog,
  FaSignOutAlt,
  FaWallet,
  FaBell,
  FaHeadset,
  FaCrown,
} from "react-icons/fa";

const ProfileSection = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "My Orders",
      icon: <FaClipboardList className="text-blue-500 text-lg" />,
      path: "/profile-section/my-bookings",
    },
    {
      title: "Order History",
      icon: <FaHistory className="text-green-500 text-lg" />,
      path: "/profile-section/booking-history",
    },
    {
      title: "Update Address",
      icon: <FaMapMarkerAlt className="text-orange-500 text-lg" />,
      path: "/profile-section/address",
    },
    {
      title: "Membership & Rewards",
      icon: <FaCrown className="text-yellow-500 text-lg" />,
      path: "/profile-section/membership",
    },
    {
      title: "My Wallet",
      icon: <FaWallet className="text-emerald-500 text-lg" />,
      path: "/profile-section/wallet",
    },
    {
      title: "Notifications",
      icon: <FaBell className="text-pink-500 text-lg" />,
      path: "/profile-section/notifications",
    },
    {
      title: "Customer Support",
      icon: <FaHeadset className="text-purple-500 text-lg" />,
      path: "/profile-section/support",
    },
    {
      title: "Profile Settings",
      icon: <FaCog className="text-gray-600 text-lg" />,
      path: "/profile-section/settings",
    },
  ];

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-6 ">
      {/* ---------------- HEADER ---------------- */}
      <div className="bg-green-600 text-white py-6 px-4 flex items-center gap-3 rounded-b-2xl shadow-md">
        <FaUserCircle className="text-5xl" />
        <div>
          <h2 className="text-lg font-semibold">Zugaly</h2>
          <p className="text-sm text-green-100">info@zugaly.com</p>
          <span className="inline-block mt-1 bg-yellow-300 text-yellow-900 text-xs font-medium px-2 py-0.5 rounded-md">
            Gold Member
          </span>
        </div>
      </div>

      {/* ---------------- QUICK INFO ---------------- */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-2">
            <FaWallet className="text-emerald-500 text-xl" />
            <div>
              <p className="text-xs text-gray-500">Wallet Balance</p>
              <p className="font-semibold text-gray-800">₹ 1,250</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-2">
            <FaCrown className="text-yellow-500 text-xl" />
            <div>
              <p className="text-xs text-gray-500">Membership Level</p>
              <p className="font-semibold text-gray-800">Gold</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- MENU LIST ---------------- */}
      <div className="p-3 space-y-3 mt-2">
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center justify-between bg-white p-3 rounded-xl shadow-sm hover:shadow-md active:scale-[0.98] transition"
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium text-gray-700">
                {item.title}
              </span>
            </div>
            <span className="text-gray-400">{">"}</span>
          </button>
        ))}

        {/* ---------------- LOGOUT ---------------- */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium shadow-md active:scale-[0.98] transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
