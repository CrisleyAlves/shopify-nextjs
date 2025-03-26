"use client";
import {
  createContext,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from "react";

import type { Cart, CartItem } from "@/lib/shopify/cart/types";
import type { ProductVariant } from "@/lib/shopify/product/types";

import { MESSAGES, NOTIFICATION_TYPES } from "@/constants";
import { addItemToCart, updateItemQuantity } from "@/services/cart-service";

import { useUI } from "./UIContext";

type CartContextType = {
  cart: Cart | undefined;
  updateShopifyCart: (payload: any) => void;
  addToCart: (selectedVariant: ProductVariant) => void;
  increaseItemQuantity: (item: CartItem) => void;
  decreaseItemQuantity: (item: CartItem) => void;
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
}): ReactElement {
  const [cart, setCart] = useState<Cart | undefined>(shopifyCart);
  const { setShowLoader, handleNotification } = useUI();

  const updateShopifyCart = (payload: Cart) => setCart(payload);

  const addToCart = async (selectedVariant: ProductVariant) => {
    try {
      setShowLoader(true);
      const shopifyCart = await addItemToCart(selectedVariant.id);

      if (shopifyCart instanceof Error) {
        throw shopifyCart;
      }

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

  const increaseItemQuantity = async (item: CartItem) => {
    try {
      setShowLoader(true);
      const shopifyCart = await updateItemQuantity({
        merchandiseId: item.merchandise.id,
        quantity: item.quantity + 1,
      });

      if (shopifyCart instanceof Error) {
        throw shopifyCart;
      }

      updateShopifyCart(shopifyCart);

      handleNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        message: MESSAGES.SUCCESS.INCREASE_QUANTITY,
        visible: true,
      });
    } catch (error) {
      handleNotification({
        type: NOTIFICATION_TYPES.ERROR,
        message: MESSAGES.ERROR.INCREASE_QUANTITY,
        visible: true,
      });
      console.error("Error increasing item quantity");
      console.error(error);
    } finally {
      setShowLoader(false);
    }
  };

  const decreaseItemQuantity = async (item: CartItem) => {
    try {
      setShowLoader(true);
      const shopifyCart = await updateItemQuantity({
        merchandiseId: item.merchandise.id,
        quantity: item.quantity - 1,
      });

      if (shopifyCart instanceof Error) {
        throw shopifyCart;
      }

      updateShopifyCart(shopifyCart);

      const decreaseMessage =
        item.quantity === 1
          ? MESSAGES.SUCCESS.ITEM_REMOVED_FROM_CART
          : MESSAGES.SUCCESS.DECREASE_QUANTITY;
      handleNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        message: decreaseMessage,
        visible: true,
      });
    } catch (error) {
      handleNotification({
        type: NOTIFICATION_TYPES.ERROR,
        message: MESSAGES.ERROR.DECREASE_QUANTITY,
        visible: true,
      });
      console.error("Error decreasing item quantity");
      console.error(error);
    } finally {
      setShowLoader(false);
    }
  };

  const value = useMemo(
    () => ({
      cart,
      updateShopifyCart,
      increaseItemQuantity,
      decreaseItemQuantity,
      addToCart,
      isEmpty: (cart?.lines?.length || 0) === 0,
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
