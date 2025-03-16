export const MESSAGES = {
  ERROR: {
    ADD_TO_CART: "Error adding item to cart",
    INCREASE_QUANTITY: "Error increasing item quantity",
    DECREASE_QUANTITY: "Error decreasing item quantity",
  },
  SUCCESS: {
    ADD_TO_CART: "Item added to cart",
    INCREASE_QUANTITY: "Item quantity increased",
    DECREASE_QUANTITY: "Item quantity decreased",
  },
} as const;

export const NOTIFICATION_TYPES = {
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
} as const;
