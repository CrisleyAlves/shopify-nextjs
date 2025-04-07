"use client";

import CreateAccount from "@/components/account/createAccount";
import AlreadyHaveAnAccount from "@/components/account/createAccount/AlreadyHaveAnAccount";
import InfoLinkSection from "@/components/shared/InfoLinkSection";

export default function CreateAccountContainer() {
  const onSubmitForm = (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    console.log("Form submitted", data);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:h-[80vh]">
        <section
          className="
        bgw-full flex-1 -gray-50 pt-16 pb-16
        md:w-[50%] md:min-h-[500px] md:pt-0 md:mb-0"
        >
          <CreateAccount onSubmitFormAction={onSubmitForm} />
        </section>
        <section
          className="
        bg-indigo-950 w-full h-full flex flex-col justify-center items-center text-white pb-16 pt-16 p-10
        md:mt-0 md:pb-0 md:pt-0 md:w-[50%] md:min-h-[500px]
        xl:p-32"
        >
          <AlreadyHaveAnAccount />
        </section>
      </div>
      <InfoLinkSection />
    </>
  );
}
