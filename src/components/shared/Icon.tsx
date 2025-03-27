import Image from "next/image";

const DEFAULT_ICON_SIZE = 24;

export default function Icon({
  path,
  width = DEFAULT_ICON_SIZE,
  height = DEFAULT_ICON_SIZE,
  altText,
}: {
  width?: number;
  height?: number;
  path: string;
  altText: string;
}) {
  return <Image src={path} width={width} height={height} alt={altText} />;
}
