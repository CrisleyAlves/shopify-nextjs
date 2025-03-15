import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPage } from "@/lib/shopify/api/page";

import PageContainer from "@/ui/page/PageContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const pageDetails = await getPage(page);

  if (!page) return notFound();

  return {
    title: pageDetails.seo?.title || pageDetails.title,
    description: pageDetails.seo?.description || pageDetails.bodySummary,
    openGraph: {
      publishedTime: pageDetails.createdAt,
      modifiedTime: pageDetails.updatedAt,
      type: "article",
    },
  };
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ page: string }>;
}>) {
  const { page } = await params;
  const pageDetails = await getPage(page);

  if (!page) return notFound();

  return <PageContainer pageDetails={pageDetails} />;
}
