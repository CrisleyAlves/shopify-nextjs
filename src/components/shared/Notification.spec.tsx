import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useUI } from "../../context/UIContext";

import Notification from "./Notification";

jest.mock("../../context/UIContext", () => ({
  useUI: jest.fn(),
}));

describe("Notification", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing if notification is not visible", () => {
    (useUI as jest.Mock).mockReturnValue({
      notification: { visible: false, type: "info", message: "" },
    });
    const { container } = render(<Notification />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders info notification with correct styles and message", () => {
    (useUI as jest.Mock).mockReturnValue({
      notification: { visible: true, type: "info", message: "Info message" },
    });
    render(<Notification />);
    expect(screen.getByText("Info message")).toBeInTheDocument();
    expect(screen.getByText("Info message")).toHaveClass("bg-blue-300");
  });

  xit("renders success notification with correct styles", () => {
    (useUI as jest.Mock).mockReturnValue({
      notification: { visible: true, type: "success", message: "Success!" },
    });
    render(<Notification />);
    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(screen.getByText("Success!")).toHaveClass("bg-green-300");
  });

  xit("renders error notification with correct styles", () => {
    (useUI as jest.Mock).mockReturnValue({
      notification: { visible: true, type: "error", message: "Error!" },
    });
    render(<Notification />);
    expect(screen.getByText("Error!")).toBeInTheDocument();
    expect(screen.getByText("Error!")).toHaveClass("bg-red-300");
  });

  xit("renders warning notification with correct styles", () => {
    (useUI as jest.Mock).mockReturnValue({
      notification: { visible: true, type: "warning", message: "Warning!" },
    });
    render(<Notification />);
    expect(screen.getByText("Warning!")).toBeInTheDocument();
    expect(screen.getByText("Warning!")).toHaveClass("bg-yellow-300");
  });
});
