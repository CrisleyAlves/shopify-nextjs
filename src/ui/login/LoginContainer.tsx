"use client";

import Login from "@/components/account/login";
import NotAMember from "@/components/account/login/NotAMember";
import InfoLinkSection from "@/components/shared/InfoLinkSection";

export default function LoginContainer() {
  const onSubmitForm = (data: { email: string; password: string }) => {
    console.log("Form submitted", data);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-[80vh]">
        <Login onSubmitFormAction={onSubmitForm} />
        <NotAMember />
      </div>
      <InfoLinkSection />
    </>
  );
}
