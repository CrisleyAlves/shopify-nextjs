import { getRandomOrderId } from "@/ui/utils";
import { getProducts } from "@/lib/shopify/api/product";
import { SORT_KEYS } from "@/lib/shopify/constants";
import SuccessContainer from "@/ui/success/SuccessContainer";

export const metadata = {
  title: "Beyond - Order Received",
  description: "Order Successfully received",
};

export default async function Page() {
  const recommendedProducts = await getProducts({
    sortKey: SORT_KEYS.RELEVANCE,
    reverse: false,
    query: "",
  });

  const orderId = getRandomOrderId();

  return (
    <SuccessContainer
      recommendedProducts={recommendedProducts}
      orderId={orderId}
    />
  );
}
