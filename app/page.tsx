// /Users/hm/extract-color-from-img/app/page.tsx

import React, { Suspense } from 'react';
import ProductPage from './components/ProductPage';

// Loading component for instant feedback
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
  return (
    <Suspense fallback={<Loading />}>
      <div className="p-4">
        <ProductPage />
      </div>
    </Suspense>
  );
};

export default HomePage;
