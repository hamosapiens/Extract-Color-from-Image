"use client";

import React, { useState, useEffect } from "react";
import products from "../data/sample-products";
import ProductImage from "./ProductImage";
import { clearCache } from "../utils/cacheUtils";

interface ProductPageProps {
  useCache: boolean;
}

const ProductPage: React.FC<ProductPageProps> = ({ useCache }) => {
  const [isCacheEnabled, setIsCacheEnabled] = useState(useCache);

  const handleToggleCache = async () => {
    if (isCacheEnabled) {
      // Clear cache and reload the page
      await clearCache();
      setIsCacheEnabled(false);
      updateUrlParameter(false);
      window.location.reload();
    } else {
      setIsCacheEnabled(true);
      updateUrlParameter(true);
      window.location.reload();
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const updateUrlParameter = (cacheEnabled: boolean) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("cache", cacheEnabled ? "true" : "false");
    const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    window.history.replaceState(null, '', newRelativePathQuery);
  };

  useEffect(() => {
    updateUrlParameter(isCacheEnabled);
  }, [isCacheEnabled]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-8xl font-bold text-center mb-8">🎨</div>
      <h1 className="text-5xl font-bold text-center mb-8">
        Extract Color from Image
      </h1>

      <div className="text-center mb-8 flex justify-center space-x-4">
        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center px-4 py-2 bg-black text-white rounded shadow-md hover:bg-gray-800 transition-all duration-200 ease-in-out"
          aria-label="Refresh Page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m0 0A8.001 8.001 0 0112 4c4.418 0 8 3.582 8 8s-3.582 8-8 8a8.001 8.001 0 01-7.418-5H4m.582 0H9"
            />
          </svg>
        </button>

        {/* Cache Toggle Button */}
        <button
          onClick={handleToggleCache}
          className="px-6 py-2 bg-black text-white rounded shadow-md hover:bg-gray-800 transition-all duration-200 ease-in-out"
        >
          {isCacheEnabled ? "Disable Cache and Reload" : "Enable Cache"}
        </button>
      </div>

      {products.map((product) => (
        <div key={product.id} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center">
            {product.title}
          </h2>
          <div className="flex flex-wrap justify-center space-x-4">
            {product.variants.map((variant) => (
              <ProductImage
                key={variant.id}
                variant={variant}
                size={300}
                useCache={isCacheEnabled}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
