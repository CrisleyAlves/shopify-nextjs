import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/shopify/product/types";

import Icon from "@/components/shared/Icon";

export default function ProductList({
  title,
  products,
}: {
  title?: string;
  products: Product[];
}) {
  return (
    <section>
      {title && <h2 className="text-3xl font-extralight">{title}</h2>}
      <section
        className="
        gap-y-6
        justify-items-center justify-center md:gap-y-16 gap-x-14 mt-10 mb-5 w-full grid grid-cols-1
        md:grid-cols-4 md:gap-x-8"
      >
        {!!products?.length &&
          products.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
      </section>
    </section>
  );
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div
      className="
        bg-white w-full
        shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl
      "
    >
      <Link
        className="
        flex flex-row h-40
        md:h-auto md:block
        "
        href={`/product/${product.handle}`}
      >
        <Image
          priority={true}
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          width={0}
          height={0}
          sizes="100vw"
          className="
          w-40 h-40 object-cover rounded-t-xl
          md:h-80 md:w-full"
        />
        <div
          className="
          px-4 py-3
          md:block
          lg:w-full
          "
        >
          <span className="text-black mr-3 uppercase text-xs font-extralight">
            {product.brand.value}
          </span>
          <p className="text-lg font-light text-black truncate block capitalize">
            {product.title}
          </p>
          <p className="font-extralight text-sm h-10 overflow-hidden md:h-auto">
            {product.description.substring(0, 20)}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-light text-black cursor-auto my-3">
              {product.priceRange.maxVariantPrice.amount}{" "}
              <span className="text-sm font-light">
                {product.priceRange.maxVariantPrice.currencyCode}
              </span>
            </p>
            <div className="ml-auto">
              <Icon
                path="/icons/shop.svg"
                altText="View Product Details"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
