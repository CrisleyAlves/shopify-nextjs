import React from "react";
import Banner from "@/ui/Banner";
import CollectionBanners from "@/ui/CollectionBanners";
import { ProductList } from "@/ui/ProductCard";

export default function Home(): React.ReactElement {
  return (
    <main>
      <Banner />
      <div className="container p-5 md:pt-5 md:pb-5 xl:pl-0 xl:pr-0">
        <ProductList title="Men Best Sales" />
      </div>
      <div className="bg-gray-100 p-5 md:pt-5 md:pb-5 xl:pl-0 xl:pr-0">
        <div className="container">
          <ProductList title="Women Best Sales" />
        </div>
      </div>
      <CollectionBanners />
    </main>
  );
}
