import type {
  CollectionType,
  CollectionProductsType,
  ShopifyCollectionProductsOperationType,
  ShopifyCollectionsOperationType,
} from "@/lib/shopify/types";

import {
  getCollectionProductsQuery,
  getCollectionsQuery,
} from "@/lib/shopify/collection/queries";
import { TAGS } from "@/lib/shopify/constants";
import {
  removeEdgesAndNodes,
  reshapeCollections,
  reshapeProducts,
} from "../utils";
import shopifyFetch from "../shopify-fetch";

export async function getCollections(): Promise<CollectionType[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperationType>({
    query: getCollectionsQuery,
    tags: [TAGS.collections],
  });

  const shopifyCollections = removeEdgesAndNodes(res?.body?.data?.collections);
  const collections = [
    // Filter out the hidden products
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith("hidden")
    ),
  ];

  return collections;
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<CollectionProductsType> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperationType>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
    },
  });

  if (!res.body.data.collection) {
    console.error(`No collection found for \`${collection}\``);
    return {
      products: [],
      descriptionHtml: "",
    };
  }

  const products = reshapeProducts(
    removeEdgesAndNodes(res.body.data.collection.products)
  );

  return {
    products,
    descriptionHtml: res.body.data.collection.descriptionHtml,
  };
}
