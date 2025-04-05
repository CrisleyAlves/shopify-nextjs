import {
  ProductType,
  ProductVariantType,
  CartType,
} from "@/lib/shopify/types/";

/**
 * @description returns formatted product item for add_to_cart event following Analytic's required format
 * @returns Gtag.Item[]
 */
export function formatProductItemForAddToCartAnalyticsUsage({
  product,
  variant,
}: {
  product: ProductType;
  variant: ProductVariantType;
}): Gtag.Item[] {
  return [
    {
      item_id: variant.id,
      item_name: product.title,
      item_variant: variant.title,
      item_brand: product.brand?.value,
      currency: variant.price.currencyCode,
      price: Number(variant.price).toFixed(2),
      quantity: 1,
    },
  ];
}

/**
 * @description returns formatted product item following Analytic's required format
 * @returns Gtag.Item[]
 */
export function formatProductItemForAnalyticsUsage(
  product: ProductType
): Gtag.Item {
  return {
    item_id: product.id,
    item_name: product.title,
    item_brand: product.brand?.value,
    currency: product.priceRange.maxVariantPrice.currencyCode,
    price: Number(product.priceRange.maxVariantPrice.amount).toFixed(2),
    quantity: 1,
  };
}

/**
 * @description returns formatted cart item data following Analytic's required format
 * @returns Gtag.Item[]
 */
export function formatCartItemsForAnalyticsUsage(cart: CartType): Gtag.Item[] {
  const cartItems = cart.lines.map((item) => {
    return {
      item_id: item.merchandise.product.id,
      item_name: item.merchandise.product.title,
      item_variant: item.merchandise.selectedOptions[0].value,
      item_brand: item.merchandise.product.brand?.value,
      price: Number(
        item.merchandise.product.priceRange.maxVariantPrice.amount
      ).toFixed(2),
      currency: item.cost.totalAmount.currencyCode,
      quantity: item.quantity,
    };
  });
  return cartItems;
}
