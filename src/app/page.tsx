import React from "react";
import Banner from "@/ui/Banner";
import CollectionBanners from "@/ui/CollectionBanners";
import { ProductList } from "@/ui/ProductCard";

export default function Home(): React.ReactElement {
  return (
    <main>
      <Banner />
      <ProductList title="Men Best Sales" />
      <div className="bg-gray-100">
        <ProductList title="Women Best Sales" />
      </div>
      <CollectionBanners />
    </main>
  );
}
