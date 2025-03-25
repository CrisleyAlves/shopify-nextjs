import { getMenu } from "@/lib/shopify/api/menu";
import { SORT_KEYS, STORE_FRONT_API_MENUS } from "@/lib/shopify/constants";
import { getProducts } from "@/lib/shopify/api/product";

import Navbar from "./Navbar";

export default async function NavbarContainer() {
  const menu = await getMenu(STORE_FRONT_API_MENUS.NAVBAR_MENU);
  const products = await getProducts({
    sortKey: SORT_KEYS.RELEVANCE,
    reverse: false,
    query: "",
  });

  return <Navbar menu={menu} products={products} />;
}
