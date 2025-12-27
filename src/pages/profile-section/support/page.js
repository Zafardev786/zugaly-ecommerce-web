"use client";
import { useRouter } from "next/navigation";
import { FaHeadset, FaArrowLeft, FaEnvelope, FaPhone, FaCommentDots } from "react-icons/fa";

export default function SupportPage() {
  const router = useRouter();

  const contactOptions = [
    { id: 1, title: "Email Us", icon: FaEnvelope, info: "support@zugaly.in", action: () => window.location.href = "mailto:support@zugaly.in" },
    { id: 2, title: "Call Us", icon: FaPhone, info: "+91 9031603923", action: () => window.location.href = "tel:+9031603923" },
    { id: 3, title: "Live Chat", icon: FaCommentDots, info: "Chat with us", action: () => alert("Live chat coming soon!") },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => router.back()}>
          <FaArrowLeft className="text-gray-700 text-lg" />
        </button>
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FaHeadset className="text-purple-500" /> Customer Support
        </h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Contact Options */}
        {contactOptions.map(({ id, title, icon: Icon, info, action }) => (
          <button
            key={id}
            onClick={action}
            className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition"
          >
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
              <Icon size={18} />
            </div>
            <div className="flex flex-col text-left">
              <p className="font-medium text-gray-800">{title}</p>
              <span className="text-sm text-gray-500">{info}</span>
            </div>
          </button>
        ))}

        {/* FAQ Placeholder */}
        <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-gray-800">FAQs</h3>
          <p className="text-gray-500 text-sm mt-2">Coming soon: Frequently asked questions section.</p>
        </div>
      </div>
    </div>
  );
}
