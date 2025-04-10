import { getMenu } from "@/lib/shopify/api/menu";
import { STORE_FRONT_API_SECTIONS } from "@/lib/shopify/constants";
import LoginContainer from "@/ui/login/LoginContainer";

export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  const infoLinkSection = await getMenu(
    STORE_FRONT_API_SECTIONS.INFO_LINK_SECTION
  );

  return <LoginContainer infoLinkSection={infoLinkSection} />;
}
