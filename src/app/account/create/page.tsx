import { getMenu } from "@/lib/shopify/api/menu";
import { STORE_FRONT_API_SECTIONS } from "@/lib/shopify/constants";
import CreateAccountContainer from "@/ui/create-account/CreateAccountContainer";

export const metadata = {
  title: "Create Account",
  description: "Create your account",
};

export default async function LoginPage() {
  const infoLinkSection = await getMenu(
    STORE_FRONT_API_SECTIONS.INFO_LINK_SECTION
  );

  return <CreateAccountContainer infoLinkSection={infoLinkSection} />;
}
