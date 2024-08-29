"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const cacheParam = searchParams.get("cache");
  const useCache = cacheParam !== "false"; // Default to true unless "cache=false" is explicitly set

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-4">
        <ProductPage useCache={useCache} />
      </div>
    </Suspense>
  );
};

export default HomePage;
