"use client";

import React from "react";
import products from "../data/sample-products";
import ProductImage from "./ProductImage";

const ProductPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-8xl font-bold text-center mb-8">🎨</div>
      <h1 className="text-5xl font-bold text-center mb-8">Extract Color from Image</h1>
      {products.map((product) => (
        <div key={product.id} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center">{product.title}</h2>
          <div className="flex flex-wrap justify-center space-x-4">
            {product.variants.map((variant) => (
              <ProductImage key={variant.id} variant={variant} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
