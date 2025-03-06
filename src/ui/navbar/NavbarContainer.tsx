import { getMenu } from "@/lib/shopify/api/menu";
import { STORE_FRONT_API_MENUS } from "@/lib/shopify/constants";
import Navbar from "./Navbar";

export default async function NavvbarContainer() {
  const menu = await getMenu(STORE_FRONT_API_MENUS.NAVBAR_MENU);
  return <Navbar menu={menu} />;
}
