export const getOrderDetailsQuery = /* GraphQL */ `
  query GetCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      displayName
      email
      phone
      addresses(first: 3) {
        edges {
          node {
            id
            address1
            phone
            city
            country
            zip
          }
        }
      }
      orders(first: 3) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            totalPrice {
              amount
              currencyCode
            }
            statusUrl
          }
        }
      }
    }
  }
`;
