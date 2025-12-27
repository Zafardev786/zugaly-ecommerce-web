import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-lime-50 min-h-screen py-10 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-100">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <span className="inline-block px-4 py-1 text-xs font-semibold tracking-widest text-green-700 bg-green-100 rounded-full mb-3">
            PRIVACY & DATA POLICY
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Privacy Policy
          </h1>

          <p className="text-sm text-gray-500">
            Effective Date: <strong>June 9, 2025</strong>
          </p>
        </div>

        {/* CONTENT */}
        <section className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

          <p>
            Welcome to <strong>Zugaly</strong>, operated by{" "}
            <strong>Zugaly Crops Private Limited</strong>.  
            This Privacy Policy explains how we collect, use, store, and protect
            your information when you use our platform for grocery shopping,
            order booking, distribution services, and seller onboarding.
          </p>

          <p>
            By accessing or using Zugaly’s website or mobile services, you agree
            to the practices described in this Privacy Policy.
          </p>

          {/* 1 */}
          <h2 className="text-xl font-bold text-gray-900 pt-4">
            1. Information We Collect
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Personal information (name, phone number, email, address)</li>
            <li>Account & login credentials</li>
            <li>Order history, cart details & booking records</li>
            <li>Payment & transaction data (via secure payment gateways)</li>
            <li>Distributor / seller KYC & business details (if applicable)</li>
            <li>Device, browser, IP address & cookies</li>
          </ul>

          {/* 2 */}
          <h2 className="text-xl font-bold text-gray-900 pt-4">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>To process grocery orders and bookings</li>
            <li>To manage delivery, logistics & distributor coordination</li>
            <li>To onboard and verify sellers or distributors</li>
            <li>To provide customer support & order updates</li>
            <li>To improve platform performance and user experience</li>
            <li>To send service-related notifications and offers</li>
            <li>To comply with legal and regulatory requirements</li>
          </ul>

          {/* 3 */}
          <h2 className="text-xl font-bold text-gray-900 pt-4">
            3. Cookies & Tracking Technologies
          </h2>
          <p>
            We use cookies and similar technologies to remember preferences,
            analyze traffic, and improve functionality. You can disable cookies
            in your browser settings, but some features may not work properly.
          </p>

          {/* 4 */}
          <h2 className="text-xl font-bold text-gray-900 pt-4">
            4. Data Sharing & Disclosure
          </h2>
          <p>We do <strong>not sell</strong> your personal data. Data may be shared only:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>With delivery partners and distributors to fulfill orders</li>
            <li>With payment gateways for secure transactions</li>
            <li>With analytics or IT service providers</li>
            <li>When required by law, court order, or government authority</li>
          </ul>

          {/* 5 */}
          <h2 className="text-xl font-bold text-gray-900 pt-4">
            5. Data Security
          </h2>
          <p>
            We follow industry-standard security practices to protect your data.
            However, no online system is 100% secure, and users are advised to
            safeguard their login credentials.
          </p>

          {/* 6 */}
          <h2 className="text-xl font-bold text-gray-900 pt-4">
            6. Children's Privacy
          </h2>
          <p>
            Zugaly services are not intended for children under 13 years of age.
            We do not knowingly collect data from minors.
          </p>

          {/* 7 */}
          <h2 className="text-xl font-bold text-gray-900 pt-4">
            7. Your Rights & Choices
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Access or update your personal information</li>
            <li>Request deletion of your account or data</li>
            <li>Opt-out of promotional communications</li>
            <li>Withdraw consent where applicable</li>
          </ul>

          {/* 8 */}
          <h2 className="text-xl font-bold text-gray-900 pt-4">
            8. Policy Updates
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with a revised effective date.
          </p>

          {/* 9 */}
          <h2 className="text-xl font-bold text-gray-900 pt-4">
            9. Contact Information
          </h2>
          <p className="bg-green-50 border border-green-100 rounded-xl p-4">
            <strong>Zugaly Crops Private Limited</strong>
            <br />
            Email:{" "}
            <a href="mailto:info@zugaly.com" className="text-green-700 underline">
              info@zugaly.com
            </a>
            <br />
            Registered Office:
            <br />
            C/o Edooqate, P.O. MIT, Laxmi Chowk, Fish Market,
            <br />
            M.I.T., Muzaffarpur, Bihar – 842003, India
          </p>
        </section>

        {/* FOOTER NOTE */}
        <p className="text-xs text-gray-500 text-center mt-10">
          © {new Date().getFullYear()} Zugaly Crops Private Limited. All rights reserved.
        </p>

      </div>
    </div>
  );
}
