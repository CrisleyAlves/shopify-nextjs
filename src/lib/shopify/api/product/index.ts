import type {
  ProductType,
  ShopifyProductOperationType,
  ShopifyProductRecommendationsOperationType,
  ShopifyProductsOperationType,
} from "@/lib/shopify/types/";

import { TAGS } from "@/lib/shopify/constants";
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from "@/lib/shopify/product/queries";
import { removeEdgesAndNodes, reshapeProduct, reshapeProducts } from "../utils";
import shopifyFetch from "../shopify-fetch";

export async function getProduct(
  handle: string
): Promise<ProductType | undefined> {
  const res = await shopifyFetch<ShopifyProductOperationType>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle,
    },
  });
  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(
  productId: string
): Promise<ProductType[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperationType>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId,
    },
    cache: "no-cache",
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<ProductType[]> {
  const res = await shopifyFetch<ShopifyProductsOperationType>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey,
    },
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}
