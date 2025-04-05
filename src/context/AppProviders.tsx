import type { CartType } from "@/lib/shopify/types/";

import { CartProvider } from "./CartContext";
import { UIProvider } from "./UIContext";

export function AppProviders({
  children,
  shopifyCart,
}: {
  children: React.ReactNode;
  shopifyCart: CartType | undefined;
}) {
  return (
    <UIProvider>
      <CartProvider shopifyCart={shopifyCart}>{children}</CartProvider>
    </UIProvider>
  );
}
