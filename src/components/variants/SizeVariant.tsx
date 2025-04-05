"use client";
import clsx from "clsx";

import type { ProductVariantType } from "@/lib/shopify/types/";

import { PRODUCT_VARIANT_TYPE } from "@/lib/shopify/constants";

export default function SizeVariant({
  sizeVariants,
  onSelectVariantAction,
  selectedVariant,
}: {
  sizeVariants: ProductVariantType[];
  onSelectVariantAction: (variant: ProductVariantType) => void;
  selectedVariant: ProductVariantType | undefined;
}) {
  return (
    <>
      {selectedVariant?.selectedOptions[0]?.value && (
        <p className="font-semibold">
          Size:{" "}
          <span className="font-light">
            {selectedVariant?.selectedOptions[0].value}
          </span>
        </p>
      )}
      <div className="grid grid-cols-5 gap-2 mt-2 mb-3">
        {sizeVariants.map((variant) => {
          return variant.selectedOptions
            .filter((item) => item.name === PRODUCT_VARIANT_TYPE.SIZE)
            .map((item) => {
              return (
                <button
                  onClick={() => onSelectVariantAction(variant)}
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
                  aria-label={`Select size ${item.value}`}
                >
                  {item.value}
                </button>
              );
            });
        })}
      </div>
    </>
  );
}
