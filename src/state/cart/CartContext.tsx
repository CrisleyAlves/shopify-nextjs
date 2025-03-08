"use client";
import {
  createContext,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from "react";
import { Cart } from "@/lib/shopify/cart/types";

type CartContextType = {
  cart: Cart | undefined;
  updateShopifyCart: (payload: any) => void;
  totalQuantity: number;
  isEmpty: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
  shopifyCart,
}: {
  children: React.ReactNode;
  shopifyCart: Cart | undefined;
}): ReactElement<any, any> {
  const [cart, setCart] = useState<Cart | undefined>(shopifyCart);

  const updateShopifyCart = (payload: Cart) => setCart(payload);

  const value = useMemo(
    () => ({
      cart,
      updateShopifyCart,
      isEmpty: !!cart?.lines?.length,
      totalQuantity: cart?.totalQuantity || 0,
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
