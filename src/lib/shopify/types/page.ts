import type { ConnectionType, SEOType } from "./shared";

export type PageType = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEOType;
  createdAt: string;
  updatedAt: string;
};

export type ShopifyPageOperationType = {
  data: { pageByHandle: PageType };
  variables: { handle: string };
};

export type ShopifyPagesOperationType = {
  data: {
    pages: ConnectionType<PageType>;
  };
};
