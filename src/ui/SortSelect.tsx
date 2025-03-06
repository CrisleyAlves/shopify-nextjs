"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { sorting } from "@/lib/shopify/constants";
import { buildSortingParams } from "@/lib/shopify/utils/navigation";

const SortSelect = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const url = buildSortingParams(pathname, searchParams, e.target.value);
    router.push(url);
  };

  return (
    <select
      className="
        w-[50%] py-1 border border-gray-500/10 rounded-md text-sm
        md:w-[200px] 
      "
      onChange={handleSorting}
    >
      {sorting.map((item) => (
        <option key={item.slug} value={item.slug}>
          {item.title}
        </option>
      ))}
    </select>
  );
};

export default SortSelect;
