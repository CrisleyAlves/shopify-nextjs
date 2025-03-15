import React from "react";

import { getProducts } from "@/lib/shopify/api/product";
import { SORT_KEYS } from "@/lib/shopify/constants";
import { getCollections } from "@/lib/shopify/api/collection";

import CollectionBanners from "@/ui/shared/CollectionBanners";
import ProductList from "@/ui/shared/ProductList";
import Banner from "@/ui/shared/Banner";

export const metadata = {
  title: "CLOTHES | Store",
  description: "A huge variety of clothes for men",
};

export default async function Home(): Promise<React.ReactElement> {
  const products = await getProducts({
    sortKey: SORT_KEYS.RELEVANCE,
    reverse: false,
    query: "",
  });

  const collections = await getCollections();

  return (
    <main>
      <Banner />
      <div className="container p-5 md:pt-5 md:pb-5 xl:pl-0 xl:pr-0">
        <ProductList title="Best Sales" products={products.slice(0, 4)} />
      </div>
      <div className="bg-gray-100 p-5 md:pt-5 md:pb-5 xl:pl-0 xl:pr-0">
        <div className="container">
          <ProductList
            title="Recommended for you"
            products={products.slice(6, 10)}
          />
        </div>
      </div>
      <CollectionBanners collections={collections} />
    </main>
  );
}
