import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContinueGame from "@/components/ContinueGame";

jest.mock("next/navigation", () => ({ useRouter: jest.fn }));

describe("ContinueGame", () => {
  it("should render a disabled continue button when there are no games passed as props", () => {
    render(<ContinueGame games={[]} />);

    expect(screen.getByRole("button")).toHaveTextContent("Continue Game");
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should render the continue button when there are games passed as props", () => {
    render(<ContinueGame games={["plw-1700522032680"]} />);

    expect(screen.getByRole("button")).toHaveTextContent("Continue Game");
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});
