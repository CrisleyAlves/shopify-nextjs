import type {
  CreateCustomerAccessTokenType,
  CreateCustomerType,
  ShopifyCreateCustomerAccessTokenOperationType,
  ShopifyCreateCustomerOperationType,
  ShopifyDeleteCustomerAccessTokenOperationType,
  ShopifyDeleteCustomerAcessTokenReturnType,
} from "../types/";
import type {
  CustomerAccessTokenCreateReturnType,
  CustomerCreateReturnType,
} from "../types/customer";

import shopifyFetch from "@/lib/shopify/api/shopify-fetch";

import {
  createCustomerAccessTokenMutation,
  createCustomerMutation,
  customerAccessTokenDelete,
} from "./mutations";

/**
 *
 * @description Creates customer access token which will be used to get user data
 * @returns
 */
export async function createCustomerAccessToken(
  createCustomerAccessToken: CreateCustomerAccessTokenType
): Promise<CustomerAccessTokenCreateReturnType> {
  const res = await shopifyFetch<ShopifyCreateCustomerAccessTokenOperationType>(
    {
      query: createCustomerAccessTokenMutation,
      variables: {
        input: {
          ...createCustomerAccessToken,
        },
      },
    }
  );
  return res.body.data.customerAccessTokenCreate;
}

/**
 * @description Create a new customer
 *
 */
export async function createCustomer(
  createCustomer: CreateCustomerType
): Promise<CustomerCreateReturnType> {
  const res = await shopifyFetch<ShopifyCreateCustomerOperationType>({
    query: createCustomerMutation,
    variables: {
      input: {
        ...createCustomer,
      },
    },
  });
  return res.body.data.customerCreate;
}

/**
 * @description Customer Logout
 *
 */
export async function customerLogout(
  customerAccessToken: string
): Promise<ShopifyDeleteCustomerAcessTokenReturnType> {
  const res = await shopifyFetch<ShopifyDeleteCustomerAccessTokenOperationType>(
    {
      query: customerAccessTokenDelete,
      variables: {
        customerAccessToken,
      },
    }
  );
  return res.body.data.customerAccessTokenCreate;
}
