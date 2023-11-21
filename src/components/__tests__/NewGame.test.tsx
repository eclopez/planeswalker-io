import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewGame from "@/components/NewGame";

jest.mock("next/navigation", () => ({ useRouter: jest.fn }));

describe("NewGame", () => {
  it("should render the new game button", () => {
    render(<NewGame />);

    expect(screen.getByRole("button")).toHaveTextContent("New Game");
  });
});
