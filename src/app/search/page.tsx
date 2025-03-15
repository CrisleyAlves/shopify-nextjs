import { getCollections } from "@/lib/shopify/api/collection";
import { getProducts } from "@/lib/shopify/api/product";
import { DEFAULT_SORT, sorting } from "@/lib/shopify/constants";
import { Product } from "@/lib/shopify/product/types";
import SearchContainer from "@/ui/search/SearchContainer";

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

  return <SearchContainer collections={collections} products={products} />;
}
