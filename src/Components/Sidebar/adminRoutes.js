// components/AdminRoutes.js


const adminRoutes = [
  {
    _id: "1",
    routesname: "Dashboard",
    redirect_path: "/profile-section",
    icon: "MdDashboard",
  },
  {
    _id: "2",
    routesname: "My Bookings",
    redirect_path: "/profile-section/my-bookings",
    icon: "FaClipboardList",
  },
  {
    _id: "3",
    routesname: "Booking History",
    redirect_path: "/profile-section/booking-history",
    icon: "FaListAlt",
  },
  {
    _id: "4",
    routesname: "Profile Setting",
    redirect_path: "/profile-section/profile-setting",
    icon: "FaUserCircle",
  },
  // -------------------- Add menuItems below --------------------
  {
    _id: "5",
    routesname: "Update Address",
    redirect_path: "/profile-section/address",
    icon: "FaMapMarkerAlt",
  },
  {
    _id: "6",
    routesname: "Membership & Rewards",
    redirect_path: "/profile-section/membership",
    icon: "FaCrown",
  },
  {
    _id: "7",
    routesname: "My Wallet",
    redirect_path: "/profile-section/wallet",
    icon: "FaWallet",
  },
  {
    _id: "8",
    routesname: "Notifications",
    redirect_path: "/profile-section/notifications",
    icon: "FaBell",
  },
  {
    _id: "9",
    routesname: "Customer Support",
    redirect_path: "/profile-section/support",
    icon: "FaHeadset",
  },
  {
    _id: "10",
    routesname: "Profile Settings",
    redirect_path: "/profile-section/settings",
    icon: "FaCog",
  },
];

export default adminRoutes;
