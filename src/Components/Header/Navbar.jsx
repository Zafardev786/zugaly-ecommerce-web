import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPhoneCall,
  FiInfo,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";

const navigationLinks = [
  { name: "About Us", route: "/about", icon: <FiInfo /> },
  { name: "Contact", route: "/contact-page", icon: <FiPhoneCall /> },
];

const distributorDistricts = [
  "Muzaffarpur",
  "Betiya",
  "Ara",
  "Motihari",
  "Katra",
  "Sivahar",
  "Chapra",
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDistributorOpen, setIsDistributorOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Auth check
  useEffect(() => {
    let usertoken = localStorage.getItem("user")
    let sellertoken = localStorage.getItem("seller-token")
    const token = sellertoken || usertoken;
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleNavigateHome = () => navigate("/");

  return (
    <div className="w-full sticky top-0 z-50 bg-green-50 shadow-md">
      {/* ================= Mobile Top Bar ================= */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 bg-green-200">
        <Link
          to="/become-seller"
          className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm hover:bg-orange-600"
        >
          Become a Seller
        </Link>

        <div className="flex items-center gap-3">
          {isLoggedIn && (
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 bg-green-300 rounded-full"
            >
              <FaShoppingCart />
            </button>
          )}

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
            >
              Login
            </Link>
          ) : (
            <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <FiUser size={22} />
            </button>
          )}
        </div>
      </div>

      {/* ================= Desktop Navbar ================= */}
      <nav className="hidden md:flex items-center justify-between px-8 py-4 bg-green-50 border-b border-green-200">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleNavigateHome}
        >
          <img
            src="https://res.cloudinary.com/dybuoihqn/image/upload/v1749256783/file_00000000010c61f6a42fbf2413636245_ucymvh.png"
            alt="Zugaly Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-bold text-green-700 text-xl">
            Zugaly<span className="text-xs align-super ml-0.5">™</span>
          </span>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="flex items-center">
            <button
              className="text-xl text-green-700"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <FiSearch />
            </button>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search…"
              className={`ml-2 bg-green-50 border border-green-300 rounded-md text-sm transition-all ${isSearchOpen
                  ? "w-60 px-3 py-1"
                  : "w-0 px-0 overflow-hidden"
                }`}
            />
          </div>

          {/* Navigation Links */}
          {navigationLinks.map((link) => (
            <Link
              key={link.route}
              to={link.route}
              className="flex items-center gap-2 text-green-800 hover:text-green-700"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {/* Distributors */}
          {/* <div className="relative">
            <button
              onClick={() => setIsDistributorOpen(!isDistributorOpen)}
              className="text-sm font-medium text-green-800 hover:text-green-700"
            >
              Our Distributors ▾
            </button>

            {isDistributorOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-green-200 rounded-md shadow-lg z-50">
                {distributorDistricts.map((d) => (
                  <div
                    key={d}
                    className="px-4 py-2 hover:bg-green-100 cursor-pointer text-sm"
                    onClick={() => setIsDistributorOpen(false)}
                  >
                    {d}
                  </div>
                ))}
              </div>
            )}
          </div> */}

          {/* Become Seller */}
          <Link
            to="/become-seller"
            className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm hover:bg-orange-600"
          >
            Become a Seller
          </Link>

          {/* Cart */}
          {isLoggedIn && (
            <button
              onClick={() => navigate("/cart")}
              className="p-2 bg-green-300 rounded-full"
            >
              <FaShoppingCart />
            </button>
          )}

          {/* Profile / Login */}
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-1 rounded-md text-sm hover:bg-green-700"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="text-green-800"
              >
                <FiUser />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-green-200 rounded-md shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-green-100 text-sm"
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-green-100 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
