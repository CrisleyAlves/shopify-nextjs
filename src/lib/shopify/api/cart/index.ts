import type {
  CartType,
  ShopifyAddToCartOperationType,
  ShopifyCartOperationType,
  ShopifyCreateCartOperationType,
  ShopifyRemoveFromCartOperationType,
  ShopifyUpdateCartOperationType,
} from "@/lib/shopify/cart/types";

import { shopifyFetch } from "../shopify-fetch";
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from "../../cart/mutations";
import { getCartQuery } from "../../cart/queries";
import { TAGS } from "../../constants";
import { reshapeCart } from "../utils";

export async function createCart(): Promise<CartType> {
  const res = await shopifyFetch<ShopifyCreateCartOperationType>({
    query: createCartMutation,
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function getCart(
  cartId: string | undefined
): Promise<CartType | undefined> {
  if (!cartId) return undefined;

  const res = await shopifyFetch<ShopifyCartOperationType>({
    cache: "no-cache",
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
  });

  // old carts becomes 'null' when you checkout
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<CartType> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperationType>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<CartType> {
  const res = await shopifyFetch<ShopifyUpdateCartOperationType>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<CartType> {
  const res = await shopifyFetch<ShopifyAddToCartOperationType>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-cache",
  });

  return reshapeCart(res.body.data.cartLinesAdd.cart);
}
