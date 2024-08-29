"use client";

import React from "react";
import ProductPage from "./components/ProductPage";
import { clearCache } from "./utils/cacheUtils";
import RefreshIcon from './icons/RefreshIcon';
import ClearIcon from './icons/ClearIcon';


const HomePage: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleClearCache = async () => {
    await clearCache();
    alert("Cache storage cleared");
    window.location.reload(); // Reload the page after clearing the cache
  };

  return (
    <div className="p-4">
            <div className="text-8xl font-bold text-center mb-8">🎨</div>
      <h1 className="text-5xl font-bold text-center mb-8">
        Extract Color from Image
      </h1>
      <div className="text-center mb-8 flex justify-center space-x-4">
        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition-colors duration-200 ease-in-out"
        >
          <RefreshIcon />
        </button>

        {/* Clear Cache Button */}
        <button
          onClick={handleClearCache}
          className="flex items-center bg-black text-white rounded-full shadow-md px-4 py-2 hover:bg-gray-800 transition-colors duration-200 ease-in-out"
        >
          <ClearIcon />
          <span>Clear Cache</span>
        </button>
      </div>

      <ProductPage />
      <br />
      <div className="text-xs	text-center mb-2">
        💻
        <br />
        by Hamo Sapiens</div>
    </div>
  );
};

export default HomePage;
