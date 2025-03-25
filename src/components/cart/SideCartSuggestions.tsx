import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/shopify/product/types";

export default function SideCartSuggestions({
  products,
  onClickAddToCart,
}: {
  products: Product[];
  onClickAddToCart: (product: Product) => void;
}) {
  return (
    <>
      <h3 className="mt-5 mb-2 font-semibold">Trending Items:</h3>
      <div className="grid grid-cols-4 gap-5">
        {products.map((product) => (
          <div className="flex flex-col" key={product.id}>
            <Link href={`/product/${product.handle}`}>
              <Image
                priority={true}
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || "Product Image"}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full object-fill rounded-sm mr-3 mb-2"
              />
            </Link>

            <p className="text-sm font-light text-black truncate block capitalize">
              {product.title}
            </p>
            <p className="font-extralight text-sm mb-1">
              {product.priceRange.minVariantPrice.amount}
              <span className="ml-1">
                {product.priceRange.minVariantPrice.currencyCode}
              </span>
            </p>

            <button
              type="button"
              onClick={() => onClickAddToCart(product)}
              className=" text-sm
            w-full uppercase text-indigo-950 bg-white border border-gray-300
            disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-50 disabled:hover:text-white
          "
              aria-label="Add to cart"
            >
              add
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
