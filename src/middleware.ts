import { NextRequest, NextResponse } from "next/server";

import { getCartIdFromCookies } from "@/services/cart-service";
import { getCart } from "@/lib/shopify/api/cart";

async function isCartValidForCheckout(request: NextRequest) {
  const url = request.nextUrl;
  const protectedPaths = ["/checkout"];
  const cartId = await getCartIdFromCookies();
  const cart = await getCart(cartId);

  if (
    cart &&
    cart?.lines.length === 0 &&
    protectedPaths.includes(url.pathname)
  ) {
    return false;
  }

  return true;
}

export async function middleware(request: NextRequest) {
  const isCartValid = await isCartValidForCheckout(request);

  if (!isCartValid) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
