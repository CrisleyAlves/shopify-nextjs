"use client";

import clsx from "clsx";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { usePathname, useSearchParams } from "next/navigation";

import type { ProductType, MenuType } from "@/lib/shopify/types/";

import { ROUTES } from "@/lib/shopify/constants";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { useLoader } from "@/context/LoaderContext";
import { buildQueryStringParams } from "@/lib/shopify/utils/navigation";
import SideCart from "@/components/cart/SideCart";
import Icon from "@/components/shared/Icon";
import ButtonLink from "@/components/shared/ButtonLink";

import SearchForm from "./SearchForm";
import SideMenu from "./SideMenu";
import BasicNavbar from "./BasicNavbar";

export default function Navbar({
  menu,
  products,
}: {
  menu: MenuType[];
  products: ProductType[];
}) {
  const [showBasicNavbar, setShowBasicNavbar] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { pushWithLoader } = useLoader();

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
        ROUTES.SEARCH,
        searchParams,
        search.value
      );

      pushWithLoader(url);
    },
    [pushWithLoader, searchParams]
  );

  const stickNavbar = () => {
    const windowHeight = window.scrollY;

    if (windowHeight > 600) {
      setShowStickyNav(true);
      return;
    }

    setShowStickyNav(false);
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

        <button
          className="md:hidden"
          onClick={() => setShowSidenav(true)}
          aria-label="Open side menu"
        >
          <Icon path="/icons/hamburguer.svg" altText="Open Side Menu" />
        </button>

        <h1 className="hidden font-light md:block uppercase">
          <ButtonLink navigateTo="/">BEYOND</ButtonLink>
        </h1>

        <nav className="hidden md:block">
          <ul className="flex flex-row items-center justify-center h-full uppercase">
            {menu.map((item) => {
              return (
                <li key={item.path}>
                  <ButtonLink
                    navigateTo={"/" + item.path}
                    className="font-light text-md ml-3 hover:underline uppercase"
                  >
                    {item.title}
                  </ButtonLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <h1 className="font-light text-2xl text-center md:hidden uppercase">
          <ButtonLink navigateTo="/">BEYOND</ButtonLink>
        </h1>

        <div className="flex flex-row justify-end items-center">
          <button
            onClick={() => setShowSearchForm(!showSearchForm)}
            aria-label="Open search form"
          >
            <Icon path="/icons/search.svg" altText="search products" />
          </button>
          <button
            aria-label="Open cart"
            className="relative ml-2 mr-2"
            onClick={() => setShowCart(true)}
          >
            {totalQuantity > 0 && (
              <span className="absolute bg-red-600 rounded-full py-0 px-2 text-white text-sm top-[-5px]">
                {totalQuantity}
              </span>
            )}
            <Icon path="/icons/cart.svg" altText="Open Side Cart" />
          </button>

          <Link href="/account/login" aria-label="Account">
            <Icon path="/icons/account.svg" altText="navigate to account" />
          </Link>
        </div>
      </header>
      <SideCart
        products={products}
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
