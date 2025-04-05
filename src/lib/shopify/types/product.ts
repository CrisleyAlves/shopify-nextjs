import type { ConnectionType, ImageType, MoneyType, SEOType } from "./shared";

export type ProductOptionType = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariantType = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: MoneyType;
};

export type ShopifyProductType = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOptionType[];
  brand: {
    value: string;
  };
  priceRange: {
    maxVariantPrice: MoneyType;
    minVariantPrice: MoneyType;
  };
  variants: ConnectionType<ProductVariantType>;
  featuredImage: ImageType;
  images: ConnectionType<ImageType>;
  seo: SEOType;
  tags: string[];
  updatedAt: string;
};

export type ProductType = Omit<ShopifyProductType, "variants" | "images"> & {
  variants: ProductVariantType[];
  images: ImageType[];
};

export type ShopifyProductsOperationType = {
  data: {
    products: ConnectionType<ShopifyProductType>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyProductOperationType = {
  data: { product: ShopifyProductType };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperationType = {
  data: {
    productRecommendations: ShopifyProductType[];
  };
  variables: {
    productId: string;
  };
};
