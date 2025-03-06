import Image from "next/image";
import Prose from "@/components/prose";
import { Product } from "@/lib/shopify/product/types";
import GuaranteeStatement from "./GuaranteeStatement";
import clsx from "clsx";

export const ProductDetail = ({ product }: { product: Product }) => {
  /**
   * @todo work on business rule later
   */
  const selected = "X";
  const disabled = "S";

  return (
    <div
      className="
          grid grid-cols-1
          md:grid-cols-2 md:gap-x-10 md:mb-10 md:mt-5
          lg:gap-x-20
        "
    >
      <section className="w-full h-[50vh] md:h-[600px]">
        <Image
          priority
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-full object-center rounded-t-xl"
        />
      </section>
      <section className="w-full">
        <div className="mt-5 md:mt-0 flex justify-between items-center">
          <h2 className="font-semibold md:text-2xl">{product.title}</h2>
          <span className="text-right text-green-700 font-semibold">
            <span className="line-through text-red-400">
              100.00 {product.priceRange.maxVariantPrice.currencyCode}
            </span>{" "}
            {product.priceRange.maxVariantPrice.amount}{" "}
            <span className="text-sm font-light">
              {product.priceRange.maxVariantPrice.currencyCode}
            </span>
          </span>
        </div>
        <p className="font-semibold mt-3 ">
          Sent From: <span className="font-light">Brazil, South America</span>
        </p>
        <p className="font-semibold">
          Size: <span className="font-light">Small</span>
        </p>
        <div className="grid grid-cols-5 gap-2 mt-2 mb-3">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              disabled={!variant.availableForSale}
              className={clsx(
                `p-1 aspect-square border border-gray-300 text-black font-light text-sm
                  md:py-0 md:px-0 md:h-10 md:w-full hover:bg-indigo-950 hover:text-white`,
                {
                  "bg-indigo-950 text-white": variant.title === selected,
                  "disabled:bg-gray-100 disabled:cursor-not-allowed hover:text-black":
                    disabled === "S",
                }
              )}
            >
              {variant.title}
            </button>
          ))}
        </div>

        <button className="w-full  bg-indigo-950 text-white p-3 uppercase hover:text-indigo-950 hover:bg-white border border-indigo-950">
          add to cart
        </button>
        <p className="font-thin text-center mt-3">
          Free Shipping + Free Returns for 7 Days
        </p>

        <ul className="mt-5 bg-gray-50/15">
          <li className="relative mb-5">
            <input
              type="checkbox"
              id="description"
              name="description"
              className="peer/description hidden w-full"
            />
            <label
              htmlFor="description"
              className="flex items-center cursor-pointer flex-row justify-between mb-4 z-10"
            >
              <h3 className="font-semibold text-md">Description</h3>
              <span className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
            </label>
            <div
              className="
                peer-checked/description:max-h-72 peer-checked/description:opacity-100 peer-checked/description:translate-y-0 max-h-0 opacity-0 -translate-y-2 overflow-hidden transition-all duration-500 ease-in-out
                "
            >
              <Prose html={product.descriptionHtml} />
            </div>
          </li>
        </ul>

        <GuaranteeStatement />
      </section>
    </div>
  );
};

export default ProductDetail;
