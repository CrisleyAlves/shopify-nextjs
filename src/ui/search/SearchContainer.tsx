import { Product } from "@/lib/shopify/product/types";
import { Collection } from "@/lib/shopify/collection/types";
import ProductList from "@/components/shared/ProductList";

import CollectionSortSelect from "./CollectionSortSelect";
import CollectionSection from "./CollectionSection";

export default function SearchContainer({
  products,
  collections,
}: {
  products: Product[];
  collections: Collection[];
}) {
  return (
    <div className="container pt-5 pb-5">
      <div className="grid md:grid-cols-5">
        <CollectionSection collections={collections} />

        <div className="col-span-4 ml-5">
          <div className="mb-[-20px] flex justify-between items-center">
            <p className="text-sm">
              showing{" "}
              <span className="font-bold text-blue-950">{products.length}</span>{" "}
              results
            </p>
            <CollectionSortSelect />
          </div>
          {!!products.length ? (
            <ProductList products={products} />
          ) : (
            <p className="pt-5">not results found</p>
          )}
        </div>
      </div>
    </div>
  );
}
