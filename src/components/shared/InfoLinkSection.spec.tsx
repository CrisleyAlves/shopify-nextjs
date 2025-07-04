import { render, screen } from "@testing-library/react";
import { LoaderProvider } from "@/context/LoaderContext";

import InfoLinkSection from "./InfoLinkSection";

const mockedSections = [
  {
    path: "/about",
    title: "About",
  },
  {
    path: "/privacy",
    title: "Privacy",
  },
  {
    path: "/contact-us",
    title: "Contact Us",
  },
  {
    path: "/guarantee",
    title: "Guarantee",
  },
];

/**
 * @todo: move to a global config
 */
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    has: jest.fn(),
    entries: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
    toString: jest.fn(),
  }),
  usePathname: () => "/",
}));

describe("InfoLinkSection", () => {
  it("should render section correcly", () => {
    const { container } = render(
      <LoaderProvider>
        <InfoLinkSection sections={mockedSections} />
      </LoaderProvider>
    );
    expect(screen.getByText("About")).toBeDefined();
    expect(screen.getByText("Privacy")).toBeDefined();
    expect(screen.getByText("Contact Us")).toBeDefined();
    expect(screen.getByText("Guarantee")).toBeDefined();

    expect(container).toMatchSnapshot();
  });
});
