export type MoneyType = {
  amount: string;
  currencyCode: string;
};

export type ImageType = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type SEOType = {
  title: string;
  description: string;
};

export type EdgeType<T> = {
  node: T;
};

export type ConnectionType<T> = {
  edges: Array<EdgeType<T>>;
};
