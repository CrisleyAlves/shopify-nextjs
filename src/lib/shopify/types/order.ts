import { CustomerAddressType, CustomerType } from "./customer";

export type OrderType = {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  statusUrl: string;
};

export type GetOrderDetailsReturnType = {
  customer: CustomerType;
  orders: OrderType[];
  addresses: CustomerAddressType[];
};

export type ShopifyGetOrderDetailsOperationType = {
  variables: {
    customerAccessToken: string;
  };
  data: {
    customer: {
      id: string;
      firstName: string;
      lastName: string;
      displayName: string;
      email: string;
      phone: string;
      addresses: {
        edges: {
          node: CustomerAddressType;
        }[];
      };
      orders: {
        edges: {
          node: OrderType;
        }[];
      };
    };
  };
};
