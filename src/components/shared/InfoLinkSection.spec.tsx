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
