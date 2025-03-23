"use client";

import { FormEventHandler } from "react";

export default function SearchForm({
  onSubmitSearchForm,
}: {
  onSubmitSearchForm: FormEventHandler<HTMLFormElement>;
}) {
  return (
    <form
      onSubmit={onSubmitSearchForm}
      className="
        justify-between px-3 py-3 flex flex-row
        md:justify-between md:container md:px-5 xl:px-0"
    >
      <input
        name="search"
        className="button w-full font-light placeholder:font-light"
        placeholder="search..."
        aria-label="Search"
      />
      <button type="submit" className="font-light text-base ml-2">
        Search
      </button>
    </form>
  );
}
