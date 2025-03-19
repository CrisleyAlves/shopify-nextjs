"use client";
import clsx from "clsx";
import { useEffect, useState, useMemo, useCallback, JSX } from "react";
import { useRouter } from "next/navigation";

import { PAYMENT_OPTIONS, STEPS } from "@/constants";
import { scrollToTop } from "@/ui/utils";
import { createCartAndSetCookie } from "@/services/cart-service";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";

import Summary from "./Summary";
import ShippingAddress from "./ShippingAddress";
import CheckoutItems from "./CheckoutItems";

export default function CheckoutContainer(): JSX.Element {
  const router = useRouter();
  const [step, setStep] = useState<number>(STEPS.SHIPPING_ADDRESS.id);
  const [selected, setSelected] = useState<string | null>(null);

  const { cart, updateShopifyCart } = useCart();
  const { setShowLoader } = useUI();

  const paymentOptions = useMemo(() => PAYMENT_OPTIONS, []);

  useEffect(() => {
    scrollToTop();
  }, [step]);

  useEffect(() => {
    return () => setShowLoader(false);
  }, []);

  const handleStepAnimation = useCallback(
    (currentStep: number) =>
      clsx("overflow-hidden transition-all duration-500 ease-in-out", {
        "max-h-[1000px]": step === currentStep,
        "max-h-0": step !== currentStep,
      }),
    [step]
  );

  const onClickHeaderSection = useCallback(
    (newStep: number) => {
      if (newStep > step) return;
      setStep(newStep);
    },
    [step]
  );

  const onCLickFinishOrder = useCallback(async () => {
    setShowLoader(true);
    const cart = await createCartAndSetCookie();
    updateShopifyCart(cart);
    router.replace("/success");
  }, [router]);

  return (
    <div className="grid grid-cols-5">
      <section className="col-span-5 md:col-span-3 mb-10">
        <ul>
          <li>
            <button
              onClick={() => setStep(STEPS.SHIPPING_ADDRESS.id)}
              className="
                text-2xl font-extralight mb-5 border-b border-gray-200 pb-3 w-full text-left
              "
            >
              {STEPS.SHIPPING_ADDRESS.id} - {STEPS.SHIPPING_ADDRESS.label}
            </button>

            <div className={handleStepAnimation(STEPS.SHIPPING_ADDRESS.id)}>
              <ShippingAddress
                onSubmitShippingAddress={() => setStep(STEPS.PRODUCT_REVIEW.id)}
              />
            </div>
          </li>

          <li>
            <button
              onClick={() => onClickHeaderSection(STEPS.PRODUCT_REVIEW.id)}
              className="
                text-2xl font-extralight mb-5 border-b border-gray-200 pb-3 w-full text-left
              "
            >
              {STEPS.PRODUCT_REVIEW.id} - {STEPS.PRODUCT_REVIEW.label} (
              {cart?.totalQuantity} items)
            </button>

            <div className={handleStepAnimation(STEPS.PRODUCT_REVIEW.id)}>
              {cart && <CheckoutItems cart={cart} />}
              <button
                onClick={() => setStep(STEPS.PAYMENT_METHOD.id)}
                type="button"
                className="
                  mt-5 mb-5 w-full bg-indigo-950 font-light text-white p-2 hover:bg-white hover:text-indigo-950
                  border border-indigo-950 transition
                "
              >
                Continue to Payment Method
              </button>
            </div>
          </li>

          <li>
            <button
              onClick={() => onClickHeaderSection(STEPS.PAYMENT_METHOD.id)}
              className="
                text-2xl font-extralight mb-5 border-b border-gray-200 pb-3 w-full text-left
              "
            >
              {STEPS.PAYMENT_METHOD.id} - {STEPS.PAYMENT_METHOD.label}
            </button>

            <div className={handleStepAnimation(STEPS.PAYMENT_METHOD.id)}>
              <section className="col-span-5">
                <div className="md:hidden">
                  {cart && <Summary cart={cart} hideSummaryTitle />}
                </div>
                <h3 className="text-sm font-light mb-4">Choose an Option:</h3>
                <div className="flex gap-4">
                  {paymentOptions.map((option) => (
                    <label key={option.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="custom-radio"
                        value={option.id}
                        checked={selected === option.id}
                        onChange={() => setSelected(option.id)}
                        className="peer hidden"
                      />
                      <div
                        className="
                          h-full md:w-32 flex items-center justify-center border border-gray-300 rounded-md p-4 text-center
                          text-black peer-checked:border-indigo-950 peer-checked:bg-indigo-950 peer-checked:text-white
                        "
                      >
                        {option.content}
                      </div>
                    </label>
                  ))}
                </div>
              </section>
              <button
                onClick={() => onCLickFinishOrder()}
                disabled={selected === null}
                type="button"
                className="
                  mt-5 mb-5 w-full bg-indigo-950 font-light text-white p-2 hover:bg-white 
                  hover:text-indigo-950 border border-indigo-950 transition
                  disabled:bg-gray-300 disabled:border-gray-300 disabled:hover:text-white disabled:cursor-not-allowed
                "
              >
                Finish Order
              </button>
            </div>
          </li>
        </ul>
      </section>
      <section className="hidden md:block col-span-5 md:col-span-2 p-5 pt-0 bg-white">
        {cart && <Summary cart={cart} />}
      </section>
    </div>
  );
}
