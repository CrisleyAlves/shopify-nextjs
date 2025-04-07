import Link from "next/link";

export default function NotAMember() {
  return (
    <section
      className="
        bg-indigo-950 w-full flex flex-col justify-center items-center text-white pb-16 pt-16 pl-10 pr-10
        md:mt-0 md:pb-0 md:pt-0 md:w-[50%] md:min-h-[500px] xl:p-32"
    >
      <h2 className="text-2xl mb-5 font-normal text-md">Not a member?</h2>
      <p className="font-extralight text-md text-center">
        Enjoy exclusive benefits with a free account — including early sale
        access, birthday rewards and unique offers.
      </p>
      <Link
        href="/account/create"
        className="font-normal mt-5 border-b-2 border-b-white/20"
      >
        Create an account
      </Link>
    </section>
  );
}
