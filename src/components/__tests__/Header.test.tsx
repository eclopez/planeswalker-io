import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/components/Header";

describe("Header", () => {
  it("should render the site name as a link", () => {
    render(<Header />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveTextContent("Planeswalker.io");
    expect(screen.getByRole("heading")).toContainElement(anchor);
  });
});
