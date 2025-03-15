import Prose from "@/components/prose";
import { Page } from "@/lib/shopify/page/types";

export default function PageContainer({ pageDetails }: { pageDetails: Page }) {
  return (
    <div className="w-full p-5">
      <h1 className="mb-12 mt-12 text-5xl font-bold text-black">
        {pageDetails.title}
      </h1>

      <Prose className="pb-10 pl-0 ml-0" html={pageDetails.body as string} />

      <p className="text-sm italic text-gray-800">
        {`This document was last updated on ${new Intl.DateTimeFormat(
          undefined,
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ).format(new Date(pageDetails.updatedAt))}.`}
      </p>
    </div>
  );
}
