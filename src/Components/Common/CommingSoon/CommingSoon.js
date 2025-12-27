"use client";
import CountdownTimer from "./CountdownTimer";

export default function ComingSoon({ targetDate }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">🚀 Coming Soon</h1>
                <p className="text-lg text-gray-400">
                    We are working hard to bring something amazing. Stay tuned!
                </p>

                <div className="mt-8">
                    <p className="text-xl font-semibold">Launching in:</p>
                    <CountdownTimer targetDate={targetDate} />
                </div>

                <div className="mt-6">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 rounded-lg text-black w-64"
                    />
                    <button className="ml-2 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
                        Notify Me
                    </button>
                </div>
            </div>
        </div>
    );
}
