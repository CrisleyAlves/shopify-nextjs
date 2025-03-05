import clsx from "clsx";
import Image from "next/image";
import { MouseEventHandler } from "react";

const CartItem = () => {
  return (
    <div
      className="
      grid grid-cols-4 items-center max-h-[100px] min-h-[80px] overflow-hidden
      shadow-md
      "
    >
      <div className="col-span-3 w-full flex">
        <Image
          priority
          src="/product-male-1.webp"
          alt="Product"
          width={0}
          height={0}
          sizes="100vw"
          className="
                w-20 h-auto object-fill rounded-sm mr-3
                md:w-40 md:h-40"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-black truncate block capitalize">
            Product Name
          </p>
          <p className="font-light text-sm">BRAND</p>
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            $149
          </p>
        </div>
      </div>
      <div
        className="
        flex flex-row items-center justify-center  h-full md:items-start md:pt-10"
      >
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.2"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
        <span className="ml-2 mr-2">1</span>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.2"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Cart = ({
  showCart = true,
  onClickCloseIcon,
}: {
  showCart: boolean;
  onClickCloseIcon: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div
      className={clsx("z-30 md:bg-black/50 md:w-full md:h-full md:fixed", {
        hidden: !showCart,
      })}
    >
      <div
        className={clsx(
          `w-full ease-in-out fixed bg-white shadow-2xl bottom-[-100%]  text-black
          transition duration-100 h-[100%]
          md:w-[25%]`,
          {
            "top-0 bottom-0 transition duration-100 md:right-0 md:w-[400px]":
              showCart,
          }
        )}
      >
        <h2 className="text-center text-base font-bold border border-b-gray-200 pb-5 pt-5 relative">
          Cart
          <button className="absolute right-5 top-5" onClick={onClickCloseIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </h2>

        <div className="p-5 flex flex-col justify-between h-[95%]">
          <div
            className="
          min-h-[55vh] max-h-[55vh] overflow-y-auto shadow-sm
          md:min-h-[65vh] md:max-h-[65vh]
          "
          >
            <p className="text-center font-light">Cart is empty</p>

            {[1, 2, 3, 4].map((value) => (
              <div key={value} className="mb-5">
                <CartItem />
              </div>
            ))}
          </div>
          <div className="w-full right-0 p-5 fixed bottom-0 md:relative">
            <div className="flex justify-between">
              <span className="text-right font-semibold">TOTAL: 1 Item</span>
              <span className="text-right text-green-700 font-semibold">
                $542.54
              </span>
            </div>
            <p className="mb-3 font-thin text-right">free shipping</p>
            <div className="flex justify-between flex-row"></div>
            <button className="w-full bg-indigo-950 text-white p-3">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
