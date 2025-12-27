import usePageTitle from "@/hooks/usePageTitle";
import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ContactInfoPage = () => {
    usePageTitle("Contact Us | Zugaly");
  const contactInfo = [
    {
      type: "Email Us",
      icon: <FiMail className="text-green-600 w-6 h-6" />,
      bg: "bg-green-50",
      details: ["info@zugaly.com"],
      desc: "Business queries, partnerships & support",
    },
    {
      type: "Call Us",
      icon: <FiPhone className="text-yellow-600 w-6 h-6" />,
      bg: "bg-yellow-50",
      details: [
        "+91 90316 03921",
        "+91 90316 03923",
        "0621 4500515",
        "+91 78705 44023",
      ],
      desc: "Mon–Sat • 10:00 AM – 6:00 PM",
    },
    {
      type: "Registered Office",
      icon: <FiMapPin className="text-blue-600 w-6 h-6" />,
      bg: "bg-blue-50",
      details: [
        "C/o Edooqate, P.O. MIT, Laxmi Chowk, Fish Market,",
        "M.I.T., Muzaffarpur, Bihar – 842003, India",
      ],
      desc: "Official business & legal address",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-lime-100 to-white flex flex-col">
      {/* HERO */}
      <div className="text-center px-4 pt-14 pb-8">
        <span className="inline-block px-4 py-1 text-xs font-semibold tracking-widest text-green-700 bg-green-200 rounded-full mb-4">
          CONTACT ZUGALY CROPS
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3">
          We’re Here to <span className="text-green-600">Help You</span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
          Have questions about our products, pricing, bulk orders or partnerships?
          Our team is always ready to support you.
        </p>
      </div>

      {/* CONTENT */}
      <main className="flex-grow flex justify-center px-4 pb-12">
        <div className="max-w-4xl w-full grid gap-6 md:grid-cols-3">
          {contactInfo.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`${item.bg} p-3 rounded-full`}>
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {item.type}
                  </h2>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>

              <ul
                className={`text-sm ${
                  item.type === "Registered Office"
                    ? "text-gray-600 leading-relaxed"
                    : "text-green-700 space-y-1 font-medium"
                }`}
              >
                {item.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      {/* TRUST / CTA STRIP */}
      <div className="bg-green-600 text-white text-center py-6 px-4">
        <p className="text-sm md:text-base font-medium">
          🌱 Trusted by farmers, traders & retailers across Bihar & India
        </p>
        <p className="text-xs opacity-90 mt-1">
          Quality spices • Transparent pricing • Reliable supply
        </p>
      </div>


      <p className="text-xs text-gray-500 text-center py-4">
        © {new Date().getFullYear()} Zugaly Crops Private Limited. All rights reserved.
      </p>
    </div>
  );
};

export default ContactInfoPage;
