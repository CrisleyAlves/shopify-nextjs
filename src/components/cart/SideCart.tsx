"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { CartItemType } from "@/lib/shopify/cart/types";
import type {
  ProductType,
  ProductVariantType,
} from "@/lib/shopify/product/types";

const AddToCartModal = dynamic(
  () => import("@/components/modals/AddToCartModal"),
  {
    ssr: false,
  }
);

import Analytics from "@/analytics";
import { ROUTES } from "@/lib/shopify/constants";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { createCartAndSetCookie } from "@/services/cart-service";
import Icon from "@/components/shared/Icon";

import CartItemUI from "./CartItemUI";
import SideCartSuggestions from "./SideCartSuggestions";

export default function SideCart({
  showCart = false,
  onClickCloseIcon,
  products = [],
}: {
  showCart: boolean;
  onClickCloseIcon: MouseEventHandler<HTMLButtonElement>;
  products: ProductType[];
}) {
  const router = useRouter();
  const {
    cart,
    isEmpty,
    updateShopifyCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    addToCart,
  } = useCart();
  const { setShowLoader, setShowCart } = useUI();
  const [selectedProduct, setSelectedProduct] = useState<
    undefined | ProductType
  >(undefined);

  const handleOnClickAddToCart = useCallback(
    (productVariant: ProductVariantType) => {
      if (!selectedProduct?.id) return;

      Analytics.trackAddToCart({
        product: selectedProduct,
        variant: productVariant,
      });

      addToCart(productVariant);
      setSelectedProduct(undefined);
    },
    [addToCart, setSelectedProduct, selectedProduct]
  );

  useEffect(() => {
    return () => {
      setShowCart(false);
      setShowLoader(false);
    };
  }, []);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  const onClickIncreaseItem = useCallback(
    async (item: CartItemType) => {
      increaseItemQuantity(item);
      Analytics.trackIncreaseCartQuantity(item);
    },
    [setShowLoader, updateShopifyCart]
  );

  const onClickDecreaseItem = useCallback(
    async (item: CartItemType) => {
      decreaseItemQuantity(item);
      Analytics.trackDecreaseCartQuantity(item);
    },
    [setShowLoader, updateShopifyCart]
  );

  const onClickCheckout = useCallback(() => {
    setShowLoader(true);
    setTimeout(() => {
      router.push(ROUTES.CHECKOUT);
    }, 2000);
  }, [router]);

  const totalText = `Total: (${cart?.totalQuantity}) Item(s)`;

  return (
    <div
      className={clsx(
        `fixed top-0 right-0 w-full h-full md:bg-black/70 shadow-xl z-30 transition-transform duration-300 ease-in-out`,
        {
          "translate-x-[100%] duration-500 ease-in-out": !showCart,
          "translate-x-0": showCart,
        }
      )}
    >
      <div
        className={clsx(
          `w-full ease-in-out fixed bg-white shadow-2xl bottom-[-100%]  text-black
          transition duration-100 h-[100%]
          md:w-[25%]`,
          {
            "top-0 bottom-0 transition duration-100 md:right-0 md:w-[400px]":
              showCart,
          }
        )}
      >
        <h2 className="text-center text-base font-bold border border-b-gray-200 pb-5 pt-5 relative">
          Cart
          <button
            aria-label="Close SideCart"
            className="absolute right-5 top-5"
            onClick={onClickCloseIcon}
          >
            <Icon path="/icons/close.svg" altText="Close Side Cart" />
          </button>
        </h2>

        {selectedProduct && (
          <AddToCartModal
            product={selectedProduct}
            onClickAddToCartAction={handleOnClickAddToCart}
            onClickCloseModalAction={() => setSelectedProduct(undefined)}
          />
        )}

        <div className="p-5 flex flex-col justify-between h-[95%]">
          <div
            className="
          min-h-[55vh] max-h-[55vh] overflow-y-auto shadow-sm
          md:min-h-[65vh] md:max-h-[65vh]
          "
          >
            {isEmpty && <p className="text-center font-light">Cart is empty</p>}

            {cart?.lines.map((cart) => (
              <div key={cart.id} className="mb-5">
                <CartItemUI
                  key={cart.id}
                  item={cart}
                  onClickDecreaseItemAction={onClickDecreaseItem}
                  onClickIncreaseItemAction={onClickIncreaseItem}
                />
              </div>
            ))}
            <SideCartSuggestions
              onClickAddToCart={(product) => setSelectedProduct(product)}
              products={products.slice(0, 8)}
            />
          </div>

          <div className="w-full right-0 p-5 fixed bottom-0 md:relative">
            <div className="flex justify-between">
              <span className="text-right font-semibold">{totalText}</span>
              <span className="text-right text-green-700 font-semibold">
                {cart?.cost.totalAmount.amount}{" "}
                {cart?.cost.totalAmount.currencyCode}
              </span>
            </div>
            <p className="mb-3 font-thin text-right">free shipping</p>
            <div className="flex justify-between flex-row"></div>
            <button
              disabled={isEmpty}
              aria-label="Checkout"
              onClick={onClickCheckout}
              className="
                  w-full bg-indigo-950
                hover:text-indigo-950 hover:bg-white border border-indigo-950 text-white p-3
                disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-transparent"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
