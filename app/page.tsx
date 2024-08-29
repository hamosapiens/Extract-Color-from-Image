"use client";

import React, { useEffect, useState } from "react";
import ProductPage from "./components/ProductPage";

function Loading() {
  return (
    <div className="p-6">
      <div className="w-full h-32 bg-gray-200 animate-pulse mb-8"></div>
      <div className="w-full h-32 bg-gray-200 animate-pulse mb-8"></div>
      <div className="w-full h-32 bg-gray-200 animate-pulse mb-8"></div>
    </div>
  );
}

const HomePage: React.FC = () => {
  const [isCacheEnabled, setIsCacheEnabled] = useState(true);

  useEffect(() => {
    const cacheSetting = localStorage.getItem("useCache");
    if (cacheSetting === "false") {
      setIsCacheEnabled(false);
    }
  }, []);

  const handleToggleCache = async () => {
    const newCacheState = !isCacheEnabled;
    setIsCacheEnabled(newCacheState);
    localStorage.setItem("useCache", newCacheState.toString());
    window.location.reload(); // Reload the page to apply changes
  };

  return (
    <div className="p-4">
      <div className="text-center mb-8 flex justify-center space-x-4">
        {/* Refresh Button */}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition-colors duration-200 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5a7.5 7.5 0 1 1 1.566 4.827m-4.066-1.327V16.5h3"
            />
          </svg>
        </button>

        {/* Cache Toggle Button */}
        <button
          onClick={handleToggleCache}
          className="px-6 py-2 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition-colors duration-200 ease-in-out"
        >
          {isCacheEnabled ? "Disable Cache and Reload" : "Enable Cache"}
        </button>
      </div>

      <ProductPage useCache={isCacheEnabled} />
    </div>
  );
};

export default HomePage;
