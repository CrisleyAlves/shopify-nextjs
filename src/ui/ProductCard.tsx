import Image from "next/image";

export const ProductList = ({ title }: { title: string }) => {
  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold">{title}</h2>
      <section
        className="
        gap-y-6 mt-5
        justify-items-center justify-center md:gap-y-16 gap-x-14 md:mt-10 mb-5 w-fit grid grid-cols-1
        md:grid-cols-3 md:gap-x-8
        lg:grid-cols-4"
      >
        {[0, 1, 2, 4].map((value) => (
          <ProductCard key={value} />
        ))}
      </section>
    </div>
  );
};

const ProductCard = () => {
  return (
    <div
      className="
        shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl
        md:w-56
      "
    >
      <a
        className="
        flex flex-row
        md:block
        "
        href="#"
      >
        <Image
          src="/product-male-1.webp"
          alt="Product"
          width={1000}
          height={0}
          className="
          w-40
          md:h-80 md:w-56 object-cover rounded-t-xl"
        />
        <div
          className="
          md:block
          px-4 py-3 w-52
          "
        >
          <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            Product Name
          </p>
          <p className="font-light text-xs h-10 overflow-hidden md:h-auto">
            Fantastic pants for usage. Clean, useful...
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              $149
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
            </del>
            <div className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
