import { Menu } from "@/lib/shopify/menu/types";
import Link from "next/link";

const Footer = ({ footerMenu }: { footerMenu: Menu[] }) => {
  return (
    <footer className="w-full bg-blue-950">
      <div
        className="
            grid grid-cols-2
            container text-white p-5
          "
      >
        <h2 className="font-bold uppercase">
          <Link href="/">Clothes</Link>
        </h2>

        <ul className="flex flex-row justify-end">
          {footerMenu.map((item) => (
            <li key={item.path} className="mb-1 font-light text-sm ml-5">
              <Link href={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
