import imageFragment from "../shared/fragments/image/fragment";
import seoFragment from "../shared/fragments/seo/fragment";

export const productFragment = /* GraphQl */ `
    fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    brand: metafield(namespace: "custom", key: "brand") {
      value
      type
    }
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
    }
    ${imageFragment}
    ${seoFragment}
`;
