import { shopifyFetch } from "../shopify-fetch";
import { DOMAIN, TAGS } from "../../constants";
import { getMenuQuery } from "../../menu/queries";
import { Menu, ShopifyMenuOperation } from "../../menu/types";

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url
        .replace(DOMAIN, "")
        /**
         * @todo may or may not be necessary, check later
         */
        // .replace("collections", "/search")
        .replace("pages", ""),
    })) || []
  );
}
