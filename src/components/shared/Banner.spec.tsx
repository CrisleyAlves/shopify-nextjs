import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Banner from "./Banner";

describe("Banner", () => {
  it("renders a link to /collections/sales", () => {
    const { container } = render(<Banner />);
    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/collections/sales");
    expect(container).toMatchSnapshot();
  });
});
