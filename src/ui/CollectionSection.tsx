import Link from "next/link";

const CollectionSection = () => {
  return (
    <div className="mb-5 md:mb-0 ml-6 mr-6 md:ml-0 md:mr-0 col-span-5 md:col-span-1 border bg-gray-100 p-5 rounded-md max-h-[500px]">
      <div className="collections">
        <h3 className="font-semibold text-base uppercase mb-5">Collections</h3>
        <ul>
          <li className="mb-1 hover:underline font-light text-base">
            <Link href="/collections/best-sellers">Best Sellers</Link>
          </li>

          <li className="mb-1 hover:underline font-light text-base">
            <Link href="/collections/woman">Woman</Link>
          </li>

          <li className="mb-1 hover:underline font-light text-base">
            <Link href="/collections/kids">Kids</Link>
          </li>

          <li className="mb-1 hover:underline font-light text-base">
            <Link href="/collections/man">Man</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CollectionSection;
