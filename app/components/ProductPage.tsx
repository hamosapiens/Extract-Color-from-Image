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
    if (!isCacheEnabled) {
      await clearCache(); // Clear cache when caching is toggled off
    }
    setIsCacheEnabled(!isCacheEnabled);
  };

  useEffect(() => {
    // Update URL without reloading the page
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("cache", isCacheEnabled ? "true" : "false");
    const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    window.history.pushState(null, '', newRelativePathQuery);
  }, [isCacheEnabled]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-8xl font-bold text-center mb-8">🎨</div>
      <h1 className="text-5xl font-bold text-center mb-8">Extract Color from Image</h1>
      
      {/* Cache Toggle Button */}
      <div className="text-center mb-8">
        <button onClick={handleToggleCache} className="px-4 py-2 bg-blue-500 text-white rounded">
          {isCacheEnabled ? "Disable Cache" : "Enable Cache"}
        </button>
      </div>
      
      {products.map((product) => (
        <div key={product.id} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center">{product.title}</h2>
          <div className="flex flex-wrap justify-center space-x-4">
            {product.variants.map((variant) => (
              <ProductImage key={variant.id} variant={variant} size={300} useCache={isCacheEnabled} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
