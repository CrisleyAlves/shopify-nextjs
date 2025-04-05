import type { ConnectionType, ImageType, MoneyType } from "./shared";

export type CartProductType = {
  id: string;
  handle: string;
  title: string;
  brand: {
    value: string;
  };
  featuredImage: ImageType;
  priceRange: {
    maxVariantPrice: MoneyType;
    minVariantPrice: MoneyType;
  };
};

export type CartItemType = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: MoneyType;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProductType;
  };
};

export type ShopifyCartType = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: MoneyType;
    totalAmount: MoneyType;
    totalTaxAmount: MoneyType;
  };
  lines: ConnectionType<CartItemType>;
  totalQuantity: number;
};

export type ShopifyCartOperationType = {
  data: {
    cart: ShopifyCartType;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperationType = {
  data: { cartCreate: { cart: ShopifyCartType } };
};

export type ShopifyUpdateCartOperationType = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCartType;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperationType = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCartType;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type CartType = Omit<ShopifyCartType, "lines"> & {
  lines: CartItemType[];
};

export type ShopifyAddToCartOperationType = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCartType;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};
