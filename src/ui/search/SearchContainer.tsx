import type { ProductType } from "@/lib/shopify/types";

import ProductList from "@/components/shared/ProductList";

import CollectionSortSelect from "./CollectionSortSelect";

export default function SearchContainer({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <div className="container pt-5 pb-5">
      <div className="grid md:grid-cols-1">
        <div className="ml-5">
          <div className="mb-[-20px] flex justify-between items-center">
            <p className="text-sm">
              showing{" "}
              <span className="font-bold text-blue-950" aria-live="polite">
                {products.length}
              </span>{" "}
              results
            </p>
            <CollectionSortSelect />
          </div>
          {!!products.length ? (
            <ProductList products={products} />
          ) : (
            <p className="pt-5">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}
