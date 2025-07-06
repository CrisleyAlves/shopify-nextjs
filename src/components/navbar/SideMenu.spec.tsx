import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import { AppProviders } from "../../context/AppProviders";
import SideMenu from "./SideMenu";

const mockMenu = [
  { path: "/about", title: "About" },
  { path: "/privacy", title: "Privacy" },
];

jest.mock("../../services/cart-service", () => ({
  getCartIdFromCookies: () => "dummyCartId",
}));

describe("SideMenu", () => {
  it("renders menu items and close button when open", () => {
    const handleClose = jest.fn();
    render(
      <AppProviders shopifyCart={undefined}>
        <SideMenu
          menu={mockMenu}
          showSideNav={true}
          pathname="/"
          onClickCloseIcon={handleClose}
        />
      </AppProviders>
    );

    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Privacy")).toBeInTheDocument();
    expect(screen.getByAltText("Close Sidemenu")).toBeInTheDocument();
  });

  it("calls onClickCloseIcon when close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <AppProviders shopifyCart={undefined}>
        <SideMenu
          menu={mockMenu}
          showSideNav={true}
          pathname="/"
          onClickCloseIcon={handleClose}
        />
      </AppProviders>
    );
    fireEvent.click(screen.getByAltText("Close Sidemenu"));
    expect(handleClose).toHaveBeenCalled();
  });

  it("applies correct classes when menu is open or closed", () => {
    const { rerender, container } = render(
      <AppProviders shopifyCart={undefined}>
        <SideMenu
          menu={mockMenu}
          showSideNav={true}
          pathname="/"
          onClickCloseIcon={jest.fn()}
        />
      </AppProviders>
    );
    expect(container.firstChild).toHaveClass("opacity-100");

    rerender(
      <AppProviders shopifyCart={undefined}>
        <SideMenu
          menu={mockMenu}
          showSideNav={false}
          pathname="/"
          onClickCloseIcon={jest.fn()}
        />
      </AppProviders>
    );
    expect(container.firstChild).toHaveClass("opacity-0");
  });
});
