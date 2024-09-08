import React from 'react';
import { ProductVariant } from '../data//types';

interface ModalContentProps {
  variant: ProductVariant;
  hexColor: string | null;
}

const ModalContent: React.FC<ModalContentProps> = ({ variant, hexColor }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{variant.product.handle}</h2>
      <div className="mb-4">
        <img src={variant.image.src} alt={variant.image.altText} className="w-full rounded" />
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: hexColor || '#ffffff' }}
        ></div>
        <span>{hexColor}</span>
      </div>
      <p className="text-lg font-semibold mt-4">
        {variant.priceV2.amount} {variant.priceV2.currencyCode}
      </p>
    </>
  );
};

export default ModalContent;
