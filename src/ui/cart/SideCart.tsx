"use client";

import clsx from "clsx";
import { MouseEventHandler, useEffect } from "react";

import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { CartItem as CartItemType } from "@/lib/shopify/cart/types";
import {
  createCartAndSetCookie,
  updateItemQuantity,
} from "@/services/cart-service";

import CartItemUI from "./CartItemUI";

export default function SideCart({
  showCart = false,
  onClickCloseIcon,
}: {
  showCart: boolean;
  onClickCloseIcon: MouseEventHandler<HTMLButtonElement>;
}) {
  const { cart, isEmpty, updateShopifyCart } = useCart();
  const { setShowLoader } = useUI();

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  /**
   * @todo try/catch Crisley, try/catch
   *
   */
  const onClickIncreaseItem = async (item: CartItemType) => {
    setShowLoader(true);
    const shopifyCart = await updateItemQuantity({
      merchandiseId: item.merchandise.id,
      quantity: item.quantity + 1,
    });

    updateShopifyCart(shopifyCart);
    setShowLoader(false);
  };

  /**
   * @todo try/catch Crisley, try/catch
   *
   */
  const onClickDecreaseItem = async (item: CartItemType) => {
    setShowLoader(true);
    const shopifyCart = await updateItemQuantity({
      merchandiseId: item.merchandise.id,
      quantity: item.quantity + -1,
    });

    updateShopifyCart(shopifyCart);
    setShowLoader(false);
  };

  const totalText = `Total: (${cart?.totalQuantity}) Item(s)`;

  return (
    <div
      className={clsx(
        `fixed top-0 right-0 w-full h-full md:bg-black/70 shadow-xl z-50 transition-transform duration-300 ease-in-out`,
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
          <button className="absolute right-5 top-5" onClick={onClickCloseIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </h2>

        <div className="p-5 flex flex-col justify-between h-[95%]">
          <div
            className="
          min-h-[55vh] max-h-[55vh] overflow-y-auto shadow-sm
          md:min-h-[65vh] md:max-h-[65vh]
          "
          >
            {!isEmpty && (
              <p className="text-center font-light">Cart is empty</p>
            )}

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
          </div>
          {isEmpty && (
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
              <button className="w-full bg-indigo-950 text-white p-3">
                CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
