import { JSX } from "react";

import type { CartType } from "@/lib/shopify/types/";

export default function Summary({
  cart,
  hideSummaryTitle,
}: {
  cart: CartType;
  hideSummaryTitle?: boolean;
}): JSX.Element {
  return (
    <>
      {!hideSummaryTitle && (
        <h3 className="font-extralight border-b border-gray-200 text-2xl pb-3 mb-3">
          Summary
        </h3>
      )}

      <p className="font-extralight text-md mb-3 flex justify-between">
        Subtotal{" "}
        <span>
          {cart?.cost?.subtotalAmount.amount}{" "}
          {cart?.cost?.subtotalAmount.currencyCode}
        </span>
      </p>
      <p className="font-extralight text-md mb-3 flex justify-between">
        Estimated Delivery & Handling <span>$0.0</span>
      </p>

      <p className="font-extralight text-md mb-3 flex justify-between">
        Taxes{" "}
        <span>
          {cart?.cost.totalTaxAmount.amount}{" "}
          {cart?.cost.totalTaxAmount.currencyCode}
        </span>
      </p>

      <p className="font-light text-md mb-3 flex justify-between border-t border-gray-200 pt-3">
        Total{" "}
        <span>
          <span>{cart?.cost.totalAmount.currencyCode}</span>
          {cart?.cost.totalAmount.amount}
        </span>
      </p>
    </>
  );
}
