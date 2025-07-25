import { ensureStartWith } from "@/lib/shopify/utils/navigation";

export const STORE_FRONT_API_MENUS = {
  NAVBAR_MENU: "next-js-frontend-menu",
  FOOTER_MENU: "next-js-footer-menu",
};

export const STORE_FRONT_API_SECTIONS = {
  INFO_LINK_SECTION: "info-link-section",
};

export const SORT_KEYS = {
  RELEVANCE: "RELEVANCE",
  BEST_SELLING: "BEST_SELLING",
  CREATED_AT: "CREATED_AT",
  PRICE: "PRICE",
};

export type SortFilterItem = {
  title: string;
  slug: string | "";
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
};

export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};

export const DEFAULT_SORT: SortFilterItem = {
  title: "Relevance",
  slug: "",
  sortKey: "RELEVANCE",
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  DEFAULT_SORT,
  {
    title: "Trending",
    slug: "trending-desc",
    sortKey: "BEST_SELLING",
    reverse: false,
  }, // asc
  {
    title: "Latest arrivals",
    slug: "latest-desc",
    sortKey: "CREATED_AT",
    reverse: true,
  },
  {
    title: "Price: Low to high",
    slug: "price-asc",
    sortKey: "PRICE",
    reverse: false,
  }, // asc
  {
    title: "Price: High to low",
    slug: "price-desc",
    sortKey: "PRICE",
    reverse: true,
  },
];

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";
export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2025-01/graphql.json";

export const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";

export const STOREFRONT_GRAPHQL_ENDPOINT = `${DOMAIN}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
export const STOREFRONT_KEY = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

/**
 * @todo organize constants file later
 */
export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  CHECKOUT: "/checkout",
  SUCCESS: "/success",
  ACCOUNT_OVERVIEW: "/account",
  ACCOUNT_LOGIN: "/account/login",
  ACCOUNT_CREATE: "/account/create",
};

export const PRODUCT_VARIANT_TYPE = {
  SIZE: "Size",
};

export const IMAGE_NOT_AVAILABLE_PATH = "/image-not-available.jpg";
export const NO_PROFILE_IMAGE = "/no-profile-image.png";
