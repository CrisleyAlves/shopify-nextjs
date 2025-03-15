"use client";
import { Product, ProductVariant } from "@/lib/shopify/product/types";
import { useCart } from "@/state/cart/CartContext";
import { addItemToCart } from "@/state/cart/actions";

import ProductList from "../shared/ProductList";
import ProductDetailUI from "./ProductDetailUI";

export default function ProductDetailContainer({
  product,
  recommended,
}: {
  product: Product;
  recommended: Product[];
}) {
  const { updateShopifyCart } = useCart();

  /**
   * @todo add notification for success/error
   */
  const onClickAddToCart = async (selectedVariant: ProductVariant) => {
    if (!selectedVariant) return;

    try {
      const shopifyCart = await addItemToCart(selectedVariant.id);
      updateShopifyCart(shopifyCart);
    } catch (error) {
      console.error("Error adding item to cart");
      console.error(error);
    }
  };

  return (
    <>
      <ProductDetailUI product={product} onClickAddToCart={onClickAddToCart} />

      <ProductList
        title="Recommended for you"
        products={recommended.slice(0, 4)}
      />
    </>
  );
}
