"use client";
import withAuth from "@/components/hoc/withAuth";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCrown, FaStar, FaGift, FaRocket } from "react-icons/fa";

const MembershipPage = () => {
  const router = useRouter();

  const memberships = [
    {
      name: "Silver",
      level: 1,
      color: "text-gray-400",
      bg: "bg-gray-50",
      price: "Free",
      perks: [
        "5% cashback on every order",
        "Priority customer support",
        "Exclusive access to offers",
      ],
    },
    {
      name: "Gold",
      level: 2,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
      price: "₹299/year",
      perks: [
        "10% cashback on all orders",
        "Early access to sales",
        "Free delivery on all items",
        "Special festival rewards",
      ],
    },
    {
      name: "Platinum",
      level: 3,
      color: "text-blue-600",
      bg: "bg-blue-50",
      price: "₹799/year",
      perks: [
        "15% cashback on all orders",
        "24x7 dedicated support",
        "Free home delivery & gifts",
        "Exclusive premium offers",
      ],
    },
  ];

  const currentPlan = "Gold";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center gap-3 sticky top-0">
        <button onClick={() => router.back()}>
          <FaArrowLeft className="text-gray-700 text-lg" />
        </button>
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FaCrown className="text-yellow-500" /> Membership & Rewards
        </h2>
      </div>

      {/* Current Plan */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-3 shadow-md border-l-4 border-yellow-500">
          <p className="font-semibold text-gray-800">
            Current Plan:{" "}
            <span className="text-yellow-600 font-bold">{currentPlan}</span>
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Next Upgrade: Platinum (Spend ₹5000 more)
          </p>
        </div>
      </div>

      {/* Membership Cards */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {memberships.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl shadow-sm p-4 ${plan.bg} hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-center justify-between">
              <h3
                className={`text-lg font-semibold ${plan.color} flex items-center gap-2`}
              >
                <FaCrown /> {plan.name} Plan
              </h3>
              <span className="text-sm font-medium text-gray-700">
                {plan.price}
              </span>
            </div>

            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              {plan.perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-2">
                  {plan.level === 1 && <FaStar className="text-gray-400 mt-0.5" />}
                  {plan.level === 2 && <FaGift className="text-yellow-500 mt-0.5" />}
                  {plan.level === 3 && <FaRocket className="text-blue-500 mt-0.5" />}
                  {perk}
                </li>
              ))}
            </ul>

            <button
              className={`mt-4 w-full py-2 rounded-md text-white font-medium transition-all ${currentPlan === plan.name
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {currentPlan === plan.name ? "Your Current Plan" : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


export default withAuth(MembershipPage);