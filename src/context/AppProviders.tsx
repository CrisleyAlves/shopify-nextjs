import type { Cart } from "@/lib/shopify/cart/types";

import { CartProvider } from "./CartContext";
import { UIProvider } from "./UIContext";

export function AppProviders({
  children,
  shopifyCart,
}: {
  children: React.ReactNode;
  shopifyCart: Cart | undefined;
}) {
  return (
    <UIProvider>
      <CartProvider shopifyCart={shopifyCart}>{children}</CartProvider>
    </UIProvider>
  );
}
