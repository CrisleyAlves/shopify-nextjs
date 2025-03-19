import Image from "next/image";
import { JSX } from "react";

import { Cart } from "@/lib/shopify/cart/types";

export default function CheckoutItems({ cart }: { cart: Cart }): JSX.Element {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cart?.lines.map((item) => {
        return (
          <li className="w-full" key={item.id}>
            <Image
              priority={true}
              src={item.merchandise.product.featuredImage.url}
              alt={item.merchandise.product.featuredImage.altText}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full md:w-full object-fill rounded-sm mr-3"
            />
            <div className="flex flex-col">
              <p className="text-sm font-normal text-black truncate block capitalize mb-1 mt-2">
                {item.merchandise.product.title}
              </p>
              <p className="font-extralight text-sm mb-1">
                {item.merchandise.product.brand.value}
              </p>
              <p className="font-extralight text-sm mb-1">
                {item.merchandise.selectedOptions[0].name}:{" "}
                {item.merchandise.selectedOptions[0].value}
              </p>
              <p className="font-extralight text-sm mb-1">
                quantity: {item.quantity}
              </p>
              <p className="text-sm font-light text-black cursor-auto">
                {item.merchandise.product.priceRange.maxVariantPrice.amount}{" "}
                <span className="text-sm font-light">
                  {
                    item.merchandise.product.priceRange.maxVariantPrice
                      .currencyCode
                  }
                </span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
