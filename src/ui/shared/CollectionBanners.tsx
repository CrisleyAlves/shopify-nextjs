import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Collection } from "@/lib/shopify/collection/types";

export default function CollectionBanners({
  collections,
}: {
  collections: Collection[];
}): React.JSX.Element {
  return (
    <section className="container px-5 mt-5">
      <h2 className="text-3xl font-extralight">Collections</h2>
      <ul
        className="
        grid gap-y-4 pt-10 pb-10 grid-cols-2 gap-x-3
        md:gap-x-8 md:grid-cols-3 md:px-0"
      >
        {collections.map((collection) => (
          <li key={collection.path}>
            <Link href={collection.path} className="relative w-full shadow-lg">
              <h3
                className="
                text-center absolute top-1/2 left-1/2 bg-white rounded-sm p-4 font-light
                md:px-20 md:py-4
                lg:text-lg lg:px-12 z-10 transform -translate-x-1/2 -translate-y-1/2"
              >
                {collection.title}
              </h3>
              <Image
                priority={true}
                src={collection.image.url}
                alt={`${collection.title} Collection`}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full blur-[2px]"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
