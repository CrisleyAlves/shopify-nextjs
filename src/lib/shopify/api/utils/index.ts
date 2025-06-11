import type {
  CartType,
  ShopifyCartType,
  CollectionType,
  ShopifyCollectionType,
  ShopifyProductType,
  ConnectionType,
  ImageType,
} from "@/lib/shopify/types";

import { HIDDEN_PRODUCT_TAG } from "@/lib/shopify/constants";

export function removeEdgesAndNodes<T>(array: ConnectionType<T>): T[] {
  return array?.edges?.map((edge) => edge?.node);
}

export function reshapeProducts(products: ShopifyProductType[]) {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
}

export function reshapeImages(
  images: ConnectionType<ImageType>,
  productTitle: string
) {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];

    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
}

export function reshapeProduct(
  product: ShopifyProductType,
  filterHiddenProducts: boolean = true
) {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants),
  };
}

export function reshapeCollection(
  collection: ShopifyCollectionType
): CollectionType | undefined {
  if (!collection) return undefined;

  return {
    ...collection,
    path: `/collections/${collection.handle}`,
  };
}

export function reshapeCollections(collections: ShopifyCollectionType[]) {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
}

export function reshapeCart(cart: ShopifyCartType): CartType {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: "USD",
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
}
