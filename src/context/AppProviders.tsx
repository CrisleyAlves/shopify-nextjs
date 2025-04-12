import type { CartType } from "@/lib/shopify/types/";

import { CartProvider } from "./CartContext";
import { UIProvider } from "./UIContext";
import { LoaderProvider } from "./LoaderContext";

export function AppProviders({
  children,
  shopifyCart,
}: {
  children: React.ReactNode;
  shopifyCart: CartType | undefined;
}) {
  return (
    <UIProvider>
      <LoaderProvider>
        <CartProvider shopifyCart={shopifyCart}>{children}</CartProvider>
      </LoaderProvider>
    </UIProvider>
  );
}
