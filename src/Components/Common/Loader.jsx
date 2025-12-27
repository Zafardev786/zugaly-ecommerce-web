import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 backdrop-blur-md">

      {/* ❤️ HEART PULSE ICON */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 rounded-full bg-green-300/30 animate-ping"></div>

        <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center shadow-xl animate-pulse">
          <span className="text-white text-2xl">❤</span>
        </div>
      </div>

      {/* 🌿 BRAND TEXT */}
      <h2 className="mt-6 text-lg font-semibold text-green-700 tracking-wide">
        Preparing freshness for you
      </h2>

      {/* ⏳ SUB TEXT */}
      <p className="mt-1 text-sm text-gray-600">
        Please wait a moment...
      </p>

      {/* 🌟 FLOATING DOTS */}
      <div className="flex gap-1 mt-3">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
      </div>
    </div>
  );
};

export default Loader;
