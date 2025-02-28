import Link from "next/link";

const Footer = () => {
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
          <li className="mb-1 font-light text-sm">
            <Link href="/about">About</Link>
          </li>

          <li className="mb-1 font-light text-sm ml-5 mr-5">
            <Link href="/contact">Contact</Link>
          </li>

          <li className="mb-1 font-light text-sm">
            <Link href="/privacy">Privacy</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
