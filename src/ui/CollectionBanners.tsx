import Image from "next/image";
import Link from "next/link";
import React from "react";

const CollectionBanners = (): React.ReactElement => {
  return (
    <div
      className="container grid gap-y-4 pt-10 pb-10
        grid-cols-1 md:grid-cols-2 md:gap-x-8"
    >
      <Link href="/collections/men" className="relative w-full">
        <h3
          className="
            text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-20 py-4 z-10
            lg:text-lg"
        >
          Men's Collection
        </h3>
        <Image
          priority
          src="/banner-clothes-man.webp"
          alt="Men collection"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-[300px] blur-[2px] transition duration-500"
        />
      </Link>

      <Link href="/collections/woman" className="relative w-full">
        <h3
          className="
            text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-20 py-4 z-10
            
            lg:text-lg"
        >
          Women's Collection
        </h3>
        <Image
          priority
          src="/banner-clothes-woman.jpg"
          alt="women collection"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-[300px] blur-[2px] transition duration-500"
        />
      </Link>
    </div>
  );
};

export default CollectionBanners;
