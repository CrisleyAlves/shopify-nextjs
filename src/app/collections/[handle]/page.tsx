import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionProducts } from "@/lib/shopify/api/collection";
import { SORT_KEYS } from "@/lib/shopify/constants";
import { ProductList } from "@/ui/ProductCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const collectionName = (await params).handle;
  const collection = await getCollectionProducts({
    collection: collectionName,
    reverse: false,
    sortKey: SORT_KEYS.RELEVANCE,
  });

  if (!collection.products.length) return notFound();

  return {
    title: `Collection - ${collectionName}`,
    description: collection.descriptionHtml,
  };
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ handle: string }>;
}>) {
  const collectionName = (await params).handle;
  const collection = await getCollectionProducts({
    collection: collectionName,
    reverse: false,
    sortKey: SORT_KEYS.RELEVANCE,
  });
  if (!collection.products.length) return notFound();

  return (
    <div>
      <h2 className="text-5xl font-light tex capitalize text-center">
        {collectionName}
      </h2>

      <ProductList products={collection.products} />
    </div>
  );
}
