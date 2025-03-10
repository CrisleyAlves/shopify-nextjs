import Image from "next/image";
import { CartItem as CartItemType } from "@/lib/shopify/cart/types";
import { updateItemQuantity } from "@/state/cart/actions";
import { useCart } from "@/state/cart/CartContext";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateShopifyCart } = useCart();

  const onClickIncreaseItem = async () => {
    const shopifyCart = await updateItemQuantity({
      merchandiseId: item.merchandise.id,
      quantity: item.quantity + 1,
    });

    updateShopifyCart(shopifyCart);
  };

  const onClickDecreaseItem = async () => {
    const shopifyCart = await updateItemQuantity({
      merchandiseId: item.merchandise.id,
      quantity: item.quantity + -1,
    });

    updateShopifyCart(shopifyCart);
  };

  return (
    <div
      className="
        grid grid-cols-4 items-center max-h-[100px] min-h-[80px] overflow-hidden
        shadow-md
        "
    >
      <div className="col-span-3 w-full flex">
        <Image
          priority
          src={item.merchandise.product.featuredImage.url}
          alt={item.merchandise.product.featuredImage.altText}
          width={0}
          height={0}
          sizes="100vw"
          className="
                  w-20 h-auto object-fill rounded-sm mr-3
                  md:w-40 md:h-40"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-black truncate block capitalize">
            {item.merchandise.product.title}
          </p>
          <p className="font-light text-sm">
            {item.merchandise.product.brand.value}
          </p>
          <p className="font-light text-sm">
            {item.merchandise.selectedOptions[0].name}:{" "}
            {item.merchandise.selectedOptions[0].value}
          </p>
          <p className="text-lg font-semibold text-black cursor-auto my-3">
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
        <button onClick={onClickDecreaseItem}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>

        <span className="ml-2 mr-2">{item.quantity}</span>
        <button onClick={onClickIncreaseItem}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.2"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
