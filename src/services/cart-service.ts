"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { TAGS } from "@/lib/shopify/constants";
import { Cart } from "@/lib/shopify/cart/types";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "@/lib/shopify/api/cart";

export async function getCartIdFromCookies(): Promise<string | undefined> {
  const cookie = await cookies();
  const cartId = cookie.get("cartId")?.value;
  return cartId;
}

export async function addItemToCart(
  selectedVariantId: string
): Promise<Cart | Error> {
  const cartId = await getCartIdFromCookies();

  if (!cartId || !selectedVariantId) {
    return new Error("Missing cartId or selectedVariantId");
  }

  try {
    const response = await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    revalidateTag(TAGS.cart);
    return response;
  } catch (error) {
    return new Error("Error adding item to cart");
  }
}

export async function updateItemQuantity(payload: {
  merchandiseId: string;
  quantity: number;
}): Promise<Cart | Error> {
  const cartId = await getCartIdFromCookies();
  if (!cartId) {
    return new Error("Missing cart ID");
  }

  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart(cartId);
    if (!cart) {
      return new Error("Missing cart ID");
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    const isExistentItem = lineItem && lineItem.id;
    const shouldRemoveFromCart = isExistentItem && quantity === 0;

    if (shouldRemoveFromCart)
      return await removeFromCart(cartId, [lineItem.id]);
    if (isExistentItem)
      return await updateCart(cartId, [
        {
          id: lineItem.id,
          merchandiseId,
          quantity,
        },
      ]);

    const shopifyCart = await addToCart(cartId, [{ merchandiseId, quantity }]);
    revalidateTag(TAGS.cart);
    return shopifyCart;
  } catch (error) {
    console.error(error);
    return new Error("Error updating item quantity");
  }
}

/**
 * @todo rework on redirectToCheckout later, need to confirm behavior
 *
 */
export async function redirectToCheckout() {
  const cartId = await getCartIdFromCookies();

  if (!cartId) {
    return "Missing cart ID";
  }

  const cart = await getCart(cartId);

  if (!cart) {
    return "Error fetching cart";
  }

  redirect(cart.checkoutUrl);
}

export async function createCartAndSetCookie(): Promise<Cart> {
  const cart = await createCart();
  const cookie = await cookies();
  cookie.set("cartId", cart.id!);
  return cart;
}
