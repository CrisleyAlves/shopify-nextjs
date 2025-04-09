import { redirect } from "next/navigation";

import { GetOrderDetailsReturnType } from "@/lib/shopify/types/order";
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
      return redirect("/");
    }
    const data = await getOrderDetails(accessToken);
    return data;
  };
