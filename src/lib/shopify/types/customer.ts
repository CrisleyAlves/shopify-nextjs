/** LOGIN TYPES */
export type CustomerAccessTokenType = {
  accessToken: string;
  expiresAt: string;
};

export type CreateCustomerAccessTokenType = {
  email: string;
  password: string;
};

export type CustomerAccessTokenCreateReturnType = {
  customerAccessToken: CustomerAccessTokenType;
  customerUserErrors: {
    code: string;
    message: string;
  }[];
};

export type ShopifyCreateCustomerAccessTokenOperationType = {
  data: {
    customerAccessTokenCreate: CustomerAccessTokenCreateReturnType;
  };
  variables: {
    input: CreateCustomerAccessTokenType;
  };
};

/** CREATE ACCOUNT TYPES */
export type CreateCustomerType = {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
  acceptsMarketing?: boolean;
};

export type CustomerType = {
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
};

export type CustomerCreateReturnType = {
  customer: CustomerType;
  customerUserErrors: {
    code: string;
    message: string;
  }[];
};

export type ShopifyCreateCustomerOperationType = {
  data: {
    customerCreate: CustomerCreateReturnType;
  };
  variables: {
    input: CreateCustomerType;
  };
};

export type GetCustomerVariables = {
  customerAccessToken: string;
};

export type CustomerAddressType = {
  id: string;
  address1: string;
  city: string;
  country: string;
  phone: string;
  zip: string;
};

export type ShopifyDeleteCustomerAcessTokenReturnType = {
  deletedAccessToken: string;
  userErrors: {
    field: string;
    message: string;
  };
};

export type ShopifyDeleteCustomerAccessTokenOperationType = {
  data: {
    customerAccessTokenCreate: ShopifyDeleteCustomerAcessTokenReturnType;
  };
  variables: {
    customerAccessToken: string;
  };
};
