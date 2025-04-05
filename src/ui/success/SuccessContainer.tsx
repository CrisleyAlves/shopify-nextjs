"use client";
import { useRouter } from "next/navigation";

import type { ProductType } from "@/lib/shopify/product/types";

import ProductList from "@/components/shared/ProductList";

export const metadata = {
  title: "Success Page",
  description: "Success Page",
};

export default function SuccessContainer({
  orderId,
  recommendedProducts,
}: {
  orderId: number;
  recommendedProducts: ProductType[];
}) {
  const router = useRouter();

  return (
    <section>
      <section className="pt-20 pb-20">
        <h2 className="text-5xl font-extralight text-center">
          Thanks for your purchase!
        </h2>
        <h2 className="text-2xl text-center font-light mt-5">
          Order: #<span className="">{orderId}</span>
          {" was successfuly placed"}
        </h2>

        <p className="text-center font-light mt-10 mb-10">
          Of course you won't receive anything, but thanks for using the
          website!
        </p>

        <button
          className="w-full max-w-xs mx-auto bg-indigo-950 hover:text-indigo-950 hover:bg-white border border-indigo-950 text-white p-3 block text-center"
          onClick={() => router.replace("/")}
        >
          Go back to home page
        </button>
      </section>
      <div className="bg-gray-100 w-full">
        <div className="w-full p-5 md:container">
          <ProductList
            title="You may also like"
            products={recommendedProducts.slice(5, 9)}
          />
        </div>
      </div>
    </section>
  );
}
