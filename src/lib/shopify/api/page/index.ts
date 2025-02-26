import { getPageQuery, getPagesQuery } from "../../page/fragments";
import {
  Page,
  ShopifyPageOperation,
  ShopifyPagesOperation,
} from "../../page/types";
import { shopifyFetch } from "../shopify-fetch";
import { removeEdgesAndNodes } from "../utils";

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    cache: "no-store",
    variables: { handle },
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery,
    cache: "no-store",
  });

  return removeEdgesAndNodes(res.body.data.pages);
}
