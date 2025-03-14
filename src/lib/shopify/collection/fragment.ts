import seoFragment from "../shared/fragments/seo/fragment";

export const collectionFragment = /* GraphQL */ `
  fragment collection on Collection {
    handle
    title
    description
    image {
      altText
      id
      url
    }
    seo {
      ...seo
    }
    updatedAt
  }
  ${seoFragment}
`;
