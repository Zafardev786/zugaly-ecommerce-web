import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="hidden md:block bg-[#E0E3D3] text-[#27472B] pt-8 pb-4 mt-12">
      {/* Upper Strip */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        
        {/* Brand & Tagline */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold tracking-wide">
            Zugaly Crops Pvt. Ltd.
          </h3>
          <p className="text-sm mt-1 max-w-xs">
            शुद्ध मसालों का भरोसेमंद ठिकाना – बिहार का असली स्वाद आपके घर तक।
          </p>

          {/* Trust line */}
          <p className="text-xs mt-2 text-[#3b5d3f]">
            FSSAI Registered • ISO 9001:2015 Certified • Trademarked Brand
          </p>
        </div>

        {/* Quick Links */}
        <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
          {[
            { to: "/about", label: "About Us" },
            { to: "/contact", label: "Contact" },
            // { to: "/shop", label: "Shop" },
            { to: "/privacy-policy", label: "Privacy Policy" },
            { to: "/terms-and-conditions", label: "Terms & Conditions" },
          ].map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="hover:text-green-700 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex gap-3">
          <a
            href="https://www.facebook.com/profile.php?id=61577650121590"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#27472B] hover:bg-[#27472B] hover:text-white transition"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.linkedin.com/company/107653531/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#27472B] hover:bg-[#27472B] hover:text-white transition"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://www.youtube.com/@zugalycropsprivatelimited"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#27472B] hover:bg-[#27472B] hover:text-white transition"
          >
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="mt-6 border-t border-[#c7cabc] pt-3 text-center text-xs">
        © {new Date().getFullYear()} Zugaly Crops Private Limited. All rights reserved.
      </div>
    </footer>
  );
}
