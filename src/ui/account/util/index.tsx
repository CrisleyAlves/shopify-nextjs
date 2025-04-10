import Link from "next/link";

import { CustomerAddressType } from "@/lib/shopify/types/customer";
import { OrderType } from "@/lib/shopify/types/order";
import { formatDate } from "@/ui/utils";

export const addressColumns = [
  { label: "Country", render: (a: CustomerAddressType) => a.country },
  { label: "City", render: (a: CustomerAddressType) => a.city },
  { label: "Address", render: (a: CustomerAddressType) => a.address1 },
  { label: "Phone", render: (a: CustomerAddressType) => a.phone },
  { label: "Zip Code", render: (a: CustomerAddressType) => a.zip },
];

export const ordersColumns = [
  { label: "Id", render: (a: OrderType) => a.orderNumber },
  { label: "Date", render: (a: OrderType) => formatDate(a.processedAt) },
  { label: "Price", render: (a: OrderType) => a.totalPrice.amount },
  { label: "Financial", render: (a: OrderType) => a.financialStatus },
  {
    label: "More",
    render: (a: OrderType) => (
      <Link className="font-bold" href={a.statusUrl} target="_blank">
        details
      </Link>
    ),
  },
];
