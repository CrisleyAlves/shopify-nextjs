import { Product, ShopifyProduct } from "../product/types";
import { Connection, SEO } from "../shared/types";

export type CollectionProducts = {
  products: Product[];
  descriptionHtml: string;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      descriptionHtml: string;
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};
