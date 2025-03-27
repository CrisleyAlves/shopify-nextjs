import Image from "next/image";
import Link from "next/link";

import type { CartItem as CartItemType } from "@/lib/shopify/cart/types";

import Icon from "@/components/shared/Icon";

export default function CartItem({
  item,
  onClickIncreaseItemAction,
  onClickDecreaseItemAction,
}: {
  item: CartItemType;
  onClickIncreaseItemAction: (item: CartItemType) => void;
  onClickDecreaseItemAction: (item: CartItemType) => void;
}) {
  return (
    <div
      className="
        grid grid-cols-4 items-center max-h-[100px] min-h-[80px] overflow-hidden
        shadow-md
        "
    >
      <div className="col-span-3 w-full flex">
        <Link href={`/product/${item.merchandise.product.handle}`}>
          <Image
            priority={true}
            src={item.merchandise.product.featuredImage.url}
            alt={item.merchandise.product.featuredImage.altText}
            width={0}
            height={0}
            sizes="100vw"
            className="
                  w-20 h-auto object-fill rounded-sm mr-3
                  md:w-40 md:h-40"
          />
        </Link>
        <div className="flex flex-col">
          <p className="text-sm font-light text-black truncate block capitalize">
            {item.merchandise.product.title}
          </p>
          <p className="font-extralight text-sm">
            {item.merchandise.product.brand.value}
          </p>
          <p className="font-extralight text-sm">
            {item.merchandise.selectedOptions[0].name}:{" "}
            {item.merchandise.selectedOptions[0].value}
          </p>
          <p className="text-sm font-light text-black cursor-auto my-3">
            {item.merchandise.product.priceRange.maxVariantPrice.amount}{" "}
            <span className="text-sm font-light">
              {item.merchandise.product.priceRange.maxVariantPrice.currencyCode}
            </span>
          </p>
        </div>
      </div>
      <div
        className="
          flex flex-row items-center justify-center  h-full md:items-start md:pt-10"
      >
        <button onClick={() => onClickDecreaseItemAction(item)}>
          <Icon path="/icons/minus.svg" altText="decrease quantity" />
        </button>

        <span className="ml-2 mr-2">{item.quantity}</span>
        <button onClick={() => onClickIncreaseItemAction(item)}>
          <Icon path="/icons/plus.svg" altText="increase quantity" />
        </button>
      </div>
    </div>
  );
}
