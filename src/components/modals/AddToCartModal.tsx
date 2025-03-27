"use client";
import { useState } from "react";
import Image from "next/image";

import type { Product, ProductVariant } from "@/lib/shopify/product/types";

import SizeVariant from "@/components/variants/SizeVariant";
import Icon from "@/components/shared/Icon";

export default function AddToCartModal({
  product,
  onClickAddToCartAction,
  onClickCloseModalAction,
}: {
  product: Product;
  onClickAddToCartAction: (selectedVariant: ProductVariant) => void;
  onClickCloseModalAction: () => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(undefined);

  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black/80 flex justify-center items-center z-30">
      <div className="bg-white p-5 m-5 rounded-md w-full relative md:w-[500px]">
        <button
          type="button"
          aria-label="Close Add To Cart Modal"
          className="absolute right-5 top-5"
          onClick={onClickCloseModalAction}
        >
          <Icon path="/icons/close.svg" altText="Close Add To Cart Modal" />
        </button>
        <div className="flex flex-row border-b border-b-gray-200 pb-5">
          <Image
            priority={true}
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || "Product Image"}
            width={0}
            height={0}
            sizes="100vw"
            className="w-32 h-auto object-fill rounded-sm mr-3"
          />

          <div>
            <p className="font-extralight text-base">{product.brand.value}</p>
            <p className="text-base font-light text-black truncate block capitalize">
              {product.title}
            </p>
            <p className="font-extralight text-base">
              {product.priceRange.minVariantPrice.amount}
              <span className="ml-1">
                {product.priceRange.minVariantPrice.currencyCode}
              </span>
            </p>
          </div>
        </div>
        <div className="mt-2">
          <SizeVariant
            sizeVariants={product.variants}
            onSelectVariantAction={setSelectedVariant}
            selectedVariant={selectedVariant}
          />
        </div>
        <button
          disabled={!selectedVariant}
          type="button"
          onClick={() => {
            if (!selectedVariant) return;
            onClickAddToCartAction(selectedVariant);
          }}
          className="
            w-full bg-indigo-950 text-white p-3 uppercase hover:text-indigo-950 hover:bg-white border border-indigo-950
            disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-50 disabled:hover:text-white
          "
          aria-label="Add to cart"
        >
          add to cart
        </button>
      </div>
    </div>
  );
}
