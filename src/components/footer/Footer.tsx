import type { Menu } from "@/lib/shopify/menu/types";

import Link from "next/link";

const Footer = ({ footerMenu }: { footerMenu: Menu[] }) => {
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
              <Link href={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
