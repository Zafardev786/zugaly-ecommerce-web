"use client";
import { useRouter } from "next/navigation";
import { FaBell, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

export default function NotificationsPage() {
  const router = useRouter();

  const notifications = [
    { id: 1, title: "Order #4589 Confirmed", date: "12 Oct 2025", read: false },
    { id: 2, title: "Wallet Cashback Received ₹100", date: "10 Oct 2025", read: true },
    { id: 3, title: "Your Gold Membership will expire soon", date: "05 Oct 2025", read: false },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => router.back()}>
          <FaArrowLeft className="text-gray-700 text-lg" />
        </button>
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FaBell className="text-pink-500" /> Notifications
        </h2>
      </div>

      <div className="p-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="text-gray-500 text-sm text-center mt-10">
            No notifications yet.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`bg-white rounded-lg shadow-sm p-3 flex items-center justify-between hover:shadow-md transition-all ${
                notif.read ? "opacity-70" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                {!notif.read && <FaCheckCircle className="text-green-500" />}
                <p className="text-gray-800 font-medium">{notif.title}</p>
              </div>
              <span className="text-xs text-gray-500">{notif.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
