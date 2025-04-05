"use client";
import { useState } from "react";
import Image from "next/image";

import type { ImageType } from "@/lib/shopify/shared/types";

import { IMAGE_NOT_AVAILABLE_PATH } from "@/lib/shopify/constants";
import { scrollToTop } from "@/ui/utils";

export default function ProductGallery({
  featuredImage,
  images = [],
}: {
  featuredImage: ImageType;
  images?: ImageType[];
}) {
  const [mainImage, setMainImage] = useState<undefined | ImageType>(
    featuredImage
  );

  const onClickImage = (image: ImageType) => {
    scrollToTop();
    setMainImage(image);
  };

  return (
    <section>
      <Image
        priority={true}
        src={mainImage?.url || IMAGE_NOT_AVAILABLE_PATH}
        alt={mainImage?.altText || "Product Image"}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full rounded-t-xl"
      />
      <div className="grid grid-cols-5 gap-1 mt-1">
        {images.slice(0, 5)?.map((image) => (
          <button key={image.url} onClick={() => onClickImage(image)}>
            <Image
              priority={true}
              src={image.url || IMAGE_NOT_AVAILABLE_PATH}
              alt={image.altText || "Product Image"}
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-full object-center"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
