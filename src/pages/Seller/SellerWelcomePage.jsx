import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SellerWelcomePage = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
    
      {/* HERO SECTION */}
      <main className="max-w-6xl mx-auto px-4 pt-8 pb-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-green-600 mb-2">
              Welcome Sellers
            </p>

            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-snug mb-3">
              Zugaly Crops ke sath apna{" "}
              <span className="text-green-600">business online grow</span>{" "}
              karein 🚀
            </h1>

            <p className="text-sm md:text-base text-slate-600 mb-4">
              Products list karein, orders manage karein aur earnings track
              karein — ek simple seller dashboard ke through.
            </p>

            <ul className="space-y-2 text-sm md:text-base text-slate-700 mb-6">
              <li className="flex gap-2">
                <span className="text-green-600">✔</span>
                Fast onboarding — KYC ke baad selling start
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✔</span>
                Real-time orders & payouts
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✔</span>
                Dedicated seller support
              </li>
            </ul>

            <div className="flex flex-wrap gap-3">
              {!sellerId ? (
                <button
                  onClick={() => navigate("/become-seller/login")}
                  className="px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold shadow-md"
                >
                  Seller Login kare →
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-md"
                >
                  Logout
                </button>
              )}

              <button
                onClick={() =>
                  document
                    .getElementById("seller-steps-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-4 py-2.5 rounded-full border border-slate-300 text-sm text-slate-700 hover:bg-white"
              >
                Benefits Dekhein
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-2xl shadow-md p-6 border">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              Seller Benefits 💼
            </h2>

            {[
              "Easy product listing",
              "Transparent payouts",
              "Marketing & growth support",
            ].map((t, i) => (
              <div key={i} className="flex gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700">{t}</p>
              </div>
            ))}

            <div className="mt-4 p-3 rounded-xl bg-green-50 text-xs text-green-800">
              👉 <b>Note:</b> KYC complete hona mandatory hai.
            </div>
          </div>
        </div>
      </main>

      {/* STEPS */}
      <section
        id="seller-steps-section"
        className="bg-green-600 text-white py-14 text-center"
      >
        <h2 className="text-2xl font-semibold mb-3">Kaise banoge Seller?</h2>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            "Personal Info",
            "Business Address",
            "KYC Docs",
            "Shop Proofs",
            "Bank Details",
          ].map((s, i) => (
            <div
              key={i}
              className="w-32 h-28 bg-white text-green-700 rounded-xl flex flex-col items-center justify-center shadow"
            >
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">
                {i + 1}
              </div>
              <p className="mt-2 text-xs font-medium">{s}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/become-seller/login")}
          className="mt-10 px-6 py-3 bg-white text-green-700 rounded-full font-semibold shadow"
        >
          Start Selling →
        </button>
      </section>
    </div>
  );
};

export default SellerWelcomePage;
