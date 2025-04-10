import Link from "next/link";

import type { MenuType } from "@/lib/shopify/types";

import Icon from "./Icon";

type IconPath = "/about" | "/privacy" | "/contact-us" | "/guarantee";

const Icons: Record<IconPath, string> = {
  "/about": "/icons/account.svg",
  "/privacy": "/icons/eye.svg",
  "/contact-us": "/icons/email-symbol.svg",
  "/guarantee": "/icons/security.svg",
};

/**
 * @todo make it dynamic -- i.e missing guarantee page in Shopify
 */
export default function InfoLinkSection({
  sections,
}: {
  sections: MenuType[];
}): React.JSX.Element {
  return (
    <section className="text-black font-extralight pt-10 pb-10 border-t-2 bg-gray-50">
      <ul className="grid grid-cols-2 gap-y-5 md:gap-y-0 md:grid-cols-4 md:container">
        {sections.map((section) => {
          const icon = Icons[section.path as IconPath];

          return (
            <li
              key={section.path}
              className="flex flex-col items-center justify-center"
            >
              <Icon path={icon} altText={section.title} />
              <h3 className="text-sm mt-2 capitalize">{section.title}</h3>
              <Link
                href={section.path}
                className="text-sm underline text-gray-500"
              >
                Learn More
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
