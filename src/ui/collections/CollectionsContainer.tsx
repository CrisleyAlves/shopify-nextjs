import { Product } from "@/lib/shopify/product/types";
import ProductList from "@/ui/shared/ProductList";

export default function CollectionsContainer({
  collectionName,
  products,
}: {
  collectionName: string;
  products: Product[];
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
