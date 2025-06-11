import Link from "next/link";

import type { MenuType } from "@/lib/shopify/types/";

import ButtonLink from "@/components/shared/ButtonLink";

const Footer = ({ footerMenu }: { footerMenu: MenuType[] }) => {
  return (
    <footer className="w-full bg-white border border-t-2 shadow-lg">
      <div
        className="
          grid grid-cols-4
          container text-black p-5"
      >
        <h2 className="font-light uppercase">
          <Link href="/">BEYOND</Link>
        </h2>

        <ul className="flex flex-row justify-end col-span-3 items-center">
          {footerMenu.map((item) => (
            <li
              key={item.path}
              className="font-light text-sm ml-5 hover:underline"
            >
              <ButtonLink navigateTo={item.path}>{item.title}</ButtonLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
