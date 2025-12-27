import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-green-50 min-h-screen py-10 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-100">

        {/* HEADER */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1 text-xs font-semibold tracking-widest text-green-700 bg-green-100 rounded-full mb-3">
            LEGAL INFORMATION
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Terms & Conditions
          </h1>

          <p className="text-sm text-gray-500">
            Effective Date: <strong>June 9, 2025</strong>
          </p>
        </div>

        {/* INTRO */}
        <p className="text-gray-700 text-base leading-relaxed mb-6">
          Welcome to <strong>Zugaly</strong>, a grocery shopping and distribution
          platform operated by <strong>Zugaly Crops Private Limited</strong>.
          By accessing, browsing, or using our website or services, you agree
          to comply with and be bound by the following Terms & Conditions.
        </p>

        {/* IMPORTANT NOTE */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 text-sm text-yellow-800">
          ⚠️ <strong>Important:</strong> Please read these terms carefully before
          placing an order or registering as a user, seller, or distributor.
        </div>

        {/* CONTENT */}
        <section className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">

          {/* 1 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              1. Use of the Platform
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>You must be at least 18 years old to place orders independently.</li>
              <li>All registration details must be accurate and up to date.</li>
              <li>You are responsible for maintaining account confidentiality.</li>
              <li>Zugaly reserves the right to refuse service or cancel orders.</li>
            </ul>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              2. Orders, Pricing & Payments
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Product prices may change without prior notice.</li>
              <li>Orders are confirmed only after successful payment.</li>
              <li>Payments may be processed via UPI, COD, or third-party gateways.</li>
              <li>Offers and discounts are subject to availability and conditions.</li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              3. Delivery, Cancellation & Returns
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Delivery timelines may vary based on location and stock.</li>
              <li>Perishable items are not eligible for return once delivered.</li>
              <li>Any damaged or missing item must be reported within 24 hours.</li>
              <li>Refunds, if applicable, will be processed as per policy.</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              4. Seller & Distributor Terms
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Sellers/distributors must provide valid KYC and business details.</li>
              <li>Zugaly may suspend accounts for policy violations.</li>
              <li>Commission structures are subject to change.</li>
            </ul>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              5. Intellectual Property
            </h2>
            <p>
              All content, logos, designs, and technology are the exclusive
              property of <strong>Zugaly Crops Private Limited</strong>. Any
              unauthorized use is strictly prohibited.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              6. User Conduct
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Fraudulent or abusive behavior will not be tolerated.</li>
              <li>Users must not violate any applicable laws or regulations.</li>
            </ul>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              7. Limitation of Liability
            </h2>
            <p>
              Zugaly shall not be liable for indirect, incidental, or
              consequential damages arising from platform usage.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              8. Termination of Access
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms without prior notice.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              9. Updates to Terms
            </h2>
            <p>
              These Terms & Conditions may be updated periodically. Continued
              usage implies acceptance of the revised terms.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              10. Contact Information
            </h2>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p>
                <strong>Zugaly Crops Private Limited</strong>
                <br />
                Email:{" "}
                <a
                  href="mailto:info@zugaly.com"
                  className="text-green-700 underline"
                >
                  info@zugaly.com
                </a>
                <br />
                Registered Office:
                <br />
                C/o Edooqate, P.O. MIT, Laxmi Chowk, Fish Market,
                <br />
                M.I.T., Muzaffarpur, Bihar – 842003, India
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center mt-10">
          © {new Date().getFullYear()} Zugaly Crops Private Limited. All rights reserved.
        </p>
      </div>
    </div>
  );
}
