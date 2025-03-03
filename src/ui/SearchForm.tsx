"use client";
import { SEARCH_ROUTE } from "@/lib/shopify/constants";
import { buildQueryStringParams } from "@/lib/shopify/utils/navigation";
import { useSearchParams, useRouter } from "next/navigation";

const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;

    const url = buildQueryStringParams(
      SEARCH_ROUTE,
      searchParams,
      search.value
    );
    router.push(url);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="
            justify-between
            px-3
            py-3 flex flex-row
            md:justify-between md:container md:px-5 xl:px-0"
    >
      <input
        name="search"
        className="button w-full font-light"
        placeholder="search..."
      />
      <button className="font-semibold text-base ml-2">search</button>
    </form>
  );
};

export default SearchForm;
