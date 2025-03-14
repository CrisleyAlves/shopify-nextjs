"use client";
import { MouseEventHandler, useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

import { Menu } from "@/lib/shopify/menu/types";
import { useCart } from "@/state/cart/CartContext";
import { buildQueryStringParams } from "@/lib/shopify/utils/navigation";
import { SEARCH_ROUTE } from "@/lib/shopify/constants";

import SearchForm from "../SearchForm";
import SideCart from "../cart/SideCart";

const SideMenu = ({
  menu,
  showSideNav = false,
  onClickCloseIcon,
}: {
  menu: Menu[];
  showSideNav: boolean;
  pathname: string;
  onClickCloseIcon: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div
      className={clsx(
        "z-30 bg-black/50 w-full h-full fixed top-0 transition-opacity duration-300",
        {
          "opacity-0 pointer-events-none": !showSideNav,
          "opacity-100": showSideNav,
        }
      )}
    >
      <div
        className={clsx(
          `w-[60%] h-[100vh] bg-white shadow-2xl fixed left-0 top-0 p-4 text-black z-20 md:hidden transition-transform duration-300 ease-in-out`,
          {
            "translate-x-[-100%]": !showSideNav,
            "translate-x-0": showSideNav,
          }
        )}
      >
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-light text-3xl uppercase">
            <Link href="/">Clothes</Link>
          </h1>
          <button onClick={onClickCloseIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
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
        </div>

        <nav className="mt-10">
          <h2 className="text-base font-bold mb-2">Collections</h2>
          <ul>
            {menu.map((item) => {
              return (
                <li key={item.path} className="mb-1 font-light text-sm">
                  <Link href={"/" + item.path}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default function Navbar({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { totalQuantity } = useCart();

  const [showStickyNav, setShowStickyNav] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSidenav, setShowSidenav] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  useEffect(() => {
    if (showSidenav) {
      setShowSidenav(false);
    }
  }, [pathname]);

  function onSubmitSearchForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;

    const url = buildQueryStringParams(
      SEARCH_ROUTE,
      searchParams,
      search.value
    );

    setShowForm(false);
    router.push(url);
  }

  const stickNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      windowHeight > 64 ? setShowStickyNav(true) : setShowStickyNav(false);
    }
  };

  return (
    <>
      <header
        className={clsx(
          "p-5 grid grid-cols-3 shadow-md bg-white text-black/85",
          {
            "z-20 fixed w-full": !!showStickyNav,
          }
        )}
      >
        <SideMenu
          pathname={pathname}
          menu={menu}
          showSideNav={showSidenav}
          onClickCloseIcon={() => setShowSidenav(false)}
        />

        <button className="md:hidden" onClick={() => setShowSidenav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <h1 className="hidden font-light md:block uppercase">
          <Link href="/">Clothes</Link>
        </h1>

        <nav className="hidden md:block">
          <ul className="flex flex-row items-center justify-center h-full uppercase">
            {menu.map((item) => {
              return (
                <li
                  key={item.path}
                  className="font-light text-md ml-3 hover:underline"
                >
                  <Link prefetch href={"/" + item.path}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <h1 className="font-light text-2xl text-center md:hidden uppercase">
          <Link href="/">Clothes</Link>
        </h1>

        <div className="flex flex-row justify-end">
          <button className="mr-2" onClick={() => setShowForm(!showForm)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
          <button className="relative" onClick={() => setShowCart(true)}>
            {totalQuantity > 0 && (
              <span className="absolute bg-red-600 rounded-full py-0 px-2 text-white text-sm top-[-5px]">
                {totalQuantity}
              </span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>
        </div>
      </header>
      <SideCart
        showCart={showCart}
        onClickCloseIcon={() => setShowCart(false)}
      />
      <div
        className={clsx("bg-white border border-b-gray-300 shadow-md", {
          "z-20 fixed top-16 w-full": !!showStickyNav,
          hidden: !showForm,
        })}
      >
        <SearchForm onSubmitSearchForm={onSubmitSearchForm} />
      </div>
    </>
  );
}
