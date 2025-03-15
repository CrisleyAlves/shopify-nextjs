"use client";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";

import { PRODUCT_VARIANT_TYPE } from "@/lib/shopify/constants";
import { Product, ProductVariant } from "@/lib/shopify/product/types";

import Prose from "@/components/prose";
import GuaranteeStatement from "@/ui/shared/GuaranteeStatement";

export const ProductDetail = ({
  product,
  onClickAddToCart,
}: {
  product: Product;
  onClickAddToCart: Function;
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();

  const handleOnClickAddToCart = () => {
    onClickAddToCart(selectedVariant);
    setSelectedVariant(undefined);
  };

  return (
    <div
      className="
          grid grid-cols-1
          md:grid-cols-2 md:gap-x-10 md:mb-10 md:mt-5
          lg:gap-x-20
        "
    >
      <section className="w-full h-[50vh] md:h-[600px]">
        <Image
          priority
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-full object-center rounded-t-xl"
        />
      </section>
      <section className="w-full">
        <div className="mt-5 md:mt-0 flex justify-between items-center">
          <h2 className="font-semibold md:text-2xl">{product.title}</h2>
          <span className="text-right text-green-700 font-semibold">
            <span className="line-through text-red-400">
              100.00 {product.priceRange.maxVariantPrice.currencyCode}
            </span>{" "}
            {product.priceRange.maxVariantPrice.amount}{" "}
            <span className="text-sm font-light">
              {product.priceRange.maxVariantPrice.currencyCode}
            </span>
          </span>
        </div>
        <p className="font-semibold mt-3 ">
          Sent From: <span className="font-light">Brazil, South America</span>
        </p>
        {selectedVariant?.selectedOptions[0]?.value && (
          <p className="font-semibold">
            Size:{" "}
            <span className="font-light">
              {selectedVariant?.selectedOptions[0].value}
            </span>
          </p>
        )}
        <div className="grid grid-cols-5 gap-2 mt-2 mb-3">
          {product.variants.map((variant) => {
            return variant.selectedOptions
              .filter((item) => item.name === PRODUCT_VARIANT_TYPE.SIZE)
              .map((item) => {
                return (
                  <button
                    onClick={() => setSelectedVariant(variant)}
                    key={item.value}
                    disabled={!variant.availableForSale}
                    className={clsx(
                      `p-1 aspect-square border border-gray-300 text-black font-light text-sm
                        md:py-0 md:px-0 md:h-10 md:w-full hover:bg-indigo-950 hover:text-white`,
                      {
                        "bg-indigo-950 text-white":
                          variant.id === selectedVariant?.id,
                        "disabled:bg-gray-100 disabled:cursor-not-allowed disabled:hover:text-black":
                          !variant.availableForSale,
                      }
                    )}
                  >
                    {item.value}
                  </button>
                );
              });
          })}
        </div>

        <button
          disabled={!selectedVariant}
          type="button"
          onClick={handleOnClickAddToCart}
          className="
            w-full  bg-indigo-950 text-white p-3 uppercase hover:text-indigo-950 hover:bg-white border border-indigo-950
            disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-50 disabled:hover:text-white"
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
              <h3 className="font-semibold text-md">Description</h3>
              <span className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
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
};

export default ProductDetail;
