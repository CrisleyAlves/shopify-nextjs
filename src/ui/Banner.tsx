import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = (): React.ReactElement => {
  return (
    <Link href="/collections/best-sales" className="w-full">
      <Image
        priority
        src="/banner2.jpg"
        alt="Product"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto lg:h-[500px]"
      />
    </Link>
  );
};

export default Banner;
