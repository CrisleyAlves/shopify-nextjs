export type MenuType = {
  title: string;
  path: string;
};

export type ShopifyMenuOperationType = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};
