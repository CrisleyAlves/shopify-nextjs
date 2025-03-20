import { getMenu } from "@/lib/shopify/api/menu";
import { STORE_FRONT_API_MENUS } from "@/lib/shopify/constants";
import Footer from "./Footer";

export default async function FooterContainer() {
  const footerMenu = await getMenu(STORE_FRONT_API_MENUS.FOOTER_MENU);
  return <Footer footerMenu={footerMenu} />;
}
