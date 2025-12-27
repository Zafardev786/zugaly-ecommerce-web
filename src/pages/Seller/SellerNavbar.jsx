import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SellerNavbar = () => {
    const navigate = useNavigate();
    const [sellerId, setSellerId] = useState(null);

    /* ---------------- CHECK LOGIN ---------------- */
    useEffect(() => {
        const id = localStorage.getItem("selleId");
        setSellerId(id);
    }, []);

    /* ---------------- LOGOUT ---------------- */
    const handleLogout = () => {
        localStorage.removeItem("selleId");
        navigate("/become-seller/login");
    };

    return (
        <nav className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-30">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                        Z
                    </div>
                    <div className="leading-tight">
                        <p className="font-semibold text-slate-800 text-sm md:text-base">
                            Zugaly Crops
                        </p>
                        <p className="text-[11px] md:text-xs text-slate-500">
                            Smart Seller Panel
                        </p>
                    </div>
                </div>

                {/* Right Menu */}
                <div className="flex items-center gap-3 md:gap-4">
                    <ul className="hidden md:flex items-center gap-4 text-sm text-slate-600">
                        <li className="hover:text-green-700 cursor-pointer">Features</li>
                        <li className="hover:text-green-700 cursor-pointer">Pricing</li>
                        <li className="hover:text-green-700 cursor-pointer">Support</li>
                    </ul>

                    {!sellerId ? (
                        <button
                            onClick={() => navigate("/become-seller/login")}
                            className="px-4 md:px-5 py-2 rounded-full text-sm font-semibold bg-green-600 hover:bg-green-700 text-white shadow-sm"
                        >
                            Seller Login
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="px-4 md:px-5 py-2 rounded-full text-sm font-semibold bg-red-600 hover:bg-red-700 text-white shadow-sm"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default SellerNavbar;
