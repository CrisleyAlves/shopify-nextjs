import GuaranteeStatement from "@/ui/GuaranteeStatement";
import { ProductList } from "@/ui/ProductCard";
import clsx from "clsx";
import Image from "next/image";

/**
 * @todo it'll be dynamic, it'll probably not be necessary later
 */
const Sizes = ["XS", "S", "ML", "X", "L"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<any> {
  return Promise.resolve({});
  // const { page } = await params;
  // const pageDetails = await getPage(page);

  // if (!page) return notFound();

  // return {
  //   title: pageDetails.seo?.title || pageDetails.title,
  //   description: pageDetails.seo?.description || pageDetails.bodySummary,
  //   openGraph: {
  //     publishedTime: pageDetails.createdAt,
  //     modifiedTime: pageDetails.updatedAt,
  //     type: "article",
  //   },
  // };
}

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  return (
    <>
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
            src="/product-male-2.webp"
            alt="Product"
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-full object-center rounded-t-xl"
          />
        </section>
        <section className="w-full">
          <div className="mt-5 md:mt-0 flex justify-between items-center">
            <h2 className="font-semibold md:text-2xl">Product Title Here</h2>
            <span className="text-right text-green-700 font-semibold">
              <span className="line-through text-red-400">$1545.99</span>{" "}
              $542.54
            </span>
          </div>
          <p className="font-semibold mt-3 ">
            Sent From: <span className="font-light">Brazil, South America</span>
          </p>
          <p className="font-semibold">
            Size: <span className="font-light">Small</span>
          </p>
          <div className="grid grid-cols-5 gap-2 mt-2 mb-3">
            {Sizes.map((size) => (
              <button
                key={size}
                disabled={size === "S"}
                className={clsx(
                  `p-1 aspect-square border border-gray-300 text-black font-light text-sm
                  md:py-0 md:px-0 md:h-10 md:w-full hover:bg-indigo-950 hover:text-white`,
                  {
                    "bg-indigo-950 text-white": size === "X",
                    "disabled:bg-gray-100 disabled:cursor-not-allowed hover:text-black":
                      size === "S",
                  }
                )}
              >
                {size}
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
                <p className="font-light">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Quisquam eius neque, quaerat delectus minima dolor? Voluptas
                  iure, incidunt itaque atque voluptate earum ipsa recusandae,
                  obcaecati, officiis iusto sit accusantium unde!
                </p>
              </div>
            </li>
          </ul>

          <GuaranteeStatement />
        </section>
      </div>

      <ProductList title="Recommended for you" />
    </>
  );
}
