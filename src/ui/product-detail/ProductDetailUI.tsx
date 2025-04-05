"use client";
import { useState, useCallback, useMemo } from "react";

import type { ProductType, ProductVariantType } from "@/lib/shopify/types/";

import Prose from "@/components/shared/Prose";
import GuaranteeStatement from "@/components/shared/GuaranteeStatement";
import SizeVariant from "@/components/variants/SizeVariant";
import Icon from "@/components/shared/Icon";

import ProductGallery from "./ProductGallery";

export default function ProductDetail({
  product,
  onClickAddToCartAction,
}: {
  product: ProductType;
  onClickAddToCartAction: (selectedVariant: ProductVariantType) => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariantType | undefined
  >(undefined);

  const handleOnClickAddToCart = useCallback(() => {
    if (!selectedVariant) return;

    onClickAddToCartAction(selectedVariant);
    setSelectedVariant(undefined);
  }, [selectedVariant, onClickAddToCartAction]);

  /**
   * @todo check docs to see if shopify provides this "service"
   */
  const fakeDiscount = useMemo(
    () => Number(product.priceRange.maxVariantPrice.amount) * 2.0,
    [product.priceRange.maxVariantPrice.amount]
  );

  return (
    <div
      className="
        grid grid-cols-1
        md:gap-x-10 md:mb-10 md:mt-5
        xl:grid-cols-2
        xl:gap-x-10
      "
    >
      <section className="md:mb-3">
        <ProductGallery
          featuredImage={product.featuredImage}
          images={product.images}
        />
      </section>
      <section className="w-full">
        <div className="mt-5 md:mt-0 flex justify-between items-center">
          <h2 className="font-light md:text-2xl">{product.title}</h2>
          <p className="text-right text-green-700 font-light">
            <span className="line-through text-red-400 mr-1">
              {fakeDiscount} {product.priceRange.maxVariantPrice.currencyCode}
            </span>{" "}
            {product.priceRange.maxVariantPrice.amount}{" "}
            <span className="text-sm font-light">
              {product.priceRange.maxVariantPrice.currencyCode}
            </span>
          </p>
        </div>
        <p className="font-light">
          Sent From:{" "}
          <span className="font-extralight">Brazil, South America</span>
        </p>
        <SizeVariant
          onSelectVariantAction={setSelectedVariant}
          sizeVariants={product.variants}
          selectedVariant={selectedVariant}
        />

        <button
          disabled={!selectedVariant}
          type="button"
          onClick={handleOnClickAddToCart}
          className="
            w-full bg-indigo-950 text-white p-3 uppercase hover:text-indigo-950 hover:bg-white border border-indigo-950
            disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-50 disabled:hover:text-white
          "
          aria-label="Add to cart"
        >
          add to cart
        </button>
        <p className="font-thin text-center mt-3">
          Free Shipping + Free Returns for 7 Days
        </p>

        <ul className="mt-5 bg-gray-50/15">
          <li className="relative mb-5">
            <input
              type="checkbox"
              id="description"
              name="description"
              className="peer/description hidden w-full"
            />
            <label
              htmlFor="description"
              className="flex items-center cursor-pointer flex-row justify-between mb-4 z-10"
            >
              <h3 className="font-normal text-md">Description</h3>
              <span className="">
                <Icon
                  path="/icons/plus.svg"
                  altText="toggle product description"
                />
              </span>
            </label>
            <div
              className="
                peer-checked/description:max-h-full peer-checked/description:opacity-100 peer-checked/description:translate-y-0 max-h-0 opacity-0 -translate-y-2 overflow-hidden transition-all duration-500 ease-in-out
              "
            >
              <Prose html={product.descriptionHtml} />
            </div>
          </li>
        </ul>

        <GuaranteeStatement />
      </section>
    </div>
  );
}
