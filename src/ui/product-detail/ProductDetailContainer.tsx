"use client";
import { useEffect } from "react";

import { MESSAGES, NOTIFICATION_TYPES } from "@/constants";
import { Product, ProductVariant } from "@/lib/shopify/product/types";
import { addItemToCart } from "@/services/cart-service";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";

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
  const { setShowCart, setShowLoader, handleNotification } = useUI();

  useEffect(() => {
    setShowCart(false);
  }, []);

  /**
   * @todo add notification for success/error
   */
  const onClickAddToCart = async (selectedVariant: ProductVariant) => {
    if (!selectedVariant) return;

    try {
      setShowLoader(true);
      const shopifyCart = await addItemToCart(selectedVariant.id);
      updateShopifyCart(shopifyCart);
      handleNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        message: MESSAGES.SUCCESS.ADD_TO_CART,
        visible: true,
      });
    } catch (error) {
      handleNotification({
        type: NOTIFICATION_TYPES.ERROR,
        message: MESSAGES.ERROR.ADD_TO_CART,
        visible: true,
      });
      console.error("Error adding item to cart");
      console.error(error);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <>
      <ProductDetailUI
        product={product}
        onClickAddToCartAction={onClickAddToCart}
      />

      <ProductList
        title="Recommended for you"
        products={recommended.slice(0, 4)}
      />
    </>
  );
}
