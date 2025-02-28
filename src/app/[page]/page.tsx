import Prose from "@/components/prose";
import { getPage } from "@/lib/shopify/api/page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

  return (
    <div className="w-full p-5">
      <h1 className="mb-12 text-5xl font-bold text-black">
        {pageDetails.title}
      </h1>

      <Prose className="pb-10" html={pageDetails.body as string} />

      <p className="text-sm italic text-gray-800">
        {`This document was last updated on ${new Intl.DateTimeFormat(
          undefined,
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ).format(new Date(pageDetails.updatedAt))}.`}
      </p>
    </div>
  );
}
