import { shopifyFetch } from "../shopify-fetch";
import {
  getCollectionProductsQuery,
  getCollectionsQuery,
} from "../../collection/queries";
import {
  Collection,
  CollectionProducts,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
} from "../../collection/types";
import { TAGS } from "../../constants";
import { Product } from "../../product/types";
import {
  removeEdgesAndNodes,
  reshapeCollections,
  reshapeProducts,
} from "../utils";

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections],
  });

  const shopifyCollections = removeEdgesAndNodes(res?.body?.data?.collections);
  const collections = [
    {
      handle: "",
      title: "All",
      description: "All products",
      seo: {
        title: "All",
        description: "All products",
      },
      path: "/search",
      updatedAt: new Date().toISOString(),
    },
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
}): Promise<CollectionProducts> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
    },
  });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
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
