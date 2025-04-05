import type { ProductType } from "@/lib/shopify/product/types";

import ProductList from "@/components/shared/ProductList";

export default function CollectionsContainer({
  collectionName,
  products,
}: {
  collectionName: string;
  products: ProductType[];
}) {
  return (
    <section>
      <h2 className="text-5xl font-light tex capitalize text-center">
        {collectionName}
      </h2>

      <ProductList products={products} />
    </section>
  );
}
