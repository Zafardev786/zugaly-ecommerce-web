"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaWallet, FaPlusCircle, FaExchangeAlt } from "react-icons/fa";

export default function WalletPage() {
  const router = useRouter();

  const transactions = [
    { id: 1, type: "Added", amount: 500, date: "12 Oct 2025", status: "Success" },
    { id: 2, type: "Used for Order #4589", amount: -250, date: "10 Oct 2025", status: "Completed" },
    { id: 3, type: "Cashback", amount: 100, date: "05 Oct 2025", status: "Received" },
  ];

  const balance = 1250;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => router.back()}>
          <FaArrowLeft className="text-gray-700 text-lg" />
        </button>
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FaWallet className="text-emerald-500" /> My Wallet
        </h2>
      </div>

      {/* Wallet Balance */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-emerald-500">
          <p className="text-sm text-gray-600">Wallet Balance</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">₹ {balance.toLocaleString()}</h3>
          <button
            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md flex items-center justify-center gap-2"
            onClick={() => alert('Add money feature coming soon')}
          >
            <FaPlusCircle /> Add Money
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="p-4">
        <h3 className="text-md font-semibold text-gray-700 flex items-center gap-2 mb-2">
          <FaExchangeAlt className="text-blue-500" /> Recent Transactions
        </h3>

        <div className="space-y-3">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="bg-white rounded-lg shadow-sm p-3 flex items-center justify-between hover:shadow-md transition-all"
            >
              <div>
                <p className="font-medium text-gray-800">{txn.type}</p>
                <p className="text-xs text-gray-500">{txn.date}</p>
              </div>
              <div
                className={`text-sm font-semibold ${
                  txn.amount > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {txn.amount > 0 ? `+₹${txn.amount}` : `₹${Math.abs(txn.amount)}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
