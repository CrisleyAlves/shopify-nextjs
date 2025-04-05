import type {
  ProductType,
  ShopifyProductType,
  ConnectionType,
  ImageType,
  SEOType,
} from "./";

export type CollectionProductsType = {
  products: ProductType[];
  descriptionHtml: string;
};

export type ShopifyCollectionType = {
  handle: string;
  title: string;
  description: string;
  image: ImageType;
  seo: SEOType;
  updatedAt: string;
};

export type CollectionType = ShopifyCollectionType & {
  path: string;
};

export type ShopifyCollectionsOperationType = {
  data: {
    collections: ConnectionType<ShopifyCollectionType>;
  };
};

export type ShopifyCollectionProductsOperationType = {
  data: {
    collection: {
      descriptionHtml: string;
      products: ConnectionType<ShopifyProductType>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};
