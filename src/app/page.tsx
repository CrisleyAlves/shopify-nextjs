import React from "react";
import Banner from "@/ui/Banner";
import CollectionBanners from "@/ui/CollectionBanners";
import { ProductList } from "@/ui/ProductCard";
import { getProducts } from "@/lib/shopify/api/product";
import { SORT_KEYS } from "@/lib/shopify/constants";

export default async function Home(): Promise<React.ReactElement> {
  const products = await getProducts({
    sortKey: SORT_KEYS.RELEVANCE,
    reverse: false,
    query: "",
  });

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
      <CollectionBanners />
    </main>
  );
}
