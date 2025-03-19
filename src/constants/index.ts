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
    ITEM_REMOVED_FROM_CART: "Item removed from cart",
  },
} as const;

export const NOTIFICATION_TYPES = {
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
} as const;

export const STEPS = {
  SHIPPING_ADDRESS: {
    id: 1,
    label: "Shipping Address",
  },
  PRODUCT_REVIEW: {
    id: 2,
    label: "Product Review",
  },
  PAYMENT_METHOD: {
    id: 3,
    label: "Payment Method",
  },
};

export const PAYMENT_OPTIONS = [
  {
    id: "credit_card",
    label: "Credit Card",
    content: "Credit Card",
  },
  {
    id: "paypal",
    label: "Paypal",
    content: "Paypal",
  },
  {
    id: "debt_card",
    label: "Debt Card",
    content: "Debt Card",
  },
];
