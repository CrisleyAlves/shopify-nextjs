import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SORT_KEYS } from "@/lib/shopify/constants";
import { getCollectionProducts } from "@/lib/shopify/api/collection";

import CollectionsContainer from "@/ui/collections/CollectionsContainer";

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
    <CollectionsContainer
      collectionName={collectionName}
      products={collection.products}
    />
  );
}
