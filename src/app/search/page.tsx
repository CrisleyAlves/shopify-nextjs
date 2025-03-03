import { DEFAULT_SORT, sorting } from "@/lib/shopify/constants";
import CollectionSection from "@/ui/CollectionSection";
import { ProductList } from "@/ui/ProductCard";
import SortSelect from "@/ui/SortSelect";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<any> {
  return Promise.resolve({});
  // const { page } = await params;
  // const pageDetails = await getPage(page);

  // if (!page) return notFound();

  // return {
  //   title: pageDetails.seo?.title || pageDetails.title,
  //   description: pageDetails.seo?.description || pageDetails.bodySummary,
  //   openGraph: {
  //     publishedTime: pageDetails.createdAt,
  //     modifiedTime: pageDetails.updatedAt,
  //     type: "article",
  //   },
  // };
}

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  return (
    <div className="container pt-5 pb-5">
      <div className="grid md:grid-cols-5">
        <CollectionSection />

        <div className="col-span-4 ml-5">
          <div className="mb-[-20px] flex justify-between items-center">
            <p className="text-sm">
              showing <span className="font-bold text-blue-950">4</span> results
            </p>
            <SortSelect />
          </div>
          <ProductList />
        </div>
      </div>
    </div>
  );
}
