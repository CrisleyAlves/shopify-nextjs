import { NextRequest, NextResponse } from "next/server";

import { ROUTES } from "@/lib/shopify/constants";
import { getCustomerAccessTokenFromCookies } from "@/services/customer-service";
import { getCartIdFromCookies } from "@/services/cart-service";
import { getCart } from "@/lib/shopify/api/cart";

async function isCartValidForCheckout(request: NextRequest) {
  const url = request.nextUrl;
  const protectedPaths = [ROUTES.CHECKOUT];
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

async function checkRedirectToAccount(request: NextRequest) {
  const accessToken = await getCustomerAccessTokenFromCookies();

  if (!accessToken) return false;

  const url = request.nextUrl;
  const protectedPaths = [ROUTES.ACCOUNT_LOGIN, ROUTES.ACCOUNT_CREATE];

  if (protectedPaths.includes(url.pathname) && accessToken) {
    return true;
  }

  return false;
}

export async function middleware(request: NextRequest) {
  const isCartValid = await isCartValidForCheckout(request);
  const shouldRedirectToAccount = await checkRedirectToAccount(request);

  if (!isCartValid) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  if (shouldRedirectToAccount) {
    return NextResponse.redirect(new URL(ROUTES.ACCOUNT_OVERVIEW, request.url));
  }

  return NextResponse.next();
}
