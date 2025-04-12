"use client";
import {
  createContext,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from "react";

import type {
  CartType,
  CartItemType,
  ProductVariantType,
} from "@/lib/shopify/types/";

import { MESSAGES, NOTIFICATION_TYPES } from "@/constants";
import {
  addItemToCartAction,
  updateItemQuantityAction,
} from "@/services/cart-service";

import { useUI } from "./UIContext";
import { useLoader } from "./LoaderContext";

type CartContextType = {
  cart: CartType | undefined;
  updateShopifyCart: (payload: CartType) => void;
  addToCart: (selectedVariant: ProductVariantType) => void;
  increaseItemQuantity: (item: CartItemType) => void;
  decreaseItemQuantity: (item: CartItemType) => void;
  totalQuantity: number;
  isEmpty: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
  shopifyCart,
}: {
  children: React.ReactNode;
  shopifyCart: CartType | undefined;
}): ReactElement {
  const [cart, setCart] = useState<CartType | undefined>(shopifyCart);
  const { handleNotification } = useUI();
  const { setShowLoader } = useLoader();

  const updateShopifyCart = (payload: CartType) => setCart(payload);

  const addToCart = async (selectedVariant: ProductVariantType) => {
    try {
      setShowLoader(true);
      const shopifyCart = await addItemToCartAction(selectedVariant.id);

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

  const increaseItemQuantity = async (item: CartItemType) => {
    try {
      setShowLoader(true);
      const shopifyCart = await updateItemQuantityAction({
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

  const decreaseItemQuantity = async (item: CartItemType) => {
    try {
      setShowLoader(true);
      const shopifyCart = await updateItemQuantityAction({
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
