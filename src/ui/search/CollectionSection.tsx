import Link from "next/link";

import { Collection } from "@/lib/shopify/collection/types";

/**
 * @todo considering to add some complex filters here as an exercise, but I don't know which ones yet...
 *
 */
const CollectionSection = ({ collections }: { collections: Collection[] }) => {
  return (
    <div className="mb-5 md:mb-0 ml-6 mr-6 md:ml-0 md:mr-0 col-span-5 md:col-span-1 border bg-white border-gray-200 p-5 rounded-md max-h-[500px] z-10">
      <div className="collections">
        <h3 className="font-semibold text-base uppercase mb-5">Collections</h3>
        <ul>
          {collections.map((item) => {
            return (
              <li
                key={item.path}
                className="mb-1 hover:underline font-light text-base"
              >
                <Link
                  href={item.path}
                  aria-label={`View ${item.title} collection`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CollectionSection;
