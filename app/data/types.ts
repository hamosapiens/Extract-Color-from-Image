
export interface ProductImage {
    id: string;
    src: string;
    originalSrc: string;
    altText: string;
    width: number;
    height: number;
  }
  
  // Define types for Product Variant
  export interface ProductVariant {
    id: string;
    availableForSale: boolean;
    barcode: string | null; // Update here to allow null
    compareAtPrice: string;
    createdAt: string;
    displayName: string;
    inventoryManagement: string;
    inventoryPolicy: string;
    inventoryQuantity: number;
    legacyResourceId: string;
    position: number;
    price: string;
    requiresShipping: boolean;
    sku: string;
    storefrontId: string;
    taxable: boolean;
    taxCode: string;
    title: string;
    updatedAt: string;
    weight: number;
    weightUnit: string;
    product: {
      id: string;
      handle: string;
    };
    image: ProductImage;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    selectedOptionsMap: {
      [key: string]: string;
    };
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    compareAtPriceV2: {
      amount: string;
      currencyCode: string;
    };
  }
  
  // Define types for Product
  export interface Product {
    id: string;
    createdAt: string;
    description: string;
    descriptionHtml: string;
    handle: string;
    hasOnlyDefaultVariant: boolean;
    hasOutOfStockVariants: boolean;
    isGiftCard: boolean;
    legacyResourceId: string;
    onlineStoreUrl: string;
    productType: string;
    publishedAt: string;
    requiresSellingPlan: boolean;
    sellingPlanGroupCount: number;
    status: string;
    storefrontId: string;
    tags: string[];
    title: string;
    totalInventory: number;
    totalVariants: number;
    tracksInventory: boolean;
    updatedAt: string;
    vendor: string;
    featuredImage: ProductImage;
    images: ProductImage[];
    seo: {
      description: string | null;
      title: string;
    };
    options: {
      id: string;
      name: string;
      values: string[];
      position: number;
    }[];
    optionsMap: {
      Color: string[];
      Size: string[];
    };
    priceRange: {
      min: string;
      max: string;
    };
    currencyCode: string;
    variants: ProductVariant[];
  }

  