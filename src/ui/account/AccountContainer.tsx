"use client";
import Image from "next/image";

import type {
  CustomerAddressType,
  CustomerType,
  OrderType,
} from "@/lib/shopify/types/";

import { useLoader } from "@/context/LoaderContext";
import { NO_PROFILE_IMAGE, ROUTES } from "@/lib/shopify/constants";
import { DataTable } from "@/components/shared/DataTable";
import { customerLogoutAction } from "@/services/customer-service";

import { addressColumns, ordersColumns } from "./util";

/**
 *
 * @todo auth is working, but Shopify stops sending customer data all of sudden.
 * @returns
 */

export default function AccountContainer({
  customer,
  orders,
  addresses,
}: {
  customer: CustomerType;
  orders: OrderType[];
  addresses: CustomerAddressType[];
}) {
  const { setShowLoader, pushWithLoader } = useLoader();

  const handleOnClickLogout = async () => {
    try {
      setShowLoader(true);
      await customerLogoutAction();
      pushWithLoader(ROUTES.HOME);
    } catch (error) {
      console.error(error);
      setShowLoader(false);
    }
  };
  return (
    <div className="container mt-10 mb-10 p-5 xl:p-0">
      <div className="flex justify-center flex-col items-center mb-5 md:mb-0">
        <Image
          priority={true}
          src={NO_PROFILE_IMAGE}
          alt={"Profile Picture"}
          width={0}
          height={0}
          sizes="100vw"
          className="w-28"
        />
        <h2 className="mt-2 text-gray-900">Hello, {customer?.displayName}</h2>
        <button
          onClick={handleOnClickLogout}
          aria-label="Logout"
          className="
            py-1 px-6 rounded-md mt-2
          text-indigo-950 bg-white border border-indigo-950 
          disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-transparent"
        >
          Logout
        </button>
      </div>

      <DataTable<OrderType>
        title="Your Orders"
        columns={ordersColumns}
        data={orders}
      />

      <DataTable<CustomerAddressType>
        title="Your Addresses"
        columns={addressColumns}
        data={addresses}
      />
    </div>
  );
}
