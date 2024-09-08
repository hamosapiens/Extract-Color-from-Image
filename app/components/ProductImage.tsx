import React, { useState, useEffect, useRef } from "react";
import useIntersectionObserver from "../utils/useIntersectionObserver";
import { advancedExtractColorFromImage } from "../utils/extractDominantColor";
import { cacheImage, getCachedImage, cacheColor, getCachedColor } from "../utils/cacheUtils";

interface ProductImageProps {
  variant: any;
  size?: number;
  useCache?: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({ variant, size = 300, useCache = true }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [hexColor, setHexColor] = useState<string | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Generate an optimized Shopify image URL
  const getOptimizedImageUrl = (url: string, width: number, height: number) => {
    const extensionIndex = url.lastIndexOf(".");
    const versionIndex = url.indexOf("?");
    const baseUrl = url.substring(0, extensionIndex);
    const extension = url.substring(extensionIndex, versionIndex);
    const version = url.substring(versionIndex);
    return `${baseUrl}_${width}x${height}${extension}${version}`;
  };

  // Intersection Observer logic to handle lazy loading
  const { observe } = useIntersectionObserver(async (entry) => {
    if (entry.isIntersecting && !isLoaded) {
      const optimizedUrl = getOptimizedImageUrl(variant.image.src, size, size);

      if (useCache) {
        const cachedImage = await getCachedImage(optimizedUrl);
        const cachedColor = await getCachedColor(variant.id);
        const cachedHexColor = await getCachedColor(variant.id + "-hex");

        if (cachedImage && cachedColor && cachedHexColor) {
          setImageSrc(cachedImage);
          setColor(cachedColor);
          setHexColor(cachedHexColor);
          setIsLoaded(true);
          return;
        }
      }

      // Load image and extract color
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = optimizedUrl;

      img.onload = async () => {
        setImageSrc(img.src);

        const extractedColor = await advancedExtractColorFromImage(img.src);
        const hex = rgbToHex(extractedColor);

        setColor(extractedColor);
        setHexColor(hex);

        if (useCache) {
          await cacheImage(optimizedUrl, img.src);
          await cacheColor(variant.id, extractedColor);
          await cacheColor(variant.id + "-hex", hex);
        }

        setIsLoaded(true);
      };
    }
  });

  useEffect(() => {
    if (imageRef.current) {
      observe(imageRef.current);
    }
  }, [observe, useCache]); // Include `useCache` in the dependency array to handle toggling

  const rgbToHex = (rgb: string) => {
    const rgbArray = rgb.replace(/[^\d,]/g, "").split(",").map(Number);
    const hex = rgbArray.map((x) => x.toString(16).padStart(2, "0")).join("");
    return `#${hex}`;
  };

  return (
    <div ref={imageRef} className="mb-8">
      {!isLoaded ? (
        <div>
          <div className="w-32 h-32 bg-gray-300 animate-pulse rounded mb-2"></div>
          <div className="mt-2 w-full h-6 bg-gray-200 animate-pulse rounded"></div>
        </div>
      ) : (
        <>
          <img
            src={imageSrc!}
            alt={variant.image.altText}
            className="w-32 h-32 object-cover rounded mb-2"
          />
          <div
            className="mt-2 w-6 h-6 rounded-full flex justify-center items-center mx-auto border-2 border-gray-200"
            style={{ backgroundColor: color! }}
          ></div>
          <div className="mt-2 text-center text-sm text-gray-500 mt-1">{color}</div>
          <div className="text-center text-sm text-gray-500 mt-1">{hexColor}</div>
        </>
      )}
    </div>
  );
};

export default ProductImage;
