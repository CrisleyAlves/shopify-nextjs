import { redirect } from "next/navigation";

import { ROUTES } from "@/lib/shopify/constants";
import { GetOrderDetailsReturnType } from "@/lib/shopify/types/";
import { getCustomerAccessTokenFromCookies } from "./customer-service";
import { getOrderDetails } from "@/lib/shopify/order";

/**
 * @description Action that will get current user order details
 *
 */
export const getOrderDetailsAction =
  async (): Promise<GetOrderDetailsReturnType> => {
    const accessToken = await getCustomerAccessTokenFromCookies();

    if (!accessToken) {
      return redirect(ROUTES.HOME);
    }
    const data = await getOrderDetails(accessToken);
    return data;
  };
