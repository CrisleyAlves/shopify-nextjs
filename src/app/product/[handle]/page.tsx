import { notFound } from "next/navigation";

import {
  getProduct,
  getProductRecommendations,
} from "@/lib/shopify/api/product";

import ProductDetailContainer from "@/ui/product-detail/ProductDetailContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<any> {
  const product = await getProduct((await params).handle);
  if (!product) return notFound();
  const { url, width, height, altText: alt } = product.featuredImage || {};

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ handle: string }>;
}>) {
  const product = await getProduct((await params).handle);
  if (!product) return notFound();

  const recommended = await getProductRecommendations(product.id);
  return <ProductDetailContainer product={product} recommended={recommended} />;
}
