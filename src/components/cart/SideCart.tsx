"use client";

import clsx from "clsx";
import { MouseEventHandler, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { MESSAGES, NOTIFICATION_TYPES } from "@/constants";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { CartItem as CartItemType } from "@/lib/shopify/cart/types";
import {
  createCartAndSetCookie,
  updateItemQuantity,
} from "@/services/cart-service";

import CartItemUI from "./CartItemUI";
import { ROUTES } from "@/lib/shopify/constants";

export default function SideCart({
  showCart = false,
  onClickCloseIcon,
}: {
  showCart: boolean;
  onClickCloseIcon: MouseEventHandler<HTMLButtonElement>;
}) {
  const router = useRouter();
  const { cart, isEmpty, updateShopifyCart } = useCart();
  const { setShowLoader, handleNotification, setShowCart } = useUI();

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
      try {
        setShowLoader(true);
        const shopifyCart = await updateItemQuantity({
          merchandiseId: item.merchandise.id,
          quantity: item.quantity + 1,
        });

        updateShopifyCart(shopifyCart);
        handleNotification({
          type: NOTIFICATION_TYPES.SUCCESS,
          message: MESSAGES.SUCCESS.INCREASE_QUANTITY,
          visible: true,
        });
      } catch (error) {
        handleNotification({
          type: NOTIFICATION_TYPES.ERROR,
          message: MESSAGES.ERROR.INCREASE_QUANTITY,
          visible: true,
        });
        console.error("Error increasing item quantity");
        console.error(error);
      } finally {
        setShowLoader(false);
      }
    },
    [setShowLoader, updateShopifyCart, handleNotification]
  );

  const onClickDecreaseItem = useCallback(
    async (item: CartItemType) => {
      try {
        setShowLoader(true);
        const shopifyCart = await updateItemQuantity({
          merchandiseId: item.merchandise.id,
          quantity: item.quantity - 1,
        });

        updateShopifyCart(shopifyCart);

        const decreaseMessage =
          item.quantity === 1
            ? MESSAGES.SUCCESS.ITEM_REMOVED_FROM_CART
            : MESSAGES.SUCCESS.DECREASE_QUANTITY;
        handleNotification({
          type: NOTIFICATION_TYPES.SUCCESS,
          message: decreaseMessage,
          visible: true,
        });
      } catch (error) {
        handleNotification({
          type: NOTIFICATION_TYPES.ERROR,
          message: MESSAGES.ERROR.DECREASE_QUANTITY,
          visible: true,
        });
        console.error("Error decreasing item quantity");
        console.error(error);
      } finally {
        setShowLoader(false);
      }
    },
    [setShowLoader, updateShopifyCart, handleNotification]
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-6"
              aria-hidden="true"
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
          </div>
          {!isEmpty && (
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
                aria-label="Checkout"
                onClick={onClickCheckout}
                className="w-full bg-indigo-950 hover:text-indigo-950 hover:bg-white border border-indigo-950 text-white p-3"
              >
                CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
