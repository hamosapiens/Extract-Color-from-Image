"use client";

import React from "react";
import products from "../data/sample-products";
import ProductImage from "./ProductImage";

const ProductPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
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
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
