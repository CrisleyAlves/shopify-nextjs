import Link from "next/link";

export default function AlreadyHaveAnAccount() {
  return (
    <>
      <h2 className="text-2xl mb-5 font-normal text-md">
        Already have an account?
      </h2>
      <Link
        href="/account/login"
        className="font-normal border-b-2 border-b-white/20"
      >
        Login to your account
      </Link>
    </>
  );
}
