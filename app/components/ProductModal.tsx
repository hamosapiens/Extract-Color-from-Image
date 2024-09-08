import React, { useEffect, useRef } from 'react';
import { ProductVariant } from '../data/types'; // adjust the path as necessary

interface ProductModalProps {
  variant: ProductVariant | null;
  isOpen: boolean;
  onClose: () => void;
  hexColor: string | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ variant, isOpen, onClose, hexColor }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on `ESC` key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !variant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-lg p-6 max-w-lg w-full overflow-auto"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
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
        <p className="text-lg font-semibold mt-4">{variant.priceV2.amount} {variant.priceV2.currencyCode}</p>
      </div>
    </div>
  );
};

export default ProductModal;
