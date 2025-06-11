import type {
  GetOrderDetailsReturnType,
  ShopifyGetOrderDetailsOperationType,
} from "../types/";

import shopifyFetch from "../api/shopify-fetch";
import { removeEdgesAndNodes } from "../api/utils";
import { getOrderDetailsQuery } from "../customer/queries";

/**
 * @description Get order details
 *
 */
export async function getOrderDetails(
  customerAccessToken: string
): Promise<GetOrderDetailsReturnType> {
  const res = await shopifyFetch<ShopifyGetOrderDetailsOperationType>({
    query: getOrderDetailsQuery,
    variables: {
      customerAccessToken,
    },
  });

  return {
    customer: res.body.data.customer,
    orders: removeEdgesAndNodes(res.body.data.customer?.orders),
    addresses: removeEdgesAndNodes(res.body.data.customer?.addresses),
  };
}
