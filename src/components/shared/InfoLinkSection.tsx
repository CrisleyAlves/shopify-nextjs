import Link from "next/link";
import Icon from "./Icon";

/**
 * @todo make it dynamic -- i.e missing guarantee page in Shopify
 */
export default function InfoLinkSection(): React.JSX.Element {
  return (
    <section className="text-black font-extralight pt-10 pb-10 border-t-2 bg-gray-50">
      <ul className="grid grid-cols-2 gap-y-5 md:gap-y-0 md:grid-cols-4 md:container">
        <li className="flex flex-col items-center justify-center">
          <Icon path="/icons/account.svg" altText="Account" />
          <h3 className="text-sm mt-2">About Us</h3>
          <Link href="/about" className="text-sm underline text-gray-500">
            Learn More
          </Link>
        </li>
        <li className="flex flex-col items-center justify-center">
          <Icon path="/icons/eye.svg" altText="Account" />
          <h3 className="text-sm mt-2">Privacy</h3>
          <Link href="/privacy" className="text-sm underline text-gray-500">
            Learn More
          </Link>
        </li>
        <li className="flex flex-col items-center justify-center">
          <Icon path="/icons/email-symbol.svg" altText="Account" />
          <h3 className="text-sm mt-2">Contact US</h3>
          <Link href="/contact-us" className="text-sm underline text-gray-500">
            Learn More
          </Link>
        </li>
        <li className="flex flex-col items-center justify-center">
          <Icon path="/icons/security.svg" altText="Account" />
          <h3 className="text-sm mt-2">Guarantee</h3>
          <Link href="/guarantee" className="text-sm underline text-gray-500">
            Learn More
          </Link>
        </li>
      </ul>
    </section>
  );
}
