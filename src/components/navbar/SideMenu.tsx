import clsx from "clsx";
import Link from "next/link";
import { MouseEventHandler } from "react";

import type { MenuType } from "@/lib/shopify/menu/types";

import Icon from "@/components/shared/Icon";

export default function SideMenu({
  menu,
  showSideNav = false,
  onClickCloseIcon,
}: {
  menu: MenuType[];
  showSideNav: boolean;
  pathname: string;
  onClickCloseIcon: MouseEventHandler<HTMLButtonElement>;
}) {
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
            <Link href="/">BEYOND</Link>
          </h1>
          <button aria-label="Close Sidemenu" onClick={onClickCloseIcon}>
            <Icon path="/icons/close.svg" altText="Close Sidemenu" />
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
}
