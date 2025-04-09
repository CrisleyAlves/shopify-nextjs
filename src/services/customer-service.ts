"use server";

import { cookies } from "next/headers";

import {
  createCustomer,
  createCustomerAccessToken,
  customerLogout,
} from "../lib/shopify/customer";
import {
  CreateCustomerAccessTokenType,
  CreateCustomerType,
  CustomerAccessTokenType,
} from "@/lib/shopify/types/customer";

/**
 * @todo may move it to an utility folder in server
 * @description set customer access token in cookies from server side
 *
 */
export async function setCustomerAccessToken(
  customerAccessToken: CustomerAccessTokenType
): Promise<void> {
  const cookie = await cookies();
  cookie.set("customerAccessToken", customerAccessToken.accessToken, {
    path: "/",
    httpOnly: true,
    expires: new Date(customerAccessToken.expiresAt), // honestly I don't know if this right hahaha I'll check later @todo
  });
}

/**
 * @todo may move it to an utility folder in server
 * @description clear customer access token from cookies
 */
export async function clearCustomerAccessToken(): Promise<void> {
  const cookie = await cookies();
  cookie.delete("customerAccessToken");
}

/**
 * @todo may move it to an utility folder in server
 * @description get customer access token from cookies
 *
 */
export async function getCustomerAccessTokenFromCookies(): Promise<
  string | undefined
> {
  const cookie = await cookies();
  const customerAccessToken = cookie.get("customerAccessToken")?.value;
  return customerAccessToken;
}

/**
 * @description Action that authenticates user and set accessToken in cookies
 */
export const createCustomerAccessTokenAction = async (
  customer: CreateCustomerAccessTokenType
): Promise<void | Error> => {
  try {
    const data = await createCustomerAccessToken(customer);
    await setCustomerAccessToken(data);
  } catch (error) {
    console.error("Error creating customer access token:", error);
    throw new Error("Invalid Credentials Provided");
  }
};

/**
 * @description Action that creates a new customer
 */
export const createCustomerAction = async (
  customer: CreateCustomerType
): Promise<void | Error> => {
  try {
    await createCustomer(customer);
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("Error Creating Account, please try again later");
  }
};

/**
 * @description Action that logout current customer
 */
export const customerLogoutAction = async (): Promise<void | Error> => {
  try {
    const customerAccessToken = await getCustomerAccessTokenFromCookies();

    if (!customerAccessToken) {
      throw new Error("Error loging out customer");
    }

    await customerLogout(customerAccessToken);
    await clearCustomerAccessToken();
  } catch (error) {
    console.error("Error loging out customer:", error);
  }
};
