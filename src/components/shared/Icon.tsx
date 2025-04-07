import Image from "next/image";

export default function Icon({
  path,
  altText,
  className = "w-5 md:w-6",
}: {
  width?: number;
  height?: number;
  path: string;
  altText: string;
  className?: string;
}) {
  return (
    <Image
      src={path}
      width={0}
      height={0}
      alt={altText}
      className={className}
    />
  );
}
