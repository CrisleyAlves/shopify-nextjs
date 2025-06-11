"use client";

import { useLoader } from "@/context/LoaderContext";
import { usePathname } from "next/navigation";

export default function ButtonLink({
  navigateTo,
  className = "",
  children,
  ...props
}: {
  className?: string;
  navigateTo: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}) {
  const { pushWithLoader } = useLoader();
  const pathanme = usePathname();

  const onClickButtonLink = () => {
    if (pathanme == navigateTo) return;
    pushWithLoader(navigateTo);
  };

  return (
    <button {...props} className={className} onClick={onClickButtonLink}>
      {children}
    </button>
  );
}
