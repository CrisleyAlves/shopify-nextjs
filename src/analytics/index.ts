import type {
  ProductType,
  ProductVariantType,
  CartType,
  CartItemType,
} from "@/lib/shopify/types/";

import { getRandomOrderId } from "@/ui/utils";
import {
  formatCartItemsForAnalyticsUsage,
  formatProductItemForAddToCartAnalyticsUsage,
  formatProductItemForAnalyticsUsage,
} from "@/analytics/utils";

const ANALYTICS_DEBUG_MODE = false;

/**
 * ## FOR HISTORY PURPOSES ##
 *
 * @description window.gtag may not be available in case analytics is not enabled
 * in development, this is why optional chaining is used in this file, so I don't need to add validation
 * for each function checking the environment.
 */

/**
 * @description This is to notify Analytics when user clicks on a product to see product details --
 * i.e product-detail page or addToCartModal
 *
 * FYI -> This is important to track analytics purchase journey
 */
const trackViewedItem = (product: ProductType) => {
  window.gtag?.("event", "view_item", {
    currency: product.priceRange.maxVariantPrice.currencyCode,
    value: Number(product.priceRange.maxVariantPrice.amount),
    items: formatProductItemForAnalyticsUsage(product),
    debug_mode: ANALYTICS_DEBUG_MODE,
  });
};

/**
 * @description Notify Analytics once user adds a product to the cart
 *
 */
const trackAddToCart = ({
  product,
  variant,
}: {
  product: ProductType;
  variant: ProductVariantType;
}) => {
  window.gtag?.("event", "add_to_cart", {
    currency: product.priceRange.maxVariantPrice.currencyCode,
    value: Number(product.priceRange.maxVariantPrice.amount),
    items: formatProductItemForAddToCartAnalyticsUsage({ product, variant }),
    debug_mode: ANALYTICS_DEBUG_MODE,
  });
};

/**
 * @description Notify Analytics if user increases cart item quantity
 *
 */
const trackIncreaseCartQuantity = (cartItem: CartItemType) => {
  window.gtag?.("event", "cart_quantity_increased", {
    event_category: "cart",
    event_label: "cart_quantity_increase",
    value:
      Number(cartItem.merchandise.product.priceRange.maxVariantPrice.amount) *
      2,
    debug_mode: ANALYTICS_DEBUG_MODE,
  });
};

/**
 * @description Notify Analytics if user decreases cart item quantity
 *
 */
const trackDecreaseCartQuantity = (cartItem: CartItemType) => {
  window.gtag?.("event", "cart_quantity_decreased", {
    event_category: "cart",
    event_label: "cart_quantity_decrease",
    price:
      Number(cartItem.merchandise.product.priceRange.maxVariantPrice.amount) *
      (cartItem.quantity - 1),
    debug_mode: ANALYTICS_DEBUG_MODE,
  });
};

/**
 * @description Notify Analytics when user creates an order
 *
 */
const trackPurchase = (cart: CartType) => {
  const cartItems = formatCartItemsForAnalyticsUsage(cart);

  window.gtag?.("event", "purchase", {
    transaction_id: getRandomOrderId(),
    affiliation: "Beyond",
    currency: cart.cost.totalAmount.currencyCode,
    value: Number(cart.cost.totalAmount.amount),
    tax: Number(cart.cost.totalTaxAmount.amount),
    shipping: Number(cart.cost.totalTaxAmount.amount),
    items: cartItems,
    debug_mode: ANALYTICS_DEBUG_MODE,
  });
};

/**
 * @description Notify Analytics once user starts checkout flow
 *
 */
const trackBeginCheckout = (cart: CartType) => {
  const cartItems = formatCartItemsForAnalyticsUsage(cart);

  window.gtag?.("event", "begin_checkout", {
    currency: cart.cost.totalAmount.currencyCode,
    value: Number(cart.cost.totalAmount.amount),
    items: cartItems,
    debug_mode: ANALYTICS_DEBUG_MODE,
  });
};

/**
 * @description Notify Analytics once user adds shipping info
 *
 */
const trackAddShippingInfo = (cart: CartType) => {
  const cartItems = formatCartItemsForAnalyticsUsage(cart);

  window.gtag?.("event", "add_shipping_info", {
    currency: cart.cost.totalTaxAmount.currencyCode,
    value: Number(cart.cost.totalTaxAmount.amount),
    items: cartItems,
    debug_mode: ANALYTICS_DEBUG_MODE,
  });
};

/**
 * @description Notify Analytics once user adds a payment method
 *
 */
const trackAddPaymentInfo = (cart: CartType) => {
  const cartItems = formatCartItemsForAnalyticsUsage(cart);

  window.gtag?.("event", "add_payment_info", {
    currency: cart.cost.totalAmount.currencyCode,
    value: Number(cart.cost.totalAmount.amount),
    payment_type: "Credit Card",
    items: cartItems,
    debug_mode: ANALYTICS_DEBUG_MODE,
  });
};

/**
 * @description notify Analytics once a refund is executed, so they can apply Math for E-Commerce tracking features
 *
 * FYI -> used locally to confirm refund behavior in Analytics. Yeah, it worked. Keeping it here as a reference
 */
const trackUserRefund = () => {
  window.gtag?.("event", "refund", {
    currency: "USD",
    transaction_id: 174,
    value: 200,
  });
};

const Analytics = {
  trackViewedItem,
  trackAddToCart,
  trackIncreaseCartQuantity,
  trackDecreaseCartQuantity,
  trackPurchase,
  trackBeginCheckout,
  trackAddShippingInfo,
  trackAddPaymentInfo,
  trackUserRefund,
};

export default Analytics;
