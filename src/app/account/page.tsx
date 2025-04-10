import { getOrderDetailsAction } from "@/services/order-service";
import AccountContainer from "@/ui/account/AccountContainer";

export const metadata = {
  title: "My Account",
  description: "Check account details",
};

export default async function Page() {
  const { customer, orders, addresses } = await getOrderDetailsAction();

  return (
    <AccountContainer
      customer={customer}
      addresses={addresses}
      orders={orders}
    />
  );
}
