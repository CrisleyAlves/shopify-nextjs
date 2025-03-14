import { getCollections } from "@/lib/shopify/api/collection";
import { getProducts } from "@/lib/shopify/api/product";
import { DEFAULT_SORT, sorting } from "@/lib/shopify/constants";
import { Product } from "@/lib/shopify/product/types";
import CollectionSection from "@/ui/CollectionSection";
import { ProductList } from "@/ui/ProductCard";
import SortSelect from "@/ui/SortSelect";

export const metadata = {
  title: "Search Products",
  description: "Search for products in the store",
};

const getProductsWithArguments = async function ({
  searchParams,
}: Readonly<{
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}>): Promise<Product[]> {
  const param = await searchParams;
  const { sort, q: searchValue } = param as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || DEFAULT_SORT;

  const products = await getProducts({
    sortKey,
    reverse,
    query: searchValue,
  });

  return products;
};

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  const products = await getProductsWithArguments({ searchParams });
  const collections = await getCollections();

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
            <SortSelect />
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
