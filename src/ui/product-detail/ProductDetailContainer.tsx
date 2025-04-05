"use client";
import { useEffect } from "react";

import type { ProductType, ProductVariantType } from "@/lib/shopify/types/";

import Analytics from "@/analytics";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import ProductList from "@/components/shared/ProductList";

import ProductDetailUI from "./ProductDetailUI";

export default function ProductDetailContainer({
  product,
  recommended,
}: {
  product: ProductType;
  recommended: ProductType[];
}) {
  const { addToCart } = useCart();
  const { setShowCart } = useUI();

  useEffect(() => {
    Analytics.trackViewedItem(product);
    setShowCart(false);
  }, [product.id]);

  const onClickAddToCart = async (selectedVariant: ProductVariantType) => {
    if (!selectedVariant) return;
    Analytics.trackAddToCart({ product, variant: selectedVariant });
    addToCart(selectedVariant);
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
