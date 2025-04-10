import type { MenuType } from "@/lib/shopify/types";

import Login from "@/components/account/login";
import NotAMember from "@/components/account/login/NotAMember";
import InfoLinkSection from "@/components/shared/InfoLinkSection";

export default function LoginContainer({
  infoLinkSection,
}: {
  infoLinkSection: MenuType[];
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-[80vh]">
        <Login />
        <NotAMember />
      </div>
      <InfoLinkSection sections={infoLinkSection} />
    </>
  );
}
