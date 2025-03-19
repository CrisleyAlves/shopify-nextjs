"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { Menu } from "@/lib/shopify/menu/types";
import { buildQueryStringParams } from "@/lib/shopify/utils/navigation";
import { SEARCH_ROUTE } from "@/lib/shopify/constants";
import SideCart from "@/ui/cart/SideCart";

import SearchForm from "./SearchForm";
import SideMenu from "./SideMenu";
import BasicNavbar from "./BasicNavbar";

export default function Navbar({ menu }: { menu: Menu[] }) {
  const [showBasicNavbar, setShowBasicNavbar] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    showStickyNav,
    setShowSidenav,
    setShowSearchForm,
    setShowCart,
    setShowStickyNav,
    showCart,
    showSearchForm,
    showSidenav,
  } = useUI();

  const { totalQuantity } = useCart();

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

    if (showSearchForm) {
      setShowSearchForm(false);
    }
  }, [pathname]);

  const onSubmitSearchForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const val = e.target as HTMLFormElement;
      const search = val.search as HTMLInputElement;

      const url = buildQueryStringParams(
        SEARCH_ROUTE,
        searchParams,
        search.value
      );

      router.push(url);
    },
    [router, searchParams]
  );

  const stickNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      windowHeight > 64 ? setShowStickyNav(true) : setShowStickyNav(false);
    }
  };

  useEffect(() => {
    const showBasicNav =
      pathname.includes("checkout") || pathname.includes("success");
    setShowBasicNavbar(showBasicNav);
  }, [pathname]);

  if (showBasicNavbar) {
    return <BasicNavbar />;
  }

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
          <Link href="/">BEYOND</Link>
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
          <Link href="/">BEYOND</Link>
        </h1>

        <div className="flex flex-row justify-end">
          <button
            className="mr-2"
            onClick={() => setShowSearchForm(!showSearchForm)}
          >
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
          hidden: !showSearchForm,
        })}
      >
        <SearchForm onSubmitSearchForm={onSubmitSearchForm} />
      </div>
    </>
  );
}
