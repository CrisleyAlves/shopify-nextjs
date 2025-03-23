import Image from "next/image";
import Link from "next/link";

import { Product } from "@/lib/shopify/product/types";

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
        md:grid-cols-3 md:gap-x-8
        lg:grid-cols-4"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
