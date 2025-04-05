import type {
  PageType,
  ShopifyPageOperationType,
  ShopifyPagesOperationType,
} from "@/lib/shopify/types/";

import { getPageQuery, getPagesQuery } from "../../page/fragments";
import { removeEdgesAndNodes } from "../utils";
import shopifyFetch from "../shopify-fetch";

export async function getPage(handle: string): Promise<PageType> {
  const res = await shopifyFetch<ShopifyPageOperationType>({
    query: getPageQuery,
    cache: "no-store",
    variables: { handle },
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<PageType[]> {
  const res = await shopifyFetch<ShopifyPagesOperationType>({
    query: getPagesQuery,
    cache: "no-store",
  });

  return removeEdgesAndNodes(res.body.data.pages);
}
