import Image from "next/image";
import Link from "next/link";

const Banner = (): React.ReactElement => {
  return (
    <Link href="/collections/sales" className="w-full">
      <Image
        priority
        src="/banner.webp"
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
